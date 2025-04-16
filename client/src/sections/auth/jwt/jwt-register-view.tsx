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
// hooks
import { useBoolean } from "src/hooks/use-boolean";
// routes
import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";
import { useSearchParams, useRouter } from "src/routes/hook";
// config
import { PATH_AFTER_LOGIN } from "src/config-global";
// auth
import { useAuthContext } from "src/auth/hooks";
// components
import Iconify from "src/components/iconify";
import FormProvider, { RHFTextField } from "src/components/hook-form";
import { Icon } from "@iconify/react";
import {
  StyledAuthWrapper,
  SubmitButton,
} from "src/components/auth-components";
import { useTheme } from "@mui/material";

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required("First name required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    fullName: "",
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(data.email, data.password, data.fullName);
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
    <Stack spacing={1} sx={{ mb: 0, p: 0, alignItems: "flex-start" }}>
      <Typography variant="h5">Get started with your account</Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Typography variant="body2">Already have an account?</Typography>

        <Link
          component={RouterLink}
          href={paths.auth.jwt.login}
          variant="subtitle2"
        >
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: "text.secondary",
        mt: 2.5,
        typography: "caption",
        textAlign: "center",
      }}
    >
      {"By signing up, I agree to "}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {" and "}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name="fullName" label="FullName" />
        </Stack>
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
                      password.value
                        ? "solar:eye-bold"
                        : "solar:eye-closed-bold"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <SubmitButton
          theme={useTheme()}
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Create account
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
      </Stack>
    </FormProvider>
  );

  return (
    <StyledAuthWrapper
      theme={useTheme()}
      sx={{
        p: 4,
      }}
    >
      {renderHead}

      {renderForm}

      {renderTerms}
    </StyledAuthWrapper>
  );
}
