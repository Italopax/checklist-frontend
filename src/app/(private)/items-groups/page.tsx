'use client';

import { getItemsGroups } from "@/actions/items-groups";
import Button from "@/components/button";
import CreateItemsGroupModal from "@/components/createItemsGroupModal";
import Divisor from "@/components/divisor";
import Input from "@/components/input";
import ItemsGroupList from "@/components/itemsGroupList";
import Loading from "@/components/loading";
import UpdateItemsGroupModal from "@/components/updateItemsGroupModal";
import { ItemsGroup } from "@/models";
import { useEffect, useState } from "react";

export default function ItemsGroups () {
  const [itemsGroups, setItemsGroups] = useState<ItemsGroup[]>([]);
  const [itemsGroupsSearch, setItemsGroupsSearch] = useState<string>('');
  const [loadingSearch, setLoadingSearch] = useState<boolean>(true);
  const [searchError, setSearchError] = useState<string>('');

  const [showCreateGroupModal, setShowCreateGroupModal] = useState<boolean>(false);
  const [showUpdateGroupModal, setShowUpdateGroupModal] = useState<boolean>(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState<boolean>(false);

  const [selectedItemsGroup, setSelectedItemsGroup] = useState<ItemsGroup | undefined>();

  // modal de deleção

  async function getItemsGroupsList (): Promise<void> {
    try {
      setLoadingSearch(true);
      const itemsGroups = await getItemsGroups();
      setItemsGroups(itemsGroups);
    } catch (error) {
      setSearchError(error.message);
    } finally {
      setLoadingSearch(false);
    }
  }

  useEffect(() => {
    getItemsGroupsList();
  }, []);

  return (
    <section
      className="flex max-w-7xl m-auto px-16 gap-4 justify-between items-center"
    >
      <div className="flex flex-col flex-1 p-4 rounded gap-8">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Input
              type='text'
              placeholder='Filtrar grupo de itens'
              value={itemsGroupsSearch}
              setValue={setItemsGroupsSearch}
            />
            <Button
              text='Buscar'
              type='button'
              onClick={() => {}}
              secondaryColor
            />
          </div>
          <div className="flex gap-4">
            <Button
              text='Criar um novo grupo'
              type='button'
              secondaryColor
              onClick={() => setShowCreateGroupModal(true)}
            />
          </div>
        </div>
        <Divisor />
        <div>
          {loadingSearch ? (
            <Loading />
          ) : (
            <ItemsGroupList
              itemsGroups={itemsGroups}
              setItemsGroup={setSelectedItemsGroup}
              showItemsGroupUpdateModal={setShowUpdateGroupModal}
              showItemsGroupDeleteModal={setShowDeleteGroupModal}
            />
          )}
        </div>
      </div>
      {showCreateGroupModal && (
        <CreateItemsGroupModal
          setShowModalState={setShowCreateGroupModal}
          getItemsGroupsList={getItemsGroupsList}
        />
      )}
      {showUpdateGroupModal && (
        <UpdateItemsGroupModal
          selectedItemsGroup={selectedItemsGroup}
          setShowModalState={setShowUpdateGroupModal}
          getItemsGroupsList={getItemsGroupsList}
        />
      )}
    </section>
  );
}