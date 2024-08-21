import ThingsToEnjoy from "../generic/ThingsToEnjoy";
import Banner from "../generic/Banner";
import CartsDetailSection from "./components/CartsDetailSection";

export default function page() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Cart", url: "/cart" },
  ];
  return (
    <section className="flex flex-col">
      <Banner title="Cart" links={links} />
      <CartsDetailSection />
      <ThingsToEnjoy />
    </section>
  );
}
