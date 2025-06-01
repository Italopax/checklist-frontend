'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "./modal";
import Input from "./inputs/input";
import Button from "./button";
import ErrorMessage from "./errorMessage";
import { Item } from "@/models";
import { updateItem } from "@/actions/items";

interface UpdateItemModalProps {
  setShowModalState: Dispatch<SetStateAction<boolean>>;
  getItemsList (): Promise<void>;
  selectedItem: Item;
}

export default function UpdateItemModal ({ setShowModalState, getItemsList, selectedItem }: UpdateItemModalProps) {
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [errorUpdate, setErrorUpdate] = useState<string>('');
  const [newItemName, setNewItemName] = useState<string>(selectedItem?.name || '');

  async function updateItemSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      setLoadingUpdate(true);
      await updateItem(String(selectedItem?.id), { name: newItemName });
      setShowModalState(false);
    } catch (error) {
      setErrorUpdate(error.message);
      return;
    } finally {
      setLoadingUpdate(false);
      getItemsList();
    }
  }

  useEffect(() => {
    setErrorUpdate('');
  }, [newItemName]);

  return (
    <Modal
      showModal={setShowModalState}
      title='Edite o item selecionado'
    >
      <div className="flex flex-col gap-2">
        <form className="flex gap-4" onSubmit={updateItemSubmit}>
          <Input
            type='text'
            placeholder='Nome do item'
            value={newItemName}
            setValue={setNewItemName}
          />
          <Button
            text='Editar'
            type='submit'
            loading={loadingUpdate}
          />
        </form>
        {errorUpdate && <ErrorMessage error={errorUpdate} />}
      </div>
    </Modal>
  );
}