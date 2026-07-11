import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Input from "../components/Input";
import { Button } from "../components/Button";
import { getErrorMessage } from "../utils/errors";

const containerClass =
    "flex min-h-[calc(100vh-56px)] items-center justify-center bg-slate-800 px-4";

const cardClass = "w-full max-w-sm rounded-2xl bg-black p-8 shadow-lg";

const fields = [
    { id: "username", label: "Usuario", type: "text" },
    { id: "email", label: "Correo", type: "email" },
    { id: "password", label: "Contraseña", type: "password" },
    { id: "fullname", label: "Nombre completo", type: "text" },
] as const;

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        fullname: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);

        const { username, email, password, fullname } = form;

        setIsLoading(true);

        try {
            await register(username, email, password, fullname);
            navigate("/dashboard");
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={containerClass}>
            <div className={cardClass}>
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-slate-100">
                        Crear cuenta
                    </h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    {fields.map((field) => (
                        <Input
                            key={field.id}
                            {...field}
                            name={field.id}
                            required
                            value={form[field.id]}
                            onChange={handleChange}
                        />
                    ))}

                    {error && (
                        <p className="text-sm text-red-400">{error}</p>
                    )}

                    <Button type="submit" isLoading={isLoading}>
                        Registrar
                    </Button>
                </form>

                <p className="mt-5 text-center text-sm text-slate-400">
                    ¿Ya tienes cuenta?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-indigo-400 hover:underline"
                    >
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
