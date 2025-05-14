'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "./modal";
import Input from "./input";
import Button from "./button";
import ErrorMessage from "./errorMessage";
import { updateItemsGroups } from "@/actions/items-groups";
import { ItemsGroup } from "@/models";

interface UpdateItemsGroupModalProps {
  setShowModalState: Dispatch<SetStateAction<boolean>>;
  getItemsGroupsList (): Promise<void>;
  selectedItemsGroup: ItemsGroup | undefined;
}

export default function UpdateItemsGroupModal ({ setShowModalState, getItemsGroupsList, selectedItemsGroup }: UpdateItemsGroupModalProps) {
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [errorUpdate, setErrorUpdate] = useState<string>('');
  const [newItemsGroupsName, setNewItemsGroupsName] = useState<string>(selectedItemsGroup?.name || '');

  async function updateItemsGroup (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      setLoadingUpdate(true);
      await updateItemsGroups(newItemsGroupsName, String(selectedItemsGroup?.id));
      setShowModalState(false);
    } catch (error) {
      setErrorUpdate(error.message);
      return;
    } finally {
      setLoadingUpdate(false);
      getItemsGroupsList();
    }
  }

  useEffect(() => {
    setErrorUpdate('');
  }, [newItemsGroupsName]);

  return (
    <Modal
      showModal={setShowModalState}
      title='Edite o grupo selecionado'
    >
      <div className="flex flex-col gap-2">
        <form className="flex gap-4" onSubmit={updateItemsGroup}>
          <Input
            type='text'
            placeholder='Nome do grupo de itens'
            value={newItemsGroupsName}
            setValue={setNewItemsGroupsName}
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