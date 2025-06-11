interface BarLabelProps {
  className?: string;
  label: string;
  value: number;
}

export default function BarLabel({
  className = "",
  label,
  value,
}: BarLabelProps) {
  const barWidth = 100;
  const progressBar = Math.max(0, Math.min(value, 100)); // Ensures 0 ≤ value ≤ 100

  return (
    <section className="flex flex-col">
      <label className="sm:text-base text-sm font-semibold">{label}</label>
      <div
        style={{ width: `${barWidth}%` }}
        className={` bg-gray-600 rounded-full h-4 overflow-hidden relative ${className}`}
      >
        <span
          title={`${progressBar}%`}
          style={{ width: `${progressBar}%` }}
          className="absolute left-0 top-0 h-full bg-green-500 transition-all"
        />
      </div>
    </section>
  );
}
