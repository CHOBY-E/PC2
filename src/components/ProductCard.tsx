import { Link } from "react-router-dom";
import type { Products } from "../types";
import { AvailabilityBadge } from "./Badge";

export function ProductCard({ product }: { product: Products }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="aspect-video w-full bg-slate-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
            Sin imagen
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900">{product.name}</h3>
          <AvailabilityBadge status={product.availability} />
        </div>

        <p className="text-xs uppercase tracking-wide text-slate-500">
          {product.category}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2 text-sm">
          <span className="font-bold text-indigo-600">
            S/ {product.price.toFixed(2)}
          </span>
          <span className="text-slate-500">Stock: {product.stock}</span>
        </div>
      </div>
    </Link>
  );
}
