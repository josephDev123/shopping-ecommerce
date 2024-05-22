import Banner from "../generic/Banner";
import { MdLocationPin } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { MdAccessTimeFilled } from "react-icons/md";
import Input, { Textarea } from "../generic/Input";
import Button from "../generic/Button";

export default function page() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ];
  return (
    <section className="flex flex-col w-full h-full ">
      <Banner title="Contact" links={links} />
      <div className="flex flex-col justify-center items-center  my-20">
        <h2 className="text-xl font-bold">Get In Touch With Us</h2>
        <p className="text-center w-[600px]">
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </p>
      </div>
      <div className="grid grid-cols-2 gap-10 w-[80%] mx-auto my-10">
        {/* first div */}
        <div className="flex flex-col space-y-4">
          <div className="flex gap-3">
            <MdLocationPin />
            <div className="flex flex-col">
              <h2 className="font-bold">Address</h2>
              <p>236 5th SE Avenue, New </p>
              <p>York NY10000, United </p>
              <p>States.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <IoIosCall />
            <div className="flex flex-col">
              <h2 className="font-bold">Address</h2>
              <p>Mobile: +(84) 546-6789</p>
              <p>Hotline: +(84) 456-6789</p>
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
        <form method="post" className="flex flex-col  space-y-4">
          <Input
            type="text"
            labelName="Your name"
            errorLabel=""
            className="border p-3 outline-none"
            placeholder="Abc"
          />

          <Input
            type="email"
            labelName="Email address"
            errorLabel=""
            className="border p-3 outline-none"
            placeholder="Abc@def.com"
          />

          <Input
            type="text"
            labelName="Subject"
            errorLabel=""
            className="border p-3 outline-none"
            placeholder="This is an optional"
          />

          <Textarea
            labelName="Message"
            errorLabel=""
            className="border p-3 outline-none"
            placeholder="Hi! i’d like to ask about"
          />

          <Button
            textContent="Submit"
            className="bg-yellow-600 w-[200px] p-3 rounded-md text-white"
          />
        </form>
      </div>
    </section>
  );
}
