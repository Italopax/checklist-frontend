'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "./button";
import ErrorMessage from "./errorMessage";
import Input from "./inputs/input";
import Modal from "./modal";
import { createItem } from "@/actions/items";

interface CreateItemModalProps {
  setShowModalState: Dispatch<SetStateAction<boolean>>;
  getItemsList (): Promise<void>;
  itemGroupId: string;
}

export default function CreateItemModal ({ setShowModalState, getItemsList, itemGroupId }: CreateItemModalProps) {
  const [loadingCreate, setLoadinCreate] = useState<boolean>(false);
  const [newItemName, setNewItemName] = useState<string>('');
  const [createError, setCreateError] = useState<string>('');

  useEffect(() => {
    setCreateError('');
  }, [newItemName]);

  async function createItemSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      setLoadinCreate(true);
      await createItem(newItemName, itemGroupId);
      setShowModalState(false);
    } catch (error) {
      setCreateError(error.message);
      return;
    } finally {
      setLoadinCreate(false);
      getItemsList();
    }
  }

  return (
    <Modal
      showModal={setShowModalState}
      title='Crie um grupo de itens'
    >
      <div className="flex flex-col gap-2">
        <form className="flex gap-4" onSubmit={createItemSubmit}>
          <Input
            type='text'
            placeholder='Nome do item'
            value={newItemName}
            setValue={setNewItemName}
          />
          <Button
            text='Criar'
            type='submit'
            loading={loadingCreate}
          />
        </form>
        {createError && <ErrorMessage error={createError} />}
      </div>
    </Modal>
  );
}