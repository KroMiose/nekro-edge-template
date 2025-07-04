# 📦 部署指南

本指南将详细介绍如何将 NekroEdge 应用部署到 Cloudflare Pages & Workers 生产环境。

## 🚀 部署前准备

### 1. 准备 Cloudflare 账户

- 注册 [Cloudflare 账户](https://dash.cloudflare.com/sign-up)
- 确保账户已验证邮箱
- 准备一个域名 (可选，Cloudflare 会提供子域名)

### 2. 准备代码仓库

```bash
# 确保代码已推送到 Git 仓库 (GitHub/GitLab)
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 3. 本地构建测试

```bash
# 测试本地构建是否成功
pnpm build

# 预览构建结果
pnpm preview
```

## 🗄️ 生产数据库配置

### 1. 创建生产数据库

```bash
# 创建生产 D1 数据库
npx wrangler d1 create your-prod-db-name

# 示例输出：
# ✅ Successfully created DB 'your-prod-db-name'
#
# [[d1_databases]]
# binding = "DB"
# database_name = "your-prod-db-name"
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### 2. 更新配置文件

将上面的输出信息更新到 `wrangler.jsonc`：

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
      "vars": {
        "NODE_ENV": "production",
      },
    },
  },
}
```

### 3. 运行生产数据库迁移

```bash
# 应用数据库迁移到生产环境
pnpm db:migrate:prod

# 验证迁移成功
npx wrangler d1 execute your-prod-db-name --env production --command "SELECT name FROM sqlite_master WHERE type='table';"
```

## 🌐 Cloudflare Pages 部署

### 方式一：通过 Dashboard 部署 (推荐新手)

#### 1. 连接 Git 仓库

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** → **Pages**
3. 点击 **"Create a project"**
4. 选择 **"Connect to Git"**
5. 授权并选择你的 Git 仓库

#### 2. 配置构建设置

在部署配置页面设置：

| 配置项       | 值              |
| ------------ | --------------- |
| **项目名称** | `your-app-name` |
| **生产分支** | `main`          |
| **构建命令** | `pnpm build`    |
| **输出目录** | `dist/client`   |
| **根目录**   | `/`             |

#### 3. 设置环境变量

在 **Settings** → **Environment variables** 中添加：

```bash
NODE_ENV=production
VITE_PORT=5173
```

#### 4. 配置兼容性标志

在 **Settings** → **Functions** 中设置：

- **Compatibility date**: `2024-07-29`
- **Compatibility flags**: `nodejs_compat`

### 方式二：通过 CLI 部署 (推荐有经验开发者)

#### 1. 安装并登录 Wrangler

```bash
# 全局安装 Wrangler (如果尚未安装)
npm install -g wrangler

# 登录 Cloudflare
npx wrangler login
```

#### 2. 直接部署

```bash
# 构建并部署到生产环境
pnpm build
npx wrangler deploy --env production
```

## 🔧 高级部署配置

### 自定义域名配置

#### 1. 添加域名到 Cloudflare

1. 在 Cloudflare Dashboard 中添加你的域名
2. 更新域名的 DNS 服务器到 Cloudflare

#### 2. 配置 Pages 域名

1. 进入 **Pages** → **你的项目** → **Custom domains**
2. 点击 **"Set up a custom domain"**
3. 输入你的域名并验证

### 环境变量管理

#### 开发环境变量

```bash
# .env (本地开发)
NODE_ENV=development
VITE_PORT=5173
VITE_API_HOST=localhost
VITE_API_PORT=8787
DB_DEBUG=true
```

#### 生产环境变量

在 Cloudflare Pages 设置中配置：

```bash
NODE_ENV=production
VITE_PORT=5173
# 不要在生产环境设置 DB_DEBUG
```

### 安全配置

#### 1. 设置 CSP (内容安全策略)

```typescript
// src/index.ts
app.use("*", async (c, next) => {
  await next();
  c.header(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
  );
});
```

#### 2. 启用 HTTPS 重定向

在 Cloudflare Dashboard 的 **SSL/TLS** → **Edge Certificates** 中：

- 启用 **Always Use HTTPS**
- 设置 **SSL/TLS encryption mode** 为 **Full (strict)**

## 📊 部署后验证

### 1. 功能测试

```bash
# 替换为你的实际域名
curl https://your-app.pages.dev/api/posts

