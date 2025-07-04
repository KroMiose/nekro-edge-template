import { Box, Paper, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface TechCardProps {
  icon?: ReactNode;
  iconUrl?: string;
  title: string;
  description: string;
  hoverColor?: string;
}

export const TechCard = ({ icon, iconUrl, title, description, hoverColor }: TechCardProps) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: `0 8px 32px 0 ${hoverColor || theme.palette.primary.main}40`,
          borderColor: hoverColor || theme.palette.primary.light,
        },
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: hoverColor || theme.palette.primary.main,
          "& > svg": {
            width: "100%",
            height: "100%",
          },
        }}
      >
        {iconUrl ? (
          <img
            src={iconUrl}
            alt={`${title} logo`}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          icon
        )}
      </Box>
      <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
};
