# NekroEdge

这是一个基于 Cloudflare Pages & Workers 构建的全栈应用模板，使用 Hono 作为后端框架，React (Vite) 作为前端，Cloudflare D1 作为数据库。

它提供了一套完整的、类型安全的开发环境，包含数据库 ORM (Drizzle)，自动化的 API 文档 (Swagger UI)，一个集中式、可切换的亮/暗主题系统 (MUI)，以及现代化的前端工具链。

## ✨ 特性

- **全栈框架**: [Hono](https://hono.dev/) - 在 Cloudflare Workers 上运行的快速、轻量级的 Web 框架。
- **前端**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) - 享受现代化的、闪电般快速的开发体验。
- **UI 组件**: [Material-UI](https://mui.com/) & [UnoCSS](https://unocss.dev/) - 兼顾功能与原子化CSS的灵活。
- **数据库**: [Cloudflare D1](https://developers.cloudflare.com/d1/) - Cloudflare 的原生无服务器数据库。
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - 提供端到端类型安全的 TypeScript ORM。
- **验证**: [Zod](https://zod.dev/) - 用于保证从客户端到数据库的数据类型安全。
- **部署**: 一键部署到 [Cloudflare Pages](https://pages.cloudflare.com/)。

## 🚀 快速开始

### 1. 克隆仓库

```bash
# 将 "your-repo-name" 替换为你的项目名
git clone https://github.com/KroMiose/nekro-edge-template.git your-repo-name
cd your-repo-name
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 创建 D1 数据库

你需要一个 Cloudflare 账户。登录后，运行以下命令来创建你自己的数据库：

```bash
# 将 <your-db-name> 替换为你想用的数据库名
pnpm wrangler d1 create <your-db-name>
```

这条命令会返回新建数据库的 `database_id`，请务必记下它。

### 4. 配置 `wrangler.jsonc`

打开项目根目录下的 `wrangler.jsonc` 文件。找到 `d1_databases` 配置节，并将 `database_name` 和 `database_id` 的值替换为你**上一步**创建的数据库信息。

**重要提示**: 本仓库包含一个用于在线演示的默认数据库ID，请务必将其替换为您自己的ID，否则后续步骤将无法正常工作。

**修改示例:** 如果你的数据库名为 `my-cool-app-db`，ID 为 `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`，则修改如下：

```jsonc
// wrangler.jsonc

"d1_databases": [
  {
    "binding": "DB",
    "database_name": "my-cool-app-db", // <-- 替换成你的数据库名
    "database_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", // <-- 替换成你的数据库ID
    "migrations_dir": "drizzle"
  }
],
```

### 5. 运行数据库迁移

现在，使用你自己的数据库来运行迁移。

```bash
# 本地开发环境
# 这会根据 wrangler.jsonc 的配置，在本地创建数据库并应用迁移
pnpm db:migrate

# 生产环境
# 这会根据 wrangler.jsonc 的配置，在 Cloudflare 远程数据库上应用迁移
pnpm db:migrate:prod
```

### 6. 启动开发服务器

```bash
pnpm dev
```

- Hono 后端服务: `http://localhost:8787`
- Vite 前端服务: `http://localhost:5173`

现在，你可以开始构建你的应用了！

## 📚 目录结构

```
.
├── frontend/
│   ├── src/
│   │   ├── components/   # (可选) 可复用的 React 组件
│   │   ├── context/
│   │   │   └── ThemeContextProvider.tsx # 全局主题状态管理器
│   │   ├── pages/        # 页面级组件 (PortalPage, PostsPage)
│   │   ├── App.tsx       # 客户端应用主布局 (带导航栏和页脚)
│   │   ├── entry-client.tsx # 客户端渲染(CSR)入口
│   │   ├── entry-server.tsx # 服务器端渲染(SSR)入口
│   │   └── theme.ts      # MUI 主题配置文件
│   ├── index.html      # 应用的 HTML 壳
│   └── vite.config.mts # Vite 配置文件
├── src/
│   ├── db/
│   │   └── schema.ts     # Drizzle ORM 数据库模型
│   ├── routes/
│   │   └── post.ts       # API 路由示例 (文章)
│   ├── validators/
│   │   └── post.schema.ts # API 请求体验证 Schema
│   └── index.ts          # Hono 后端入口文件
├── .github/              # (可选) GitHub Actions 配置文件
├── migrations/           # Drizzle ORM 数据库迁移文件
├── package.json
└── wrangler.jsonc
```

## 💎 代码风格与格式化

本项目使用 [Prettier](https://prettier.io/) 来统一代码风格。

- **手动格式化**: `pnpm format`
- **自动格式化**: 项目包含了 `.vscode/settings.json` 配置文件。如果你安装了 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) VS Code 插件，它将在你保存文件时自动进行格式化。

## 部署到 Cloudflare

部署应用到 Cloudflare 非常简单：

```bash
pnpm deploy
```

该命令会先构建前端应用（Vite 会输出用于生产的静态文件），然后 Wrangler 会将后端 Worker 和这些静态资源一并部署到 Cloudflare。
