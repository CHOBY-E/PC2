import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <header className="bg-slate-900 text-white">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link to="/dashboard" className="text-lg font-bold text-indigo-400">
                    TechStore
                </Link>

                <div className="flex items-center gap-4 text-sm">
                    {isAuthenticated && (
                        <>
                            <Link to="/dashboard" className="hover:text-indigo-300">
                                Productos
                            </Link>
                            <Link to="/products/new" className="hover:text-indigo-300">
                                Nuevo producto
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="rounded bg-slate-700 px-3 py-1 hover:bg-slate-600"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    )}

                    {!isAuthenticated && (
                        <Link to="/login" className="hover:text-indigo-300">
                            Iniciar sesión
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