# 检查 API 文档是否可访问
curl https://your-app.pages.dev/api/doc
```

### 2. 性能测试

- **页面加载速度**: 使用 [PageSpeed Insights](https://pagespeed.web.dev/)
- **SEO 检查**: 使用 [Google Search Console](https://search.google.com/search-console)
- **安全性检查**: 使用 [SSL Labs](https://www.ssllabs.com/ssltest/)

### 3. 监控设置

在 Cloudflare Dashboard 中启用：

- **Analytics**: 查看访问统计
- **Security**: 监控安全事件
- **Performance**: 性能监控

## 🔄 持续部署 (CI/CD)

### GitHub Actions 自动部署

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: your-project-name
          directory: dist/client
```

### 配置 Secrets

在 GitHub 仓库的 **Settings** → **Secrets** 中添加：

- `CLOUDFLARE_API_TOKEN`: Cloudflare API Token
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID

## 🚨 部署故障排除

### 常见部署错误

#### 1. 构建失败

```bash
# 错误：Module not found
# 解决：检查 frontend/vite.config.mts 中的 ssr.noExternal 配置

export default defineConfig({
  ssr: {
    noExternal: [
      'react-router-dom',
      '@mui/material',
      '@mui/system',
      // ... 添加缺失的模块
    ],
  },
});
```

#### 2. 数据库连接失败

```bash
# 检查生产数据库配置
npx wrangler d1 list

# 验证 database_id 是否正确
npx wrangler d1 info your-prod-db-name --env production
```

#### 3. 静态资源 404

检查 `wrangler.jsonc` 中的 assets 配置：

```jsonc
{
  "env": {
    "production": {
      "assets": {
        "binding": "ASSETS",
        "directory": "./dist/client", // 确保路径正确
      },
    },
  },
}
```

#### 4. API 路由不工作

确保在 `src/index.ts` 中正确注册了路由：

```typescript
// 检查路由是否正确挂载
app.route("/api", apiApp);
```

### 调试部署问题

#### 查看部署日志

```bash
# 在 Cloudflare Dashboard 的 Functions 页面查看实时日志
npx wrangler tail --env production
```

#### 本地模拟生产环境

```bash
# 使用生产环境配置在本地运行
npx wrangler dev --env production --remote
```

## 📈 部署优化

### 1. 性能优化

```typescript
// 启用缓存
app.use("*", cache({ cacheName: "static", maxAge: 31536000 }));

// 启用压缩
app.use("*", compress());
```

### 2. SEO 优化

确保 SEO 配置正确：

```bash
# 生成优化的 HTML 模板
pnpm generate:html

# 验证 robots.txt 和 sitemap.xml
curl https://your-app.pages.dev/robots.txt
curl https://your-app.pages.dev/sitemap.xml
```

### 3. 安全优化

```typescript
// 添加安全头
app.use("*", async (c, next) => {
  await next();
  c.header("X-Frame-Options", "DENY");
  c.header("X-Content-Type-Options", "nosniff");
  c.header("Referrer-Policy", "strict-origin-when-cross-origin");
});
```

## 🔄 更新部署

### 日常更新流程

```bash
# 1. 开发并测试新功能
pnpm dev

# 2. 更新数据库 schema (如需要)
pnpm db:generate
pnpm db:migrate:prod

# 3. 提交代码
git add .
git commit -m "Add new feature"
git push origin main

# 4. 自动部署 (如果配置了 CI/CD)
# 或手动部署
pnpm build
npx wrangler deploy --env production
```

### 回滚部署

```bash
# 查看部署历史
npx wrangler deployments list --env production

# 回滚到指定版本
npx wrangler rollback [deployment-id] --env production
```

## 🔄 下一步

部署完成后，建议了解：

- [🔧 故障排除](./TROUBLESHOOTING.md) - 解决生产环境问题
- [🔍 SEO 配置指南](./SEO_GUIDE.md) - 优化搜索引擎表现
- [🏛️ 项目架构](./ARCHITECTURE.md) - 深入了解技术架构

## 💡 部署小贴士

- **渐进发布**: 先部署到测试域名验证，再切换生产域名
- **数据备份**: 定期备份生产数据库
- **监控告警**: 设置 Cloudflare 的监控告警
- **域名管理**: 使用 Cloudflare 管理 DNS 可获得最佳性能
- **缓存策略**: 合理设置静态资源的缓存时间
