"use client";

import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  labelName: string;
  errorLabel?: string;
  icon?: ReactNode;
  wrapperClassName?: string;
}

interface ISelectType extends React.InputHTMLAttributes<HTMLSelectElement> {
  labelName: string;
  errorLabel?: string;
  placeholder?: string;
  data: any[];
}

interface ITextareaInput
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  labelName: string;
  errorLabel?: string;
}

export default function Input({
  labelName,
  errorLabel,
  icon,
  wrapperClassName,
  ...props
}: InputType) {
  return (
    <section className="flex flex-col w-full">
      <label htmlFor={labelName} className="mb-2 font-medium">
        {labelName}
      </label>
      {/* <div className={`flex items-center ${wrapperClassName}`}> */}
      <input {...props} />
      {icon}
      {/* </div> */}

      <span className="text-xs text-red-500">{errorLabel?.toString()}</span>
    </section>
  );
}

export const SelectInput = ({
  data,
  labelName,
  errorLabel,
  placeholder,
  ...props
}: ISelectType) => {
  return (
    <section className="flex flex-col w-full">
      <label htmlFor={labelName} className="mb-2 font-medium">
        {labelName}
      </label>
      <select {...props} name="" id="">
        <option disabled selected value={""}>
          {placeholder}
        </option>
        {data.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
      <span className="text-xs text-red-400">{errorLabel}</span>
    </section>
  );
};

export const TextareaInput = ({
  labelName,
  errorLabel,
  ...props
}: ITextareaInput) => {
  return (
    <section className="flex flex-col w-full">
      <label htmlFor={labelName} className="mb-2 font-medium">
        {labelName}
      </label>
      <textarea {...props}></textarea>
      <span className="text-xs text-red-400">{errorLabel}</span>
    </section>
  );
};
