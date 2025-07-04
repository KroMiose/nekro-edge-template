import { Box, Container, Grid, Typography } from "@mui/material";
import { TechCard } from "./TechCard";
import { CloudflareLogo, DrizzleLogo, MuiLogo, ReactLogo } from "@frontend/assets/logos";

const techData = [
  {
    iconUrl: "https://hono.dev/images/logo.svg",
    title: "Hono",
    description: "后端框架，以其轻量、快速和对边缘计算的良好支持而著称，是构建高性能 API 的理想选择。",
    hoverColor: "#E65100",
  },
  {
    icon: <ReactLogo />,
    title: "React",
    description: "前端库，通过组件化和虚拟 DOM 技术，实现了高效且声明式的 UI 开发。",
    hoverColor: "#61DAFB",
  },
  {
    iconUrl: "https://vitejs.dev/logo.svg",
    title: "Vite",
    description: "前端构建工具，提供极速的冷启动和热模块替换（HMR），显著提升了开发体验。",
    hoverColor: "#646CFF",
  },
  {
    icon: <DrizzleLogo />,
    title: "Drizzle ORM",
    description: "TypeScript ORM，提供完全类型安全的方式来与数据库交互，告别 SQL 注入和拼写错误。",
    hoverColor: "#C5F74F",
  },
  {
    icon: <CloudflareLogo />,
    title: "Cloudflare",
    description: "全球网络平台，本项目使用其 Pages, Workers 和 D1 数据库，实现全栈应用的部署和运行。",
    hoverColor: "#F38020",
  },
  {
    iconUrl: "https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg",
    title: "Zod",
    description: "数据校验库，通过简洁的 Schema 定义，轻松实现从客户端到数据库的端到端类型安全。",
    hoverColor: "#3E67B1",
  },
  {
    icon: <MuiLogo />,
    title: "Material-UI",
    description: "流行的 React UI 框架，提供了丰富、可定制的组件，帮助快速构建美观的界面。",
    hoverColor: "#0081CB",
  },
  {
    iconUrl: "https://unocss.dev/logo.svg",
    title: "UnoCSS",
    description: "原子化 CSS 引擎，按需生成样式，保持了 CSS 的灵活性，同时提供了工具类的便利。",
    hoverColor: "#333333",
  },
  {
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    title: "TypeScript",
    description: "JavaScript 的超集，为项目提供了强大的静态类型系统，增强了代码的可维护性和健壮性。",
    hoverColor: "#3178C6",
  },
];

export const TechStackSection = () => {
  return (
    <Box sx={{ py: 12 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" fontWeight="bold" textAlign="center" gutterBottom>
          核心技术栈
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 8 }}>
          NekroEdge 精心整合了以下业界一流的技术，为您提供卓越的全栈开发体验。
        </Typography>
        <Grid container spacing={4}>
          {techData.map((tech) => (
            <Grid item xs={12} sm={6} md={4} key={tech.title}>
              <TechCard
                icon={tech.icon}
                iconUrl={tech.iconUrl}
                title={tech.title}
                description={tech.description}
                hoverColor={tech.hoverColor}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
