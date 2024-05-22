interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {
  labelName: string;
  errorLabel?: string;
}

interface ISelectType extends React.InputHTMLAttributes<HTMLSelectElement> {
  labelName: string;
  errorLabel?: string;
  data: any[];
}

interface ITextareaInput
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  labelName: string;
  errorLabel?: string;
}

export default function Input({ labelName, errorLabel, ...props }: InputType) {
  return (
    <section className="flex flex-col w-full">
      <label htmlFor={labelName} className="mb-2 font-medium">
        {labelName}
      </label>
      <input {...props} />
      <span className="text-xs">{errorLabel}</span>
    </section>
  );
}

export const SelectInput = ({
  labelName,
  errorLabel,
  ...props
}: ISelectType) => {
  return (
    <section className="flex flex-col w-full">
      <label htmlFor={labelName} className="mb-2 font-medium">
        {labelName}
      </label>
      <select {...props} name="" id="">
        <option value=""></option>
      </select>
      <span className="text-xs">{errorLabel}</span>
    </section>
  );
};

export const Textarea = ({
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
      <span className="text-xs">{errorLabel}</span>
    </section>
  );
};
