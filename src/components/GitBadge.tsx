export function GitBadge({ status }: { status?: string }) {
  if (!status) return null;
  const map: Record<string, string> = {
    M: "text-yellow-400",
    U: "text-green-400",
    A: "text-green-400",
    D: "text-red-400",
    R: "text-blue-400",
  };
  return (
    <span className={`ml-1 text-xs ${map[status] ?? ""}`}>
      {status}
    </span>
  );
}
