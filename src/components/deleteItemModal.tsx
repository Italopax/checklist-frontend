import { Dispatch, SetStateAction, useState } from "react";
import Button from "./button";
import ErrorMessage from "./errorMessage";
import Modal from "./modal";
import { deleteItem } from "@/actions/items";

interface DeleteItemModalProps {
  setShowModalState: Dispatch<SetStateAction<boolean>>;
  getItemsList (): Promise<void>;
  selectedItemId: string;
}

export default function DeleteItemModal ({ setShowModalState, getItemsList, selectedItemId }: DeleteItemModalProps) {
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [errorDelete, setErrorDelete] = useState<string>('');

  async function deleteItemSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      setLoadingDelete(true);
      setErrorDelete('');
      await deleteItem(String(selectedItemId));
      setShowModalState(false);
    } catch (error) {
      setErrorDelete(error.message);
      return;
    } finally {
      setLoadingDelete(false);
      getItemsList();
    }
  }

  return (
    <Modal
      showModal={setShowModalState}
      title='Tem certeza que deseja deletar este item?'
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 justify-between">
          <form onSubmit={deleteItemSubmit}>
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