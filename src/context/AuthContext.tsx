
import { createContext, useEffect, useState, type ReactNode } from "react";
import * as authService from "../services/authService";
import type { AuthContextValue } from "../types.ts";
import type { User } from "../types.ts";
 
const TOKEN_KEY = "techstore_token";
const USER_KEY = "techstore_user";
 
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
 
export default function AuthProvider({ children }: { children: ReactNode }) {

    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem(TOKEN_KEY)
    );
    const [user, setUser] = useState<User | null>(() => {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? (JSON.parse(raw) as User) : null;
    });
 
    async function login(email: string, password: string): Promise<void> {
        const response = await authService.login({ email, password });
        const newToken = response.data.token;
        const newUser: User = { email };
 
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
 
        setToken(newToken);
        setUser(newUser);
    }
 
    async function register(username: string, email: string, password: string, fullname: string): Promise<void> {
        const response = await authService.register({ username, email, password, fullname });
        const newToken = response.data.token;
        const newUser: User = { email, username };
 
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
 
        setToken(newToken);
        setUser(newUser);
    }
 
    function logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
    }

    useEffect(() => {
        function handleUnauthorized() {
            logout();
        }
        window.addEventListener("techstore:unauthorized", handleUnauthorized);
        return () =>
            window.removeEventListener("techstore:unauthorized", handleUnauthorized);
    }, []);
 
    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated: token !== null, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}



