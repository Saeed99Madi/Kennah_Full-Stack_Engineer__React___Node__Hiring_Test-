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
  app: {
    root: ROOTS.App,
    tasks: {
      create: `${ROOTS.App}/create`,
      view: `${ROOTS.App}/view/:id`,
      inBox: `${ROOTS.App}/in-box`,
      completed: `${ROOTS.App}/completed`,
      pdf: `${ROOTS.App}/pdf-task`,
    },
  },
};
