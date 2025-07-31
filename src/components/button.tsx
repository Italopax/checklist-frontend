import { FormEventHandler, MouseEventHandler } from "react";
import Loading from "./loading";

interface ButtonProps {
  text: string;
  type: "button" | "reset" | "submit" | undefined;
  loading?: boolean;
  onSubmit?: FormEventHandler<HTMLButtonElement> | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  secondaryColor?: boolean;
  alertColor?: boolean;
}

export default function Button ({
  text,
  type,
  loading = false,
  onClick,
  secondaryColor,
  alertColor,
}: ButtonProps) {
  let backgroundColor = 'bg-(--background)';

  switch (true) {
    case secondaryColor:
      backgroundColor = 'bg-(--border)';
      break;
    case alertColor:
      backgroundColor = 'bg-(--destructive)';
      break;
    default:
      backgroundColor = 'bg-(--background)';
      break;
  }

  const hoverButtonClasses = !loading ? `hover:opacity-80` : '';
  const buttonContent = loading ? <Loading /> : text;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${backgroundColor} ${hoverButtonClasses} px-4 py-2 rounded-lg cursor-pointer`}
    >
      {buttonContent}
    </button>
  );
}