import { Dispatch, SetStateAction } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function Input ({
  type,
  placeholder,
  value,
  setValue,
}: InputProps) {
  return (
    <input
      className="bg-(--cardBackground) focus:bg-(--cardBackground)/90 focus:border text-(--foreground) px-4 py-2 rounded-lg outline-0"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}