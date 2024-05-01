import { IproductCardTypes } from "@/app/data/productCardData";
import Image from "next/image";

type IProductCard = {
  credential: IproductCardTypes;
};

export default function ProductCard({ credential }: IProductCard) {
  const discountedPrice =
    Number(credential.price.slice(1)) * (1 - Number(credential.discount) / 100);

  return (
    <section className="flex flex-col bg-[#F4F5F7] relative cursor-pointer">
      <span className="bg-[#E97171] rounded-full flex flex-col h-fit justify-center items-center absolute right-6 top-8 p-1 text-white ">
        {credential.discount}%
      </span>
      <Image
        src={credential.img}
        alt=""
        height={300}
        width={300}
        style={{ maxHeight: 300 }}
      />
      <div className=" p-2">
        <p className="font-bold">{credential.productname}</p>
        <p className="truncate">{credential.description}</p>
        <span className="flex justify-between items-center">
          <p className="font-bold">{credential.price}</p>
          <p className="">{discountedPrice.toFixed(2)}</p>
        </span>
      </div>
    </section>
  );
}
