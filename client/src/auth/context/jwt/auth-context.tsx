"use client";

import { createContext } from "react";
import { AuthUserType } from "../../types";

export type JWTContextType = {
  user: AuthUserType;
  method: string;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext({} as JWTContextType);
