import bgImg from "../homeStyleModule/homestyle.module.css";

export default function Hero() {
  return (
    <section
      className={`flex items-center justify-end px-20 h-[700px] ${bgImg.bgImage}`}
    >
      <div className="flex flex-col   rounded-md space-y-4 bg-[#FFF3E3] h-[443px] w-[643px] py-10 px-5">
        <h4 className="font-semibold text-2xl">New Arrival</h4>
        <h1 className="text-5xl font-bold leading-normal text-[#B88E2F]">
          Discover Our <br />
          New Collection
        </h1>
        <p className="text-lg font-semibold">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
        <button
          type="button"
          className="bg-[#B88E2F] w-fit px-10 py-5 text-white font-bold"
        >
          BUY NOW
        </button>
      </div>
    </section>
  );
}
