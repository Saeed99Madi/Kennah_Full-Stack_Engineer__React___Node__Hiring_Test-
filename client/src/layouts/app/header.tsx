// @mui
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
//utils
import { useResponsive } from "@/hooks/use-responsive";
import { useOffSetTop } from "@/hooks/use-off-set-top";

// theme
import { bgBlur } from "@/theme/css";
// import { useRouter } from '@/routes/hook';

// components

import Logo from "@/components/logo";
import { useSettingsContext } from "@/components/settings";
//
import { HEADER, NAV } from "../config-layout";
import { AccountPopover } from "../_common";
import { Button } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch } from "@/redux/hooks";
import { handleOpen } from "@/redux/slices/tasksSlice";
import Iconify from "@/components/iconify";

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const settings = useSettingsContext();

  const isNavHorizontal = settings.themeLayout === "horizontal";

  const isNavMini = settings.themeLayout === "mini";

  const lgUp = useResponsive("up", "lg");

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  const renderContent = (
    <>
      {lgUp && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!lgUp && (
        <IconButton onClick={onOpenNav}>
          <Iconify
            color={theme.palette.primary.main}
            width={16}
            icon="fontisto:nav-icon-list-a"
          />{" "}
        </IconButton>
      )}

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        <Button
          sx={{
            color: "primary.main",
          }}
          onClick={() => {
            dispatch(handleOpen());
          }}
        >
          Create Task
          <Icon icon="gridicons:create" width="24" height="24" />
        </Button>
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: "background.default",
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
