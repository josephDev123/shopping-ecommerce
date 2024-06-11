import Button from "@/app/(client)/generic/Button";
import Input, { SelectInput } from "@/app/(client)/generic/Input";
import { CiSearch } from "react-icons/ci";
import { MdOutlineExpandLess } from "react-icons/md";
import FooterPagination from "../commons/FooterPagination";

export default function page() {
  return (
    <section className="flex flex-col w-full h-full p-3">
      <h2 className="text-2xl font-bold">Transaction</h2>
      <div className="flex justify-between  items-center w-full">
        <div className="flex gap-2">
          <Input
            labelName=""
            placeholder="Search"
            icon={<CiSearch className="text-xl" />}
            type="text"
            className=" outline-none"
            wrapperClassName="border rounded-md p-2 w-fit"
          />

          <SelectInput
            data={[]}
            placeholder="Status"
            labelName=""
            className="border rounded-md p-2 outline-none"
          />
        </div>

        <div>
          <SelectInput
            data={[]}
            placeholder="Filter by Range"
            labelName=""
            className="border rounded-md p-2 outline-none w-[200px]"
          />
        </div>
      </div>

      <div className="flex flex-col overflow-x-auto w-full h-full my-10">
        <table>
          <thead className="bg-gray-200">
            <tr className="text-black/70">
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">CUSTOMER</th>
              <th className="text-left p-2">DATE</th>
              <th className="text-left p-2">TOTAL</th>
              <th className="text-left p-2">METHOD</th>
              <th className="text-left p-2">STATUS</th>
              <th className="text-left p-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">#5089</td>
              <td className="p-2">Joseph Wheeler</td>
              <td className="p-2">6 April, 2023</td>
              <td className="p-2">$2,564</td>
              <td className="p-2">CC</td>
              <td className="text-yellow-400 font-semibold">Pending</td>
              <td>
                <Button
                  textContent="View Details"
                  className="text-blue-600 font-semibold"
                />
              </td>
            </tr>

            <tr>
              <td className="p-2">#5089</td>
              <td className="p-2">Joseph Wheeler</td>
              <td className="p-2">6 April, 2023</td>
              <td className="p-2">$2,564</td>
              <td className="p-2">CC</td>
              <td className="text-green-400 font-semibold">succeeded</td>
              <td>
                <Button
                  textContent="View Details"
                  className="text-blue-600 font-semibold"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <FooterPagination />
    </section>
  );
}
