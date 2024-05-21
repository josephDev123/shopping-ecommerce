import Banner from "../generic/Banner";

export default function page() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ];
  return (
    <section className="flex flex-col w-full h-full ">
      <Banner title="Contact" links={links} />
      <div className="flex flex-col justify-center items-center  my-20">
        <h2 className="text-xl font-bold">Get In Touch With Us</h2>
        <p className="text-center w-[600px]">
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </p>
      </div>
    </section>
  );
}
