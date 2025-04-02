import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface LoaderProps {
  className: string;
}
export default function Loader({ className }: LoaderProps) {
  return (
    <section className="h-72 w-full flex flex-col justify-center items-center">
      <AiOutlineLoading3Quarters className={`animate-spin ${className}`} />
    </section>
  );
}
