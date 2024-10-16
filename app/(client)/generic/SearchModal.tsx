import React from "react";

interface SearchModalProps {
  closeModal: () => void;
  isOpen: boolean;
}
export default function SearchModal({ closeModal, isOpen }: SearchModalProps) {
  return (
    <>
      {!isOpen && ""}

      {isOpen && (
        <section className="fixed inset-0 h-full w-full flex flex-col items-center justify-center bg-black/50">
          <div className="bg-white flex flex-col  rounded-md w-[400px] drop-shadow-md">
            <div className="flex justify-between items-center ">
              <input
                type="search"
                className="p-2 w-full outline-none rounded-l-md"
                name=""
                id=""
                placeholder="Search documentation"
              />
              <button
                onClick={closeModal}
                type="button"
                className="p-1 rounded-md bg-gray-200"
              >
                ESC
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
