import { Box, Button, Container, keyframes, Typography, useTheme, Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Code, RocketLaunch, GitHub } from "@mui/icons-material";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

export const HeroSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 8, md: 12 },
        display: "flex",
        alignItems: "center",
        minHeight: "64vh",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: theme.hero.background,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center", zIndex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 2 }}>
          <Typography
            component="h1"
            variant="h2"
            fontWeight="bold"
            sx={{
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NekroEdge
          </Typography>
          <Chip label="Template" size="small" variant="outlined" sx={{ mb: 1 }} />
        </Box>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          一个基于 Cloudflare 构建的、生产级的、类型安全的全栈 Web 应用模板。
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
            animation: `${float} 6s ease-in-out infinite`,
            mt: 10,
          }}
        >
          <Button component={RouterLink} to="/features" variant="contained" size="large" startIcon={<RocketLaunch />}>
            启动应用
          </Button>
          <Button component="a" href="/doc" target="_blank" variant="outlined" size="large" startIcon={<Code />}>
            API 文档
          </Button>
          <Button
            component="a"
            href="https://github.com/KroMiose/nekro-edge-template"
            target="_blank"
            variant="outlined"
            size="large"
            startIcon={<GitHub />}
          >
            GitHub
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
