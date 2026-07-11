
import type { ReactNode } from "react";
import { Navbar } from "../components/Navbar";
 
export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main>{children}</main>
        </div>
    );
}