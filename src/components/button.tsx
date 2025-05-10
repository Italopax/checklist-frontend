import { FormEventHandler, MouseEventHandler } from "react";
import Loading from "./loading";

interface ButtonProps {
  text: string;
  type: "button" | "reset" | "submit" | undefined;
  loading?: boolean;
  onSubmit?: FormEventHandler<HTMLButtonElement> | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function Button ({
  text,
  type,
  loading = false,
  onClick,
}: ButtonProps) {
  const hoverButtonClasses = !loading ? 'hover:bg-(--background)/80' : '';
  const buttonContent = loading ? <Loading /> : text;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-(--background) ${hoverButtonClasses} px-4 py-2 rounded-lg cursor-pointer`}
    >
      {buttonContent}
    </button>
  );
}