
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import type { AuthContextValue } from "../types";
 
export default function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    }
    return ctx;
}
 