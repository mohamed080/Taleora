export function SectionDivider() {
  return (
    <div
      className="h-4"
      style={{
        backgroundImage:
          "radial-gradient(circle at 10px -2px, #fb7185 10px, transparent 11px), radial-gradient(circle at 30px -2px, #f97316 10px, transparent 11px), radial-gradient(circle at 50px -2px, #facc15 10px, transparent 11px), radial-gradient(circle at 70px -2px, #22d3ee 10px, transparent 11px)",
        backgroundSize: "80px 16px",
      }}
    />
  );
}
