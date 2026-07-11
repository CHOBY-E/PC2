import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
      <h1 className="text-4xl font-bold text-slate-800">404</h1>
      <p className="text-slate-500">La página que buscas no existe.</p>
      <Link to="/dashboard" className="font-semibold text-indigo-600 hover:underline">
        Volver al catálogo
      </Link>
    </div>
  );
}
