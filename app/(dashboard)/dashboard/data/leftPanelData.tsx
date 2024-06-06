import { RxDashboard } from "react-icons/rx";
import { BsCart3 } from "react-icons/bs";
import { SlPeople } from "react-icons/sl";
import { RiCoupon2Line } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { TbBrandSketch } from "react-icons/tb";

export const leftPanelItem = [
  { icons: <RxDashboard />, text: "Dashboard", path: "dashboard" },
  {
    icons: <BsCart3 />,
    text: "Order Management",
    path: "order",
  },
  { icons: <SlPeople />, text: "Customers", path: "/customers" },
  { icons: <RiCoupon2Line />, text: "Coupon Code", path: "/coupon " },
  { icons: <MdOutlineCategory />, text: "Categories", path: "/categories" },
  {
    icons: <AiOutlineTransaction />,
    text: "Transaction",
    path: "/transaction",
  },
  { icons: <TbBrandSketch />, text: "Brand", path: "/brand" },
];
