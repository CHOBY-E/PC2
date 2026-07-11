
import api from "../api/axios";
import type { Auth, Login, Register } from "../types.ts";

export const login = (data:Login) =>
    api.post<Auth>("/auth/login", data);

export const register = (data:Register) =>
    api.post<Auth>("/auth/register", data);

