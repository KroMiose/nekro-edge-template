# NekroEdge

这是一个基于 Cloudflare Pages & Workers 构建的全栈应用模板，使用 Hono 作为后端框架，React (Vite) 作为前端，Cloudflare D1 作为数据库。

它提供了一套完整的、类型安全的开发环境，包含数据库 ORM (Drizzle)，自动化的 API 文档 (Swagger UI)，一个集中式、可切换的亮/暗主题系统 (MUI)，以及现代化的前端工具链。

## ✨ 特性

- **全栈框架**: [Hono](https://hono.dev/) - 在 Cloudflare Workers 上运行的快速、轻量级的 Web 框架。
- **前端**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) - 享受现代化的、闪电般快速的开发体验。
- **UI 组件**: [Material-UI](https://mui.com/) & [UnoCSS](https://unocss.dev/) - 兼顾功能与原子化CSS的灵活。
- **数据库**: [Cloudflare D1](https://developers.cloudflare.com/d1/) - Cloudflare 的原生无服务器数据库。git branch -M main
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

### 3. 启动本地开发 (开箱即用)

本项目已配置为**开箱即用**的本地开发环境。直接运行以下命令即可启动：

```bash
pnpm dev
```

Wrangler 会自动在项目根目录的 `.wrangler/` 文件夹下创建一个本地 D1 数据库。为了完成初始化，您需要为这个**本地数据库**运行迁移来创建数据表：

```bash
pnpm db:migrate
```

现在，您的本地开发环境已经完全就绪！

- Hono 后端服务: `http://localhost:8787`
- Vite 前端服务: `http://localhost:5173`

### 4. 配置生产环境

当您准备好将项目部署到线上时，需要为生产环境配置一个真实的 Cloudflare D1 数据库。

#### a. 创建生产数据库

登录您的 Cloudflare 账户后，运行以下命令：

```bash
# 将 <your-prod-db-name> 替换为您期望的生产数据库名
pnpm wrangler d1 create <your-prod-db-name>
```

这条命令会返回新建数据库的 `database_name` 和 `database_id`，请务必记下它们。

#### b. 修改 `wrangler.jsonc`

打开项目根目录下的 `wrangler.jsonc` 文件。找到 `env.production` 配置块，并将 `d1_databases` 节下的 `database_name` 和 `database_id` 替换为您**上一步**创建的生产数据库信息。

**重要提示**: 您修改的是 `env.production` 内部的配置，顶层的配置是为本地开发保留的，请勿改动。

```jsonc
// wrangler.jsonc

// ... (顶层的本地开发配置保持不变) ...

  "env": {
    "production": {
      "d1_databases": [
        {
          "binding": "DB",
          "database_name": "your-prod-db-name", // <-- 替换成你的生产数据库名
          "database_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", // <-- 替换成你的生产数据库ID
          "migrations_dir": "drizzle"
        }
      ],
// ... (其余生产配置) ...
```

#### c. 运行生产数据库迁移

```bash
# 此命令会将迁移应用到您在 env.production 中配置的远程数据库上
pnpm db:migrate:prod
```

至此，您的生产环境已配置完毕。

## 部署到 Cloudflare

部署应用到 Cloudflare 非常简单。该命令会自动使用 `wrangler.jsonc` 中 `env.production` 的配置。

```bash
pnpm deploy
```

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
