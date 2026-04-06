import { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-kream-lightgray mb-3">{icon}</div>
      <h3 className="text-sm font-semibold text-kream-black mb-1">{title}</h3>
      <p className="text-xs text-kream-gray">{description}</p>
    </div>
  );
}
