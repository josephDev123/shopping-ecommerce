import Image from "next/image";
import ActiveInLineLink from "../shop/component/ActiveInLineLink";
import bannerImage from "../shop/style/shop.module.css";
import { Images } from "@/app/Images";
import { MdDelete } from "react-icons/md";

export default function page() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Cart", url: "/cart" },
  ];
  return (
    <section className="flex flex-col">
      <div
        className={`h-[320px] w-full  flex flex-col justify-center items-center ${bannerImage.bg}`}
      >
        <h1 className="text-3xl font-bold mb-1">Cart</h1>
        <ActiveInLineLink items={links} />
      </div>

      <div className="flex gap-4 justify-between w-[80%] mx-auto mt-10">
        <table className="w-full">
          <thead className="bg-[#F9F1E7]">
            <tr className="">
              <th className="py-4 text-left pl-2">img</th>
              <th className="py-4 text-left">Product</th>
              <th className="py-4 text-left">Price</th>
              <th className="py-4 text-left">Quantity</th>
              <th className="py-4 text-left">subtotal</th>
              <th className="py-4 text-left">delete</th>
            </tr>
          </thead>
          <tbody className="w-full">
            <tr className="">
              <td className="pl-2">
                {/* <Image
                  src={""}
                  //Images.product4
                  alt=""
                  fill
                  className="h-[105px] w-[105px]"
                /> */}
                img
              </td>
              <td className="py-4">Asgaard sofa</td>
              <td className="py-4">Rs. 250,000.00</td>
              <td className="py-4">1</td>
              <td className="py-4">Rs. 250,000.00</td>
              <td className="py-4">
                <MdDelete className="cursor-pointer " />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="bg-[#F9F1E7] w-[40%] flex flex-col justify-center items-center">
          <h2 className="font-bold text-xl">Cart Totals</h2>
          <div className="flex gap-4 items-start ">
            <p>Subtotal</p>
            <p>Rs. 250,000.00</p>
          </div>

          <div className="flex gap-4 items-start ">
            <p>Total</p>
            <p className="text-lg text-[#B88E2F] font-medium">Rs. 250,000.00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
