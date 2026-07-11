import type { AvailabilityStatus } from "../types";

const STYLES: Record<AvailabilityStatus, string> = {
  DISPONIBLE: "bg-green-100 text-green-800",
  AGOTADO: "bg-red-100 text-red-800",
  PROXIMAMENTE: "bg-yellow-100 text-yellow-800",
};

const LABELS: Record<AvailabilityStatus, string> = {
  DISPONIBLE: "Disponible",
  AGOTADO: "Agotado",
  PROXIMAMENTE: "Próximamente",
};

export function AvailabilityBadge({ status }: { status: AvailabilityStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
