import { m } from "framer-motion";
// @mui
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// routes
import { useRouter } from "@/routes/hook";

// hooks
import { useAuthContext } from "@/auth/hooks";
// components
import { varHover } from "@/components/animate";
import CustomPopover, { usePopover } from "@/components/custom-popover";
import { AuthContext } from "@/auth/context/jwt";
import { useContext, useEffect, useState } from "react";

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();
  const [avatar, setAvatar] = useState("");

  const { user } = useContext(AuthContext);

  const { logout } = useAuthContext();

  const popover = usePopover();

  useEffect(() => {
    if (user && user.avatarUrl) {
      setAvatar(user.avatarUrl);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        {user && (
          <Avatar
            src={
              avatar ||
              "data:image/jpeg;base64,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"
            }
            // alt={user?.fllName}
            sx={{
              width: 36,
              height: 36,
              border: (theme) =>
                `solid 2px ${theme.palette.background.default}`,
            }}
          >
            {user?.fllName}
          </Avatar>
        )}
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.fullName}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: "fontWeightBold", color: "error.main" }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
