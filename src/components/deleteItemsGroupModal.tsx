import { deleteItemsGroups } from "@/actions/items-groups";
import { ItemsGroup } from "@/models";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "./button";
import ErrorMessage from "./errorMessage";
import Modal from "./modal";

interface DeleteItemsGroupModalProps {
  setShowModalState: Dispatch<SetStateAction<boolean>>;
  getItemsGroupsList (): Promise<void>;
  selectedItemsGroup: ItemsGroup | undefined;
}

export default function DeleteItemsGroupModal ({ setShowModalState, getItemsGroupsList, selectedItemsGroup }: DeleteItemsGroupModalProps) {
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [errorDelete, setErrorDelete] = useState<string>('');

  async function deleteItemsGroup (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      setLoadingDelete(true);
      setErrorDelete('');
      await deleteItemsGroups(String(selectedItemsGroup?.id));
      setShowModalState(false);
    } catch (error) {
      setErrorDelete(error.message);
      return;
    } finally {
      setLoadingDelete(false);
      getItemsGroupsList();
    }
  }

  return (
    <Modal
      showModal={setShowModalState}
      title='Tem certeza que deseja deletar este grupo?'
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 justify-between">
          <form onSubmit={deleteItemsGroup}>
            <Button
              text='Deletar'
              type='submit'
              loading={loadingDelete}
              />
          </form>
          <Button
            text='Cancelar'
            type='button'
            onClick={() => setShowModalState(false)}
          />
        </div>
        {errorDelete && <ErrorMessage error={errorDelete} />}
      </div>
    </Modal>
  );
}