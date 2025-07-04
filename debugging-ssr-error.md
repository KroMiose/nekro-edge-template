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

---

### 当前策略: 修正构建配置，然后正面解决原始问题

新的 `manifest.json` 错误表明 Vite 在构建客户端资源时，生成的 `manifest.json` 中的键名与 `src/index.ts` 中硬编码期望的路径不匹配。

我们将通过显式配置 Vite 的入口点，并调整服务器代码来匹配，从而修正这个问题。

**下一步行动:**

1.  **修正构建配置:** 我们将首先解决 `manifest.json` 的问题，以确保我们的简化版页面可以成功部署。
2.  **恢复并解决:** 一旦简化版部署成功，我们会恢复 `entry-server.tsx` 的完整渲染逻辑，然后集中精力正面解决最初的 `Element type is invalid` 错误。
