import { Box, Container, Grid, Typography } from "@mui/material";
import { UseCaseCard } from "./UseCaseCard";
import { usecases } from "./usecases.data";

export const UseCaseSection = () => {
  return (
    <Box sx={{ py: 12, bgcolor: "rgba(128, 128, 128, 0.05)" }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" fontWeight="bold" textAlign="center" gutterBottom>
          无限的应用可能性
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 8, maxWidth: "700px", mx: "auto" }}
        >
          基于我们强大的全栈类型安全能力，您可以轻松构建各种复杂的、生产级的 Web 应用。
        </Typography>
        <Grid container spacing={2} alignItems="stretch">
          {usecases.map((usecase, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <UseCaseCard {...usecase} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
