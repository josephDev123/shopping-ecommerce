import ActiveInLineLink from "./component/ActiveInLineLink";
import bannerImage from "./style/shop.module.css";

export type ILink = {
  name: string;
  url: string;
};
export default function page() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
  ];
  return (
    <section className="flex flex-col">
      <div
        className={`h-[320px] w-full  flex flex-col justify-center items-center ${bannerImage.bg}`}
      >
        <h1 className="text-3xl font-bold mb-1">Shop</h1>
        <ActiveInLineLink items={links} />
      </div>
    </section>
  );
}
