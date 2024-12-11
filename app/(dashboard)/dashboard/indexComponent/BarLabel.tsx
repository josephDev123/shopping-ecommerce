interface BarLabelProps {
  className: string;
  label: string;
}
export default function BarLabel({ className, label }: BarLabelProps) {
  return (
    <section className="flex flex-col">
      <label htmlFor="" className="sm:text-base text-sm font-semibold">
        {label}
      </label>
      <div className={`w-full bg-gray-600 rounded-full h-4 ${className}`}></div>
    </section>
  );
}
