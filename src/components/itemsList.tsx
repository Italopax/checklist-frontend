import { Item, } from "@/models";
import Button from "./button";
import { Dispatch, SetStateAction } from "react";
import InputCheckbox from "./inputs/inputCheckbox";
import { updateItem } from "@/actions/items";

export interface ItemsProps {
  items: Item[];
  setItem: Dispatch<SetStateAction<Item | undefined>>
  showItemUpdateModal: Dispatch<SetStateAction<boolean>>
  showItemDeleteModal: Dispatch<SetStateAction<boolean>>
  getItemsList (): Promise<void>;
}

export default function ItemsList ({ items, setItem, showItemUpdateModal, showItemDeleteModal, getItemsList }: ItemsProps) {
  const updateButtonAction = (item: Item) => {
    setItem(item);
    showItemUpdateModal(true);
  }

  const deleteButtonAction = (item: Item) => {
    setItem(item);
    showItemDeleteModal(true);
  }

  const checkItem = async (event: React.MouseEvent<HTMLInputElement, MouseEvent>, id: number) => {
    try {
      const isCheckedValue = event.target.checked;
      await updateItem(String(id), { isChecked: isCheckedValue });
    } catch {
      return;
    } finally {
      getItemsList();
    }
  }

  if (!items.length) return (
    <div className="flex flex-1 justify-center">
      <p>Não há itens cadastrados</p>
    </div>
  );

  const styleFromItemCheckStatus = (isChecked: boolean) => isChecked ? 'opacity-80' : 'hover:opacity-80';

  return (
    <div className="w-full flex flex-col gap-4">
      {items.map((item) => {
        return (
          <div
            key={item.id}
            className={`bg-(--border) py-4 px-8 flex items-center justify-between rounded cursor-pointer ${styleFromItemCheckStatus(item.isChecked)}`}
          >
            <div className="flex gap-4 items-center">
              <InputCheckbox
                id={Number(item.id)}
                checked={item.isChecked}
                onClickAction={checkItem}
              />
              <h3 className={`${item.isChecked && 'line-through'}`}>
                {item.name}
              </h3>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button
                text='Atualizar'
                type='button'
                onClick={() => updateButtonAction(item)}
              />
              <Button
                text='Deletar'
                type='button'
                onClick={() => deleteButtonAction(item)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}