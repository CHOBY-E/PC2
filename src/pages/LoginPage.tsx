
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import  useAuth  from "../hooks/useAuth";
import  Input  from "../components/Input";
import { Button } from "../components/Button";
 
export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
 
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await login(email, password);
            navigate("/animes");
        } catch (err) {
            const message = axios.isAxiosError(err)
                ? (err.response?.data?.message ?? "Credenciales inválidas")
                : "No se pudo conectar al servidor";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }
 
    return (
        <div className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-slate-800 px-4">
            <div className="w-full max-w-sm rounded-xl bg-black p-6 shadow">
                <h1 className="mb-6 text-center text-2xl font-bold">
                    TechStore
                </h1>
 
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
 
                    {error && <p className="text-sm text-red-600">{error}</p>}
 
                    <Button type="submit" isLoading={isLoading}>
                        Iniciar sesión
                    </Button>
                </form>

                <p className="mt-5 text-center text-sm text-slate-500">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register" className="font-semibold text-indigo-600 hover:underline">
                        Registrarse
                    </Link>
                </p>
            </div>
        </div>
    );
}