"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import ModalTrigger from "./ModalTrigger";
import Modal from "./Modal";

export const ModalContext = createContext<{
  open: boolean;
  onChangeOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export default function Dialog({ children }: { children: ReactNode }) {
  // shared state for compound component pattern
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ open, onChangeOpen: setOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

Dialog.ModalTrigger = ModalTrigger;
Dialog.Modal = Modal;
