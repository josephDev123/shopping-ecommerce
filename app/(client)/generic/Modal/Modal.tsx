import { ReactNode, useContext } from "react";
import { ModalContext } from "./Dialogs";
import { twMerge } from "tailwind-merge";

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
  const handleCloseOverlay = (e: React.MouseEvent<HTMLElement>) => {
    const SectionElem = e.currentTarget as HTMLElement;
    if (SectionElem.id === "overlay") {
      ctx?.onChangeOpen(false);
    }
  };
  return (
    <>
      {ctx?.open && (
        <section
          id="overlay"
          onClick={handleCloseOverlay}
          className={`${OverLayClass} fixed flex flex-col justify-center items-center w-full h-full z-30 bg-yellow-50/35 p-3 top-0 left-0`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${twMerge(
              ClassName,
              "sm:min-w-96 h-60  bg-white flex flex-col drop-shadow-md p-2 rounded-md justify-center  items-center"
            )} `}
          >
            {children}
          </div>
        </section>
      )}
    </>
  );
}
