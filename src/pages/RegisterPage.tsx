import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import  useAuth  from "../hooks/useAuth";
import Input from "../components/Input";
import { Button } from "../components/Button";

const containerClass =
    "flex min-h-[calc(100vh-56px)] items-center justify-center bg-slate-800 px-4";

const cardClass =
    "w-full max-w-sm rounded-2xl bg-black p-8 shadow-lg";

const fields = [
    { id: "name", label: "Nombre", type: "text" },
    { id: "email", label: "Correo", type: "email" },
    { id: "password", label: "Contraseña", type: "password" },
    {id: "fullname", label: "fullname", type: "fullname", },
] as const;

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
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

        const { name, email, password, fullname} = form;

        setIsLoading(true);

        try {
            await register(name, email, password, fullname);
            navigate("/products");
        } catch (err) {
            const message = axios.isAxiosError(err)
                ? (err.response?.data?.message ?? "no se pudo crear la cuenta")
                : "no se pudo conectar al servidor";

            setError(message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={containerClass}>
            <div className={cardClass}>
                <div className="mb-6 text-center">

                    <h1 className="text-2xl font-bold text-slate-800">
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
                        <p className="text-sm text-red-600">{error}</p>
                    )}

                    <Button type="submit" isLoading={isLoading}>
                        Registrar
                    </Button>
                </form>

                <p className="mt-5 text-center text-sm text-slate-500">
                    ¿Ya tienes cuenta?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-indigo-600 hover:underline"
                    >
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}