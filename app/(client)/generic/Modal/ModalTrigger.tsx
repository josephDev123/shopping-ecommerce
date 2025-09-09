import React, { ReactNode, useContext } from "react";
import { ModalContext } from "./Dialogs";

interface ModalTriggerProps {
  children: ReactNode;
}
export default function ModalTrigger({ children }: ModalTriggerProps) {
  const ctx = useContext(ModalContext);
  return (
    <button onClick={() => ctx?.onChangeOpen(ctx.open ? false : true)}>
      {children}
    </button>
  );
}
