import { Item, } from "@/models";
import Button from "./button";
import { Dispatch, SetStateAction } from "react";

export interface ItemsProps {
  items: Item[];
  setItem: Dispatch<SetStateAction<Item | undefined>>
  showItemUpdateModal: Dispatch<SetStateAction<boolean>>
  showItemDeleteModal: Dispatch<SetStateAction<boolean>>
}

export default function ItemsList ({ items, setItem, showItemUpdateModal, showItemDeleteModal }: ItemsProps) {
  const updateButtonAction = (item: Item) => {
    setItem(item);
    showItemUpdateModal(true);
  }

  const deleteButtonAction = (item: Item) => {
    setItem(item);
    showItemDeleteModal(true);
  }

  if (!items.length) return (
    <div className="flex flex-1 justify-center">
      <p>Não há itens cadastrados</p>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-4">
      {items.map((item) => {
        return (
          <div
            key={item.id}
            className="bg-(--border) hover:opacity-80 py-4 px-8 flex items-center justify-between rounded cursor-pointer"
          >
            <h3>
              {item.name}
            </h3>
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