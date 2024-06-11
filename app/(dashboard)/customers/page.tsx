import Input from "@/app/(client)/generic/Input";
import { Images } from "@/app/Images";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { CiLock } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import FooterPagination from "../commons/FooterPagination";

export default function page() {
  return (
    <section className="flex flex-col w-full h-full p-3">
      <h2 className="text-2xl font-bold">Customer</h2>
      <Input
        labelName=""
        placeholder="Search"
        icon={<CiSearch className="text-xl" />}
        type="text"
        className=" outline-none"
        wrapperClassName="border rounded-md p-2 w-fit"
      />

      <div className="flex flex-col overflow-x-auto w-full h-full my-10">
        <table className="table-auto">
          <thead className="border-b-2">
            <tr className="text-[#8B909A]">
              <th className="text-left">NAME</th>
              <th className="text-left">PHONE NUMBER</th>
              <th className="text-left">CREATED</th>
              <th className="text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-2">
              <td className=" gap-2 flex w-fit h-fit p-2 ">
                <div className="rounded-full h-10 w-10 relative block bg-gray-200 overflow-clip">
                  <Image
                    src={Images.avatar}
                    alt={"user pic"}
                    // width={16}
                    // height={16}
                    // objectFit="contain"
                    fill
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="flex flex-col leading-tight w-fit">
                  <h2 className="font-bold">Robert Fox</h2>
                  <p className="text-sm">robert@gmail.com</p>
                </div>
              </td>
              <td>(201) 555-0124</td>
              <td className="">6 April 2023</td>
              <td className="flex gap-2 h-16 items-center">
                <FiEdit className="cursor-pointer" />
                <CiLock className="cursor-pointer" />
                <RiDeleteBinLine className="cursor-pointer" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <FooterPagination />
    </section>
  );
}
