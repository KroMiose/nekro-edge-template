import { Box, useTheme } from "@mui/material";
import { FeatureSection } from "@frontend/components/landing/FeatureSection";
import { HeroSection } from "@frontend/components/landing/HeroSection";
import { ServerlessAdvantageSection } from "@frontend/components/landing/ServerlessAdvantageSection";
import { TechStackSection } from "@frontend/components/landing/TechStackSection";
import { UseCaseSection } from "@frontend/components/landing/UseCaseSection";

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.pageBackground,
      }}
    >
      <HeroSection />
      <FeatureSection />
      <UseCaseSection />
      <ServerlessAdvantageSection />
      <TechStackSection />
    </Box>
  );
};

export default HomePage;
