import { ReactNode, useContext } from "react";
import { ModalContext } from "./Dialogs";

interface ModalProps {
  children: ReactNode;
  OverLayClass: string;
  ClassName?: string;
}
export default function Modal({
  children,
  OverLayClass,
  ClassName,
}: ModalProps) {
  const ctx = useContext(ModalContext);
  return (
    <>
      {ctx?.open && (
        <section
          className={`${OverLayClass} fixed flex flex-col justify-center items-center w-full h-full z-30 bg-yellow-50/35 p-3 top-0 left-0`}
        >
          <div
            className={`${ClassName} min-w-96 h-60 bg-white flex flex-col drop-shadow-md p-2 rounded-md`}
          >
            {children}
          </div>
        </section>
      )}
    </>
  );
}
