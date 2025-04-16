import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const StyledAuthWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: 2,
  width: "100%",
  maxWidth: "420px",
  "@media (min-width: 1024px)": {
    width: "420px",
  },
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
}));
export const SubmitButton = styled(LoadingButton)(
  ({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
);
