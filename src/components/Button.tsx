
import type { ButtonHTMLAttributes } from "react";
 
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}
 
export function Button({ children, isLoading, disabled, className = "", ...rest }: ButtonProps) {
    return (
        <button
            disabled={disabled || isLoading}
            className={`rounded-lg bg-indigo-600 py-2.5 font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50 ${className}`}
            {...rest}
        >
            {isLoading ? "Cargando..." : children}
        </button>
    );
}