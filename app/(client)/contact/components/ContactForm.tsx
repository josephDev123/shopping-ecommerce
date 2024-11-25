"use client";

import { useForm } from "react-hook-form";
import Button from "../../generic/Button";
import Input, { TextareaInput } from "../../generic/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import ContactFormSchema, {
  ContactFormType,
} from "@/app/zod-schema/contactFormSchema";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormType>({
    resolver: zodResolver(ContactFormSchema),
  });
  console.log(errors);

  const handleSubmitContactForm = async (data: ContactFormType) => {
    console.log(data);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok && response.status === 200) {
        reset();
        toast.success(
          "Contact form submitted successfully. We  will get back to you soon."
        );
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };
  return (
    <section className="w-full h-full flex flex-col">
      <form
        onSubmit={handleSubmit(handleSubmitContactForm)}
        className="flex flex-col w-full space-y-4"
      >
        <Input
          name="name"
          register={register}
          type="text"
          labelName={errors.name?.message || ""}
          errorLabel=""
          className="border p-3 outline-none w-full"
          placeholder="Abc"
        />

        <Input
          name="email"
          register={register}
          type="email"
          labelName="Email address"
          errorLabel={errors.email?.message || ""}
          className="border p-3 outline-none w-full"
          placeholder="Abc@def.com"
        />

        <Input
          name="subject"
          register={register}
          type="text"
          labelName="Subject"
          errorLabel={errors.subject?.message || ""}
          className="border p-3 outline-none w-full"
          placeholder="This is an optional"
        />

        <TextareaInput
          name="message"
          register={register}
          labelName="Message"
          errorLabel={errors.message?.message || ""}
          className="border p-3 outline-none"
          placeholder="Hi! i'd like to ask about"
        />

        <Button
          type="submit"
          disabled={isSubmitting ? true : false}
          textContent="Submit"
          className="bg-yellow-600 w-[200px]  inline-flex gap-2 items-center justify-center p-3 rounded-md text-white"
        >
          {isSubmitting && <Loader className="size-5" />}
        </Button>
      </form>
    </section>
  );
}
