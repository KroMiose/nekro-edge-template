import { Box, Container, Link, Typography, Divider } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: "auto",
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 4 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Nekro AI. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link href="https://nekro.ai" target="_blank" rel="noopener" variant="body2" color="text.secondary">
              Nekro AI
            </Link>
            <Link
              href="https://community.nekro.ai"
              target="_blank"
              rel="noopener"
              variant="body2"
              color="text.secondary"
            >
              Nekro Community
            </Link>
            <Link href="mailto:support@nekro.ai" variant="body2" color="text.secondary">
              Contact Us
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
