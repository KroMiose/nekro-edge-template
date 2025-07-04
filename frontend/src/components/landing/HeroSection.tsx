import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const theme = useTheme();

  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.pageBackground} 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
          filter: "blur(60px)",
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-20px)" },
          },
        }}
      />

      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem", lg: "5rem" },
              fontWeight: "bold",
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 3,
              textAlign: "center",
            }}
          >
            NekroEdge
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: theme.palette.text.primary,
              marginBottom: 2,
              textAlign: "center",
              fontWeight: 400,
            }}
          >
            现代化全栈应用模板
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              marginBottom: 6,
              textAlign: "center",
              maxWidth: "800px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            基于 Cloudflare 技术栈的生产级全栈应用模板，使用 Hono + React + D1 技术栈，
            提供开箱即用的开发体验和端到端类型安全
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              component={RouterLink}
              to="/features"
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                borderRadius: "50px",
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
                },
                transition: "all 0.3s ease",
              }}
            >
              体验演示
            </Button>
            <Button
              href="https://github.com/KroMiose/nekro-edge-template"
              target="_blank"
              variant="outlined"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                borderRadius: "50px",
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                "&:hover": {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: `${theme.palette.primary.main}10`,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              查看源码
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};
