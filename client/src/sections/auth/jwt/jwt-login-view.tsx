"use client";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

// routes
import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";
import { useSearchParams, useRouter } from "@/routes/hook";
// config
import { PATH_AFTER_LOGIN } from "src/config-global";
// hooks
import { useBoolean } from "src/hooks/use-boolean";
// auth
import { useAuthContext } from "src/auth/hooks";
// components
import Iconify from "src/components/iconify";
import FormProvider, { RHFTextField } from "@/components/hook-form";
import { Icon } from "@iconify/react";
import { StyledAuthWrapper, SubmitButton } from "@/components/auth-components";
import { useTheme } from "@mui/material";

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");

  const password = useBoolean();

  const theme = useTheme();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    // defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
      );
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ alignItems: "flex-start", mb: 4 }}>
      <Typography variant="h5">Sign in to your account</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">Don&apos;t have an account?</Typography>

        <Link
          component={RouterLink}
          href={paths.auth.jwt.register}
          variant="subtitle2"
        >
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="email" label="Email address" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify
                  icon={
                    password.value ? "solar:eye-bold" : "solar:eye-closed-bold"
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <SubmitButton
        fullWidth
        theme={theme}
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
        <InputAdornment position="end">
          <IconButton onClick={password.onToggle} edge="end">
            <Icon
              icon="eva:arrow-ios-forward-fill"
              width="24"
              height="24"
              color="#fff"
            />
          </IconButton>
        </InputAdornment>
      </SubmitButton>
      <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        variant="body2"
        color="inherit"
        underline="always"
        sx={{ alignSelf: "flex-end" }}
      >
        Forgot password?
      </Link>
    </Stack>
  );

  return (
    <StyledAuthWrapper
      sx={{
        p: 4,
      }}
      theme={theme}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderHead}
        {renderForm}
      </FormProvider>
    </StyledAuthWrapper>
  );
}
