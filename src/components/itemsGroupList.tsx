import { ItemsGroup } from "@/models";
import Button from "./button";
import { Dispatch, SetStateAction } from "react";

export interface ItemsGroupProps {
  itemsGroups: ItemsGroup[];
  setItemsGroup: Dispatch<SetStateAction<ItemsGroup | undefined>>
  showItemsGroupUpdateModal: Dispatch<SetStateAction<boolean>>
  showItemsGroupDeleteModal: Dispatch<SetStateAction<boolean>>
}

export default function ItemsGroupList ({ itemsGroups, setItemsGroup, showItemsGroupUpdateModal, showItemsGroupDeleteModal }: ItemsGroupProps) {
  const updateButtonAction = (itemsGroup: ItemsGroup) => {
    setItemsGroup(itemsGroup);
    showItemsGroupUpdateModal(true);
  }

  const deleteButtonAction = (itemsGroup: ItemsGroup) => {
    setItemsGroup(itemsGroup);
    showItemsGroupDeleteModal(true);
  }

  if (!itemsGroups.length) return (
    <div className="flex flex-1 justify-center">
      <p>Não há grupos cadastrados</p>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-4">
      {itemsGroups.map((itemsGroup) => {
        return (
          <div
            key={itemsGroup.id}
            className="bg-(--border) py-4 px-8 flex items-center justify-between rounded"
          >
            <h3>
              {itemsGroup.name}
            </h3>
            <div className="flex items-center justify-center gap-2">
              <Button
                text='Atualizar'
                type='button'
                onClick={() => updateButtonAction(itemsGroup)}
              />
              <Button
                text='Deletar'
                type='button'
                onClick={() => deleteButtonAction(itemsGroup)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}