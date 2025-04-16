"use client";

import { useEffect, useReducer, useCallback, useMemo } from "react";
// utils
import axiosInstance, { endpoints } from "@/utils/axios";

import { AuthContext } from "./auth-context";
import { isValidToken, setSession } from "./utils";
import { ActionMapType, AuthStateType, AuthUserType } from "../../types";

// ----------------------------------------------------------------------

enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = "accessToken";

type Props = {
  children: React.ReactNode;
};

// Initialize Firebase

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axiosInstance.get(endpoints.auth.me);
        const { user } = response.data.data;
        console.log(user);

        dispatch({
          type: Types.INITIAL,
          payload: { user },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: { user: null },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: { user: null },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const response = await axiosInstance.post(
      endpoints.auth.login,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    console.log(response, "response");

    console.log(response.data);
    const { accessToken, user } = response.data;

    sessionStorage.setItem(STORAGE_KEY, accessToken);
    setSession(accessToken);

    dispatch({
      type: Types.LOGIN,
      payload: { user },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, fullName: string) => {
      const response = await axiosInstance.post(endpoints.auth.register, {
        email,
        password,
        fullName: fullName,
      });

      const { accessToken, user } = response.data;

      sessionStorage.setItem(STORAGE_KEY, accessToken);
      setSession(accessToken);

      dispatch({
        type: Types.REGISTER,
        payload: { user },
      });
    },
    [],
  );

  // LOGOUT
  const logout = useCallback(async () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const contextValue = useMemo(
    () => ({
      user: state.user,
      method: "jwt",
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
