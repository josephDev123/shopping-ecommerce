import { RxDashboard } from "react-icons/rx";
import { BsCart3 } from "react-icons/bs";
import { SlPeople } from "react-icons/sl";
import { RiCoupon2Line } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { TbBrandSketch } from "react-icons/tb";

export const leftPanelItem = [
  { icons: <RxDashboard />, text: "Dashboard", path: "/dashboard" },
  {
    icons: <BsCart3 />,
    text: "Order Management",
    path: "/dashboard/order",
  },
  { icons: <SlPeople />, text: "Customers", path: "/dashboard/customers" },
  // { icons: <RiCoupon2Line />, text: "Coupon Code", path: "/" },
  {
    icons: <MdOutlineCategory />,
    text: "Categories",
    path: "/dashboard/categories",
  },
  {
    icons: <AiOutlineTransaction />,
    text: "Transaction",
    path: "/dashboard/transactions",
  },
  // { icons: <TbBrandSketch />, text: "Brand", path: "/brand" },
];
