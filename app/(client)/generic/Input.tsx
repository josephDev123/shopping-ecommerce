"use client";

import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  labelName: string;
  errorLabel?: string;
  icon?: ReactNode;
  wrapperClassName?: string;
  register?: UseFormRegister<any>;
  name: string;
}

interface ISelectType extends React.InputHTMLAttributes<HTMLSelectElement> {
  labelName: string;
  errorLabel?: string;
  placeholder?: string;
  data: any[];
  register?: UseFormRegister<any>;
  name: string;
}

interface ITextareaInput
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  labelName: string;
  errorLabel?: string;
  register?: UseFormRegister<any>;
  name: string;
}

export default function Input({
  labelName,
  errorLabel,
  icon,
  wrapperClassName,
  register,
  name,
  ...props
}: InputType) {
  return (
    <section className="flex flex-col w-full">
      <label htmlFor={labelName} className="mb-2 font-medium">
        {labelName}
      </label>
      <div className={`flex items-center ${wrapperClassName}`}>
        <input {...props} {...(register && { ...register(name) })} />
        {icon}
      </div>

      <span className="text-xs text-red-500">{errorLabel?.toString()}</span>
    </section>
  );
}

export const SelectInput = ({
  data,
  labelName,
  errorLabel,
  placeholder,
  name,
  register,
  ...props
}: ISelectType) => {
  return (
    <section className="flex flex-col w-full">
      <label htmlFor={labelName} className="mb-2 font-medium">
        {labelName}
      </label>
      <select {...props} id="" {...(register && { ...register(name) })}>
        <option selected value={""}>
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
  register,
  name,
  ...props
}: ITextareaInput) => {
  return (
    <section className="flex flex-col w-full">
      <label htmlFor={labelName} className="mb-2 font-medium">
        {labelName}
      </label>
      <textarea {...props} {...(register && { ...register(name) })}></textarea>
      <span className="text-xs text-red-400">{errorLabel}</span>
    </section>
  );
};
