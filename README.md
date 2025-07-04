# NekroEdge

> 🚀 **一个基于 Cloudflare 技术栈的现代化全栈应用模板**

这是一个基于 Cloudflare Pages & Workers 构建的**生产级**全栈应用模板，使用 **Hono + React + D1** 技术栈，提供开箱即用的开发体验和端到端类型安全。

## 🌟 在线演示

体验模板基础功能的在线演示：**[https://edge.nekro.ai/](https://edge.nekro.ai/)**

## ✨ 核心特性

- 🏗️ **全栈框架**: [Hono](https://hono.dev/) - 在 Cloudflare Workers 上运行的快速、轻量级的 Web 框架
- ⚛️ **现代前端**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) - 享受闪电般快速的开发体验
- 🎨 **UI 组件库**: [Material-UI](https://mui.com/) + [UnoCSS](https://unocss.dev/) - 功能完整且灵活的设计系统
- 🗄️ **无服务器数据库**: [Cloudflare D1](https://developers.cloudflare.com/d1/) - Cloudflare 原生数据库
- 🔒 **类型安全 ORM**: [Drizzle ORM](https://orm.drizzle.team/) - 端到端 TypeScript 类型安全
- ✅ **数据验证**: [Zod](https://zod.dev/) - 从客户端到数据库的完整数据类型安全
- 🌙 **主题系统**: 内置亮/暗模式切换，完全可定制
- 📖 **自动化文档**: 集成 Swagger UI，API 文档自动生成
- 🚀 **一键部署**: 完整的 [Cloudflare Pages](https://pages.cloudflare.com/) 部署配置

## 🚀 快速开始

### 1. 创建项目

```bash
# 使用模板创建新项目 (建议 Fork 后使用)
git clone https://github.com/KroMiose/nekro-edge-template.git your-project-name
cd your-project-name

# 安装依赖
pnpm install
```

### 2. 本地开发 (开箱即用)

```bash
# 启动开发服务器
pnpm dev
```

首次启动时，Wrangler 会自动创建本地 D1 数据库。运行数据库迁移完成初始化：

```bash
# 初始化本地数据库
pnpm db:migrate
```

🎉 **开发环境已就绪！**

#### 🚀 开发访问方式

根据你的开发需求，选择合适的访问方式：

| 访问地址                  | 用途                | 热重载      | 适用场景                         |
| ------------------------- | ------------------- | ----------- | -------------------------------- |
| **http://localhost:5173** | 🔥 **推荐开发地址** | ✅ 完整支持 | 前端开发、样式调试、组件开发     |
| **http://localhost:8787** | 完整应用            | ❌ 不支持   | API 测试、SSR 测试、生产环境验证 |

#### 📡 服务说明

- 🔗 **前端开发服务器**: http://localhost:5173 - _享受闪电般的热重载_
- 🔗 **后端 API 服务器**: http://localhost:8787 - _完整的后端功能_
- 📚 **API 文档**: http://localhost:8787/api/doc - _自动生成的 Swagger 文档_

> 💡 **开发提示**:
>
> - **日常开发**: 使用 `5173` 端口，享受 Vite 的热重载功能
> - **API 调试**: 前端会自动代理 API 请求到 `8787` 端口
> - **完整测试**: 需要测试 SSR 或完整功能时使用 `8787` 端口

#### ✅ 验证热重载

1. **访问开发地址**: http://localhost:5173
2. **测试热重载**: 修改 `frontend/src/pages/HomePage.tsx` 中的任意文本
3. **确认生效**: 浏览器应该立即反映你的修改，无需手动刷新

如果热重载不工作，请检查：

- 确保从 `5173` 端口访问（不是 `8787`）
- 检查浏览器控制台是否有 WebSocket 连接错误
- 重启开发服务器：`Ctrl+C` 然后重新运行 `pnpm dev`

## 🌐 部署到 Cloudflare Pages

### 步骤 1: 准备生产数据库

> ⚠️ **重要**: 生产环境需要独立的 D1 数据库实例

```bash
# 创建生产数据库 (替换为你的数据库名)
npx wrangler d1 create your-prod-db-name
```

记录返回的 `database_name` 和 `database_id`，然后更新 `wrangler.jsonc`:

```jsonc
{
  "env": {
    "production": {
      "d1_databases": [
        {
          "binding": "DB",
          "database_name": "your-prod-db-name", // 👈 替换这里
          "database_id": "your-database-id", // 👈 替换这里
          "migrations_dir": "drizzle",
        },
      ],
      // ... 其他配置保持不变
    },
  },
}
```

```bash
# 运行生产数据库迁移
pnpm db:migrate:prod
```

### 步骤 2: 连接到 Cloudflare Pages

1. **推送代码到 Git 仓库** (GitHub/GitLab)

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **在 Cloudflare Dashboard 中**:
   - 进入 [Cloudflare Pages](https://dash.cloudflare.com/pages)
   - 点击 **"Create a project"** → **"Connect to Git"**
   - 选择你的 Git 仓库并授权

### 步骤 3: 配置构建设置

> 📋 **重要配置**: 在 Cloudflare Pages 项目设置中配置以下参数

#### 🔧 **构建配置**

在绑定仓库的引导流程进行如下设置 (同创建完成后**Settings** → **Build & deployments** 中的设置):

| 配置项       | 值                                     |
| ------------ | -------------------------------------- |
| **构建命令** | `pnpm build`                           |
| **部署命令** | `npx wrangler deploy --env production` |
| **根目录**   | `/`                                    |

### 步骤 4: 触发部署

配置完成后，推送任何代码更改都会自动触发部署：

```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

🎉 **部署完成！** 你的应用现在可以通过 Cloudflare Pages 提供的 URL 访问了。

## 📁 项目结构

```
your-project/
├── 📁 frontend/              # 前端应用
│   ├── 📁 src/
│   │   ├── 📁 components/    # 可复用组件
│   │   ├── 📁 context/       # React Context 状态管理
│   │   ├── 📁 pages/         # 页面组件
│   │   ├── 📁 theme/         # 主题配置
│   │   ├── 📄 App.tsx        # 应用主布局
│   │   ├── 📄 entry-client.tsx  # 客户端入口
│   │   └── 📄 entry-server.tsx  # SSR 入口
│   ├── 📄 index.html         # HTML 模板
│   └── 📄 vite.config.mts    # Vite 配置
├── 📁 src/                   # 后端应用
│   ├── 📁 db/                # 数据库模型
│   ├── 📁 routes/            # API 路由
│   ├── 📁 validators/        # 数据验证
│   └── 📄 index.ts           # Hono 后端入口
├── 📁 drizzle/               # 数据库迁移文件
├── 📄 wrangler.jsonc         # Cloudflare Workers 配置
└── 📄 package.json           # 项目依赖和脚本
```

## 🛠️ 开发指南

### 常用命令

```bash
# 开发
pnpm dev                    # 启动开发服务器
pnpm build                  # 构建生产版本
pnpm preview               # 预览生产构建

# 数据库
pnpm db:generate           # 生成数据库迁移
pnpm db:migrate            # 应用本地迁移
pnpm db:migrate:prod       # 应用生产迁移
pnpm db:studio             # 打开数据库管理界面

# 代码质量
pnpm format                # 格式化代码
pnpm type-check            # 类型检查
```

### ⚙️ 环境变量配置

项目支持通过环境变量自定义API服务器配置。在项目根目录创建 `.env` 文件：

```bash
# 前端开发服务器端口
VITE_PORT=5173

# API服务器配置
VITE_API_HOST=localhost
VITE_API_PORT=8787

# 开发环境标识
NODE_ENV=development
```

**配置说明：**

- `VITE_PORT`: 前端开发服务器端口（默认: 5173）
- `VITE_API_HOST` / `API_HOST`: API服务器主机地址（默认: localhost）
- `VITE_API_PORT` / `API_PORT`: API服务器端口（默认: 8787）

### 🎨 定制你的应用

这个模板已经过工程化整理，方便你快速上手：

#### 1. **修改品牌信息**

- 📝 更新 `README.md` 中的项目名称和描述
- 🏷️ 修改 `package.json` 中的 `name` 和 `description`
- 🎨 在 `frontend/src/assets/logos/index.tsx` 中替换 Logo
- 📄 更新 `frontend/src/components/Footer.tsx` 中的版权信息

#### 2. **自定义页面**

- 🏠 **首页**: 编辑 `frontend/src/pages/HomePage.tsx`
- 📖 **示例页**: 参考 `frontend/src/pages/Features.tsx` 了解 API 交互
- 🧭 **导航**: 在 `frontend/src/App.tsx` 中添加新的导航项

#### 3. **主题定制**

- 🌈 在 `frontend/src/theme/index.ts` 中自定义颜色方案
- 🎭 使用 `useAppTheme` hook 获取主题状态

#### 4. **添加新功能**

- 📊 在 `src/db/schema.ts` 中定义数据模型
- 🔧 在 `src/validators/` 中创建数据验证 Schema
- 🛣️ 在 `src/routes/` 中添加 API 路由
- ⚛️ 创建对应的 React 组件

### 添加新的 API 路由

1. **定义数据验证 Schema** (`src/validators/`)
2. **创建路由处理器** (`src/routes/`)
3. **在 `src/index.ts` 中注册路由**

```typescript
// src/validators/user.schema.ts
export const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

// src/routes/user.ts
export const userRoutes = new OpenAPIHono().openapi(
  createRoute({
    method: "post",
    path: "/users",
    request: { body: { content: { "application/json": { schema: CreateUserSchema } } } },
    responses: { 200: { description: "User created" } },
  }),
  async (c) => {
    // 实现逻辑
  },
);
```

### 主题定制

项目包含完整的亮/暗模式主题系统。在 `frontend/src/theme/` 中定制：

```typescript
// frontend/src/theme/index.ts
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    // 自定义颜色...
  },
});
```

## 🔧 故障排除

### 常见问题

**Q: 构建失败，找不到模块**  
A: 确保在 `frontend/vite.config.mts` 的 `ssr.noExternal` 中包含了所有必要的依赖

**Q: 静态资源加载失败 (MIME 类型错误)**  
A: 检查 `wrangler.jsonc` 中的 `assets` 配置是否正确

**Q: 数据库连接失败**  
A: 确认 `wrangler.jsonc` 中的数据库配置正确，并运行了迁移

**Q: API 代理失败**  
A: 检查环境变量配置是否正确，确认 API 服务器正在运行

### 获取帮助

- 📖 [项目文档](./docs/)
- 🐛 [报告问题](https://github.com/KroMiose/nekro-edge-template/issues)
- 💬 [讨论区](https://github.com/KroMiose/nekro-edge-template/discussions)

---

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

## 🙏 致谢

感谢以下优秀的开源项目：

- [Cloudflare](https://cloudflare.com/) - 强大的边缘计算平台
- [Hono](https://hono.dev/) - 现代化的 Web 框架
- [React](https://react.dev/) - 用户界面库
- [Vite](https://vitejs.dev/) - 下一代前端工具
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM

---

**�� 开始构建你的下一个伟大应用吧！**
