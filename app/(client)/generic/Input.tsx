interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {
  labelName: string;
  errorLabel?: string;
}

interface ISelectType extends React.InputHTMLAttributes<HTMLSelectElement> {
  labelName: string;
  errorLabel?: string;
  data: any[];
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
      <select name="" id="">
        <option value=""></option>
      </select>
      <span className="text-xs">{errorLabel}</span>
    </section>
  );
};
