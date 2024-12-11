import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex flex-col justify-center items-center">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link
          href="/"
          className="p-2 rounded-md bg-green-500 w-full text-center text-white"
        >
          Return Home.
        </Link>
      </div>
    </section>
  );
}
