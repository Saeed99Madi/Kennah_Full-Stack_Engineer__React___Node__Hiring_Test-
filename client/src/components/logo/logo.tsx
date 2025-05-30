import { forwardRef } from "react";
// @mui
import Link from "@mui/material/Link";
import Box, { BoxProps } from "@mui/material/Box";
import { RouterLink } from "@/routes/components";
import Image from "next/image";

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: "inline-flex",
          ...sx,
        }}
        {...other}
      >
        <Image src="/assets/icon.png" alt="Logo" width={40} height={40} />
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: "contents" }}>
        {logo}
      </Link>
    );
  },
);

Logo.displayName = "Logo";

export default Logo;
