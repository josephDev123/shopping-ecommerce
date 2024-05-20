import Image from "next/image";
import ActiveInLineLink from "../shop/component/ActiveInLineLink";
import bannerImage from "../shop/style/shop.module.css";
import { Images } from "@/app/Images";
import { MdDelete } from "react-icons/md";
import { Butcherman } from "next/font/google";
import Button from "../generic/Button";
import ThingsToEnjoy from "../generic/ThingsToEnjoy";
import Banner from "../generic/Banner";

export default function page() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Cart", url: "/cart" },
  ];
  return (
    <section className="flex flex-col">
      <Banner title="Cart" links={links} />

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
        <div className="bg-[#F9F1E7] w-[40%] flex flex-col self-start justify-center items-center py-6">
          <h2 className="font-bold text-xl mb-8">Cart Totals</h2>
          <div className="flex gap-4 items-start ">
            <p>Subtotal</p>
            <p>Rs. 250,000.00</p>
          </div>

          <div className="flex gap-4 items-start ">
            <p>Total</p>
            <p className="text-lg text-[#B88E2F] font-medium">Rs. 250,000.00</p>
          </div>
          <Button
            textContent="Check Out"
            className="border border-black rounded-md py-2 px-6 mt-4"
          />
        </div>
      </div>

      <ThingsToEnjoy />
    </section>
  );
}
