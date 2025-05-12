'use client';

import { Dispatch, ReactNode, SetStateAction } from "react";

interface ModalProps {
  children: ReactNode;
  showModal: Dispatch<SetStateAction<boolean>>;
}

export default function Modal ({ showModal, children }: ModalProps) {
  const closeModal = (event: React.MouseEvent<HTMLInputElement>) => {
    if (['modalBackgroud', 'closeModalButton'].includes(event.target?.id)) showModal(false);
  };
  
  return (
    <div id="modalBackgroud" className="bg-black/30 absolute h-screen w-screen right-0 left-0 top-0 bottom-0 flex items-center justify-center backdrop-blur-[2px]" onClick={closeModal}>
      <div className="bg-(--border) flex flex-col p-6 rounded gap-4">
        <div
          id="closeModalButton"
          className="flex ml-auto items-end cursor-pointer hover:font-bold"
          onClick={closeModal}
        >
          X
        </div>
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
}