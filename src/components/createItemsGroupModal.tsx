'use client';

import { createItemsGroups } from "@/actions/items-groups";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "./button";
import ErrorMessage from "./errorMessage";
import Input from "./input";
import Modal from "./modal";

interface CreateItemsGroupModalProps {
  setShowModalState: Dispatch<SetStateAction<boolean>>;
  getItemsGroupsList (): Promise<void>;
}

export default function CreateItemsGroupModal ({ setShowModalState, getItemsGroupsList }: CreateItemsGroupModalProps) {
  const [loadingCreate, setLoadinCreate] = useState<boolean>(false);
  const [newItemsGroupsName, setNewItemsGroupsName] = useState<string>('');
  const [createError, setCreateError] = useState<string>('');

  useEffect(() => {
    setCreateError('');
  }, [newItemsGroupsName]);

  async function createItemsGroup (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      setLoadinCreate(true);
      await createItemsGroups(newItemsGroupsName);
      setShowModalState(false);
    } catch (error) {
      setCreateError(error.message);
      return;
    } finally {
      setLoadinCreate(false);
      getItemsGroupsList();
    }
  }

  return (
    <Modal
      showModal={setShowModalState}
    >
      <div className="flex flex-col gap-2">
        <form className="flex gap-4" onSubmit={createItemsGroup}>
          <Input
            type='text'
            placeholder='Nome do grupo de itens'
            value={newItemsGroupsName}
            setValue={setNewItemsGroupsName}
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