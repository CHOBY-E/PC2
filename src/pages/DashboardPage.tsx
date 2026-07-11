import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as productsService from "../services/productsService";
import type { Products } from "../types";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/Button";
import { getErrorMessage } from "../utils/errors";

const PAGE_SIZE = 8;

export default function DashboardPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await productsService.getProducts(page, PAGE_SIZE);
        if (!isMounted) return;
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        if (!isMounted) return;
        setError(getErrorMessage(err));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Catálogo de productos</h1>
        <Link to="/products/new">
          <Button type="button">Nuevo producto</Button>
        </Link>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {isLoading && <p className="text-slate-500">Cargando productos...</p>}

      {!isLoading && !error && products.length === 0 && (
        <p className="rounded-lg bg-slate-50 px-4 py-8 text-center text-slate-500">
          No hay productos disponibles todavía.
        </p>
      )}

      {!isLoading && products.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            type="button"
            disabled={page === 0}
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            className="w-auto px-4"
          >
            Previous
          </Button>

          <span className="text-sm text-slate-600">
            Página {page + 1} de {totalPages}
          </span>

          <Button
            type="button"
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            className="w-auto px-4"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
