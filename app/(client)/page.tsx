import Hero from "./homeComponents/Hero";

export default function page() {
  return (
    <section className="">
      <Hero />
      <div className="flex flex-col items-center py-6">
        <h2 className="font-bold text-xl">Browse The Range</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </section>
  );
}
