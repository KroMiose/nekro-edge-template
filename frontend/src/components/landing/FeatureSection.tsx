import { Security, AllInclusive, DeveloperMode, CloudDone, Rocket, Speed } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FeatureSpotlight } from "./FeatureSpotlight";

const features = [
  {
    icon: <Security />,
    title: "端到端类型安全",
    description:
      "从数据库 Schema 到前端组件，全程采用 TypeScript 和 Zod 校验，智能提示无处不在，彻底告别运行时类型错误。",
  },
  {
    icon: <AllInclusive />,
    title: "混合渲染模式",
    description:
      "集成了 Vite 的热更新（HMR）用于开发，同时支持生产环境下的服务器端渲染（SSR），兼顾开发效率与生产性能。",
  },
  {
    icon: <DeveloperMode />,
    title: "极致开发体验",
    description: "通过 Hono 的轻量级框架和 React 的现代生态，提供无与伦比的开发体验。代码简洁，逻辑清晰。",
  },
  {
    icon: <CloudDone />,
    title: "生产级就绪",
    description:
      "基于 Cloudflare 全球网络构建，整合了 Pages, Workers 和 D1 数据库，提供高可用、低延迟的生产级部署方案。",
  },
  {
    icon: <Speed />,
    title: "性能卓越",
    description: "Hono 后端和优化的前端构建确保了应用的快速响应。无论是 API 还是页面加载，都力求极致性能。",
  },
  {
    icon: <Rocket />,
    title: "一键部署",
    description: "简化的构建和部署流程，只需一个命令即可将您的全栈应用部署到 Cloudflare 的边缘网络上，轻松便捷。",
  },
];

export const FeatureSection = () => {
  return (
    <Box sx={{ py: 12, bgcolor: "rgba(128, 128, 128, 0.05)" }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" fontWeight="bold" textAlign="center" gutterBottom>
          模板核心特性
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 8, maxWidth: "700px", mx: "auto" }}
        >
          我们不仅仅是代码的搬运工，更是最佳实践的布道者。这个模板旨在提供一个优雅、健壮且高效的开发起点。
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} md={6} lg={4} key={feature.title}>
              <FeatureSpotlight icon={feature.icon} title={feature.title} description={feature.description} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
