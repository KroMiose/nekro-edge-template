# SSR 错误调试日志

本文件用于追踪解决 `Error: Element type is invalid...` 及后续的服务端渲染 (SSR) 错误。

---

### 问题陈述

在通过更新 `vite.config.mts` 解决了初期的模块解析错误后，生产环境部署在服务端渲染阶段失败，并出现 `Error: Element type is invalid: expected a string... but got: object.` 错误。

---

### 尝试历史

#### 尝试 #1: 扩展 `ssr.noExternal`

- **操作:** 在 `frontend/vite.config.mts` 中，将 `react-router-dom`, `@mui/material`, `@mui/system`, `@emotion/react`, `@emotion/styled`, 和 i18next 库添加至 `ssr.noExternal`。
- **原因:** 强制 Vite 打包这些依赖，以解决 `wrangler` 的打包器可能无法正确处理的 CJS/ESM 兼容性问题。
- **结果:** **部分成功。** 解决了初期的 `Could not resolve module` 错误，但引出了 `Element type is invalid` 错误。

#### 尝试 #2: 隔离问题 (简化渲染)

- **操作:** 修改 `frontend/src/entry-server.tsx`，使其只渲染一个简单的 `<h1>Isolation Test: OK</h1>` 标签。
- **原因:** 为了判断错误根源是在基础构建流程中，还是在 React 应用内部。
- **结果:** **错误变化，取得关键进展。**
  - 新的错误变为 `Error: Could not find frontend entry in manifest.json`。
  - 这标志着 `ReactDOMServer.renderToString` 本身不再报错。错误发生在 `src/index.ts` 中，当它试图从 `manifest.json` 文件中查找客户端入口脚本时。
  - **结论：** 原始的 `Element type is invalid` 错误确实是由我们复杂的 React 组件树（路由、MUI 等）引起的。而新的 `manifest.json` 错误则暴露了我们客户端构建配置中的一个潜在问题。

#### 尝试 #4: 修正构建入口路径 (第二次)

- **操作:**
  1. **修正 Vite 配置:** 在 `frontend/vite.config.mts` 中，将 `build.rollupOptions.input` 的值更正为正确的项目相对路径 `'frontend/src/entry-client.tsx'`。
  2. **修正服务器代码:** 在 `src/index.ts` 中，将查找 manifest key 的路径恢复为 `'frontend/src/entry-client.tsx'`，以匹配正确的构建输出。
- **原因及关键区别:**
  - **关键在于路径的写法。** 上一次失败的尝试中，路径写作 `"/src/entry-client.tsx"`，这个前导的 `/` 会让 Vite/Rollup 将其误判为系统根路径下的文件，从而导致找不到入口。
  - **本次修正后**，路径为 `"frontend/src/entry-client.tsx"`，这是一个从 **项目根目录** 计算的、完全正确的相对路径。这确保了 Vite 能准确定位客户端入口文件，并生成包含正确键 (`"frontend/src/entry-client.tsx"`) 的 `manifest.json` 文件。
  - `src/index.ts` 中的路径也必须与这个正确的键保持一致。
- **预期结果:** 解决 `Could not find frontend entry in manifest.json` 错误，使简化版的页面（只含`<h1>`）能够成功部署。

---

### 下一步行动:

**等待部署结果。** 如果简化版页面部署成功，我们将：

1. **恢复 `entry-server.tsx`** 的完整渲染逻辑。
2. **正面解决**最初的 `Element type is invalid` 错误。

如果仍然失败，我们将重新评估基础构建配置。
