
import type { InputHTMLAttributes } from "react";
 
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}
 
export default function Input({ label, id, className = "", ...rest }: InputProps) {
    return (
        <label htmlFor={id} className="flex flex-col gap-1 text-sm font-medium text-slate-300">
            {label}
            <input
                id={id}
                className={`rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-950 ${className}`}
                {...rest}
            />
        </label>
    );
}