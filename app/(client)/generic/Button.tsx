interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textContent: string;
}

export default function Button({ textContent, ...props }: IButton) {
  return <button {...props}>{textContent}</button>;
}
