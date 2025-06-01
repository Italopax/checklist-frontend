interface InputCheckboxProps {
  checked: boolean;
  onClickAction: (event: React.MouseEvent<HTMLInputElement, MouseEvent>, id: number) => void;
  id: number;
}

export default function InputCheckbox ({ id, checked = false, onClickAction }: InputCheckboxProps) {
  const onClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    onClickAction(event, id);
  }

  return (
    <input
      className=""
      type="checkbox"
      checked={checked}
      onClick={onClick}
    />
  );
}