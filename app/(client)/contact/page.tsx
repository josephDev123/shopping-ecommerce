import Banner from "../generic/Banner";
import { MdLocationPin } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { MdAccessTimeFilled } from "react-icons/md";
import ContactForm from "./components/ContactForm";

export default function page() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ];
  return (
    <section className="flex flex-col w-full h-full ">
      <Banner title="Contact" links={links} />
      <div className="flex flex-col justify-center items-center  my-20 p-2">
        <h2 className="text-xl font-bold">Get In Touch With Us</h2>
        <p className="text-center sm:w-[600px]">
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </p>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-10 w-[80%] mx-auto my-10">
        {/* first div */}
        <div className="flex flex-col space-y-4">
          <div className="flex gap-3">
            <MdLocationPin />
            <div className="flex flex-col">
              <h2 className="font-bold">Address</h2>
              <p>Sabo, palace road </p>
              <p>Abeokuta, Sagamu </p>
              <p>Nigeria.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <IoIosCall />
            <div className="flex flex-col">
              <h2 className="font-bold">Address</h2>
              <p>Mobile: +(234) 8130197306</p>
              {/* <p>Hotline: +(84) 456-6789</p> */}
            </div>
          </div>

          <div className="flex gap-3">
            <MdAccessTimeFilled />
            <div className="flex flex-col">
              <h2 className="font-bold">Working Time</h2>
              <p>Monday-Friday: 9:00 - 22:00</p>
              <p>Saturday-Sunday: 9:00 - 21:00</p>
            </div>
          </div>
        </div>

        {/* second div */}
        <ContactForm />
      </div>
    </section>
  );
}
