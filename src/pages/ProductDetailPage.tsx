import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as productsService from "../services/productsService";
import Input from "../components/Input";
import { Button } from "../components/Button";
import { getErrorMessage } from "../utils/errors";

const containerClass =
    "flex min-h-[calc(100vh-56px)] items-center justify-center bg-slate-800 px-4";

const cardClass = "w-full max-w-sm rounded-2xl bg-black p-8 shadow-lg";

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        imageUrl: "",
    });

    const [isFetching, setIsFetching] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!id) return;
        const productId = id;
        let isMounted = true;

        async function fetchProduct() {
            setIsFetching(true);
            setError(null);
            setNotFound(false);
            try {
                const response = await productsService.getProductById(productId);
                if (!isMounted) return;
                const product = response.data;
                setForm({
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    price: String(product.price),
                    stock: String(product.stock),
                    imageUrl: product.imageUrl ?? "",
                });
            } catch (err) {
                if (!isMounted) return;
                setError(getErrorMessage(err));
                setNotFound(true);
            } finally {
                if (isMounted) setIsFetching(false);
            }
        }

        fetchProduct();
        return () => {
            isMounted = false;
        };
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!id) return;
        setError(null);
        setIsSaving(true);

        const { name, description, category, price, stock, imageUrl } = form;

        try {
            await productsService.updateProduct(id, {
                name,
                description,
                category,
                price: Number(price),
                stock: Number(stock),
                imageUrl,
            });
            navigate("/dashboard");
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDelete() {
        if (!id) return;
        const confirmed = window.confirm(
            "¿Seguro que deseas eliminar este producto? Esta acción no se puede deshacer."
        );
        if (!confirmed) return;

        setError(null);
        setIsDeleting(true);
        try {
            await productsService.deleteProduct(id);
            navigate("/dashboard");
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsDeleting(false);
        }
    }

    if (isFetching) {
        return (
            <div className={containerClass}>
                <p className="text-slate-300">Cargando producto...</p>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className={containerClass}>
                <div className={cardClass}>
                    <p className="text-center text-red-400">{error}</p>
                    <Link
                        to="/dashboard"
                        className="mt-4 block text-center font-semibold text-indigo-400 hover:underline"
                    >
                        Volver al catálogo
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={containerClass}>
            <div className={cardClass}>
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-slate-100">
                        Editar producto
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        id="name"
                        name="name"
                        label="Nombre del producto"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                    />
                    <Input
                        id="description"
                        name="description"
                        label="Descripción"
                        type="text"
                        required
                        value={form.description}
                        onChange={handleChange}
                    />

                    <Input
                        id="category"
                        name="category"
                        label="Categoría"
                        type="text"
                        required
                        value={form.category}
                        onChange={handleChange}
                    />

                    <Input
                        id="price"
                        name="price"
                        label="Precio"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={form.price}
                        onChange={handleChange}
                    />
                    <Input
                        id="stock"
                        name="stock"
                        label="Stock"
                        type="number"
                        min="0"
                        required
                        value={form.stock}
                        onChange={handleChange}
                    />
                    <Input
                        id="imageUrl"
                        name="imageUrl"
                        label="Imagen URL"
                        type="text"
                        value={form.imageUrl}
                        onChange={handleChange}
                    />

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <Button type="submit" isLoading={isSaving}>
                        Guardar cambios
                    </Button>

                    <Button
                        type="button"
                        isLoading={isDeleting}
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-500"
                    >
                        Eliminar producto
                    </Button>
                </form>

                <p className="mt-5 text-center text-sm text-slate-400">
                    <Link
                        to="/dashboard"
                        className="font-semibold text-indigo-400 hover:underline"
                    >
                        Volver al catálogo
                    </Link>
                </p>
            </div>
        </div>
    );
}