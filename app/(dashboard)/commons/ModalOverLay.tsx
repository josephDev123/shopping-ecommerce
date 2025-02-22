import { ReactNode } from "react";

interface ModalOverlayProps {
  children: ReactNode;
  isCollapse: boolean;
  closeOverLay?: () => void;
}
export default function ModalOverlay({
  children,
  isCollapse,
  closeOverLay,
}: ModalOverlayProps) {
  const handleCloseModalOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && e.currentTarget.id === "overlayModal") {
      closeOverLay && closeOverLay();
    }
  };
  return (
    <section
      onClick={handleCloseModalOverlay}
      id="overlayModal"
      className={`${
        isCollapse ? "flex" : "hidden"
      } fixed inset-0  flex-col h-full w-full justify-center items-center bg-black/40 transition-all duration-100`}
    >
      <div className="flex flex-col w-[80%]  bg-white rounded-md shadow-md overflow-y-auto overflow-x-auto">
        {children}
      </div>
    </section>
  );
}
