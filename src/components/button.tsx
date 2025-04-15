import { FormEventHandler } from "react";

interface ButtonProps {
  text: string;
  type: "button" | "reset" | "submit" | undefined;
  onSubmit?: FormEventHandler<HTMLButtonElement> | undefined;
}

export default function Button ({
  text,
  type,
}: ButtonProps) {
  return (
    <button
      type={type}
      className="bg-(--background) hover:bg-(--background)/80 px-4 py-2 rounded-lg cursor-pointer"
    >
      {text}
    </button>
  );
}