import Link from "next/link";
import { TbMathGreater } from "react-icons/tb";
import { ProductResponseType } from "@/app/types/productsType";
import { FullProduct } from "@/app/types/productWithRelatedItem";

interface ShopHeadingProps {
  // data: ProductResponseType;
  data: FullProduct;
}
export default function ShopHeading({ data }: ShopHeadingProps) {
  const productDataArray = Array.isArray(data) ? data : [data];
  const product = productDataArray[0];
  return (
    <div className="bg-[#F9F1E7] flex flex-col">
      <div className="flex items-center justify-start py-6 w-[80%] gap-3 mx-auto">
        <Link className="inline-flex items-center gap-1" href={"/"}>
          <span className="text-black/50">Home</span> <TbMathGreater />
        </Link>
        <Link className="inline-flex items-center gap-1" href={"/shop"}>
          <span className="text-black/50">Shop</span> <TbMathGreater />
        </Link>
        <div className="h-8 w-0.5 bg-black"></div>
        <span className="font-bold">{product.productName || ""}</span>
      </div>
    </div>
  );
}
