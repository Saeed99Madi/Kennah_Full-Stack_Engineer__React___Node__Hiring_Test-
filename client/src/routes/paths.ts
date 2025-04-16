// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: "/auth",
  App: "/tasks",
};

// ----------------------------------------------------------------------

export const paths = {
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
      forgotPassword: `${ROOTS.AUTH}/jwt/forgot-password`,
      resetPassword: `${ROOTS.AUTH}/jwt/reset-password`,
    },
  },
  // DASHBOARD
  app: {
    root: ROOTS.App,
    tasks: {
      create: `${ROOTS.App}/create`,
    },
    inBox: `${ROOTS.App}/in-box`,
    two: `${ROOTS.App}/two`,
    three: `${ROOTS.App}/three`,
    group: {
      root: `${ROOTS.App}/group`,
      five: `${ROOTS.App}/group/five`,
      six: `${ROOTS.App}/group/six`,
    },
  },
};
