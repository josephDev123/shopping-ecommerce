"use client";

import { ReactNode } from "react";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textContent?: string;
  children?: ReactNode;
}

export default function Button({ textContent, children, ...props }: IButton) {
  return (
    <button {...props}>
      {textContent} {children}
    </button>
  );
}
