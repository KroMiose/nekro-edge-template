import { Savings, Public, TrendingUp, Handyman } from "@mui/icons-material";
import { Box, Container, Paper, Typography, Grid } from "@mui/material";

const advantages = [
  {
    icon: <TrendingUp fontSize="large" color="primary" />,
    title: "自动扩缩容",
    description: "应用将根据流量自动扩展或缩减，无需手动配置服务器。轻松应对流量高峰，永远不必担心资源浪费。",
  },
  {
    icon: <Savings fontSize="large" color="primary" />,
    title: "极致成本效益",
    description: "您只需为实际执行的代码付费，精确到毫秒。没有闲置服务器的开销，极大降低基础设施成本。",
  },
  {
    icon: <Public fontSize="large" color="primary" />,
    title: "全球化部署",
    description: "代码一键部署到 Cloudflare 遍布全球的边缘网络，自动将应用带到离用户最近的地方，提供极致访问速度。",
  },
  {
    icon: <Handyman fontSize="large" color="primary" />,
    title: "简化运维",
    description: "将精力完全集中在业务逻辑和产品创新上。底层的服务器维护、安全补丁和容量规划都由平台搞定。",
  },
];

export const ServerlessAdvantageSection = () => {
  return (
    <Box sx={{ py: 12 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" fontWeight="bold" textAlign="center" gutterBottom>
          拥抱无服务器的未来
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 8, maxWidth: "700px", mx: "auto" }}
        >
          NekroEdge 完全基于 Cloudflare 的无服务器平台构建，为您带来下一代 Web 应用的卓越优势。
        </Typography>
        <Grid container spacing={4}>
          {advantages.map((advantage, index) => (
            <Grid item key={index} xs={12} sm={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  backgroundColor: "transparent",
                }}
              >
                <Box sx={{ mt: 0.5 }}>{advantage.icon}</Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {advantage.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {advantage.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
