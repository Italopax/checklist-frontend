import { FormEventHandler } from "react";
import Loading from "./loading";

interface ButtonProps {
  text: string;
  type: "button" | "reset" | "submit" | undefined;
  loading?: boolean;
  onSubmit?: FormEventHandler<HTMLButtonElement> | undefined;
}

export default function Button ({
  text,
  type,
  loading = false,
}: ButtonProps) {
  const hoverButtonClasses = !loading ? 'hover:bg-(--background)/80' : '';
  const buttonContent = loading ? <Loading /> : text;

  return (
    <button
      type={type}
      className={`bg-(--background) ${hoverButtonClasses} px-4 py-2 rounded-lg cursor-pointer`}
    >
      {buttonContent}
    </button>
  );
}