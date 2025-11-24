export function Card({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="text-sm font-medium text-gray-700 mb-2">{title}</div>
      <div className="text-2xl">{children}</div>
    </div>
  );
}
