// @mui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";

// components
import Logo from "@/components/logo";

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children }: Props) {
  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: "absolute",
        m: { xs: 1.5, md: 4 },
      }}
    />
  );
  const helpSupport = (
    <Box
      sx={{
        position: "absolute",
        left: "3em",
        bottom: "1em",
        zIndex: 9,
        // m: { xs: 1.5, md: 3},
        p: 0.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      Having an issue?
      <span
        style={{
          color: "primary.main",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Contact support{" "}
      </span>
    </Box>
  );

  const renderContent = (
    <Stack
      sx={{
        width: "100%",
        // maxWidth: 480,
        // px: { xs: 2, md: 8 },
        // py: { xs: 15, md: 30 },
        p: 0,
        m: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {children}
    </Stack>
  );

  return (
    <Stack
      direction="column"
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        minHeight: "100vh",
        p: 0,
        m: 0,
        boxSizing: "border-box",
        backgroundImage:
          "url(https://www.amitree.com/wp-content/uploads/2021/08/the-pros-and-cons-of-paper-to-do-lists.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          flexGrow: 1,
          height: "100vh",
          p: 0,
          m: 0,
          boxSizing: "border-box",
        }}
      >
        {renderLogo}
        {renderContent}
        {helpSupport}
      </Grid>
    </Stack>
  );
}
