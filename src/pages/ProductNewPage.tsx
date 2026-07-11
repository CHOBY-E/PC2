import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";
import Input from "../components/Input";
import { Button } from "../components/Button";
import type { Products } from "../types";

const containerClass =
    "flex min-h-[calc(100vh-56px)] items-center justify-center bg-slate-800 px-4";

const cardClass =
    "w-full max-w-sm rounded-2xl bg-black p-8 shadow-lg";

const fields = [
    { id: "name", label: "Nombre", type: "text" },
    { id: "description", label: "Descripción", type: "text" },
    { id: "category", label: "Categoría", type: "text" },
    { id: "price", label: "Precio", type: "number" },
    { id: "stock", label: "Stock", type: "number" },
    { id: "imageUrl", label: "Imagen URL", type: "text" },
] as const;

export default function ProductNewPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        imageUrl: "",
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

        const { name, description, category, price, stock, imageUrl } = form;

        setIsLoading(true);

        try {
            await api.post<Products>("/products", {
                name,
                description,
                category,
                price: Number(price),
                stock: Number(stock),
                imageUrl,
                availability: "DISPONIBLE",
            });
            navigate("/products");
        } catch (err) {
            const message = axios.isAxiosError(err)
                ? (err.response?.data?.message ?? "no se pudo crear el producto")
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
                        Crear producto
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <Button type="submit" isLoading={isLoading}>
                        Guardar producto
                    </Button>
                </form>

                <p className="mt-5 text-center text-sm text-slate-500">
                    <Link
                        to="/products"
                        className="font-semibold text-indigo-600 hover:underline"
                    >
                        Cancelar
                    </Link>
                </p>
            </div>
        </div>
    );
}