'use client';

import { getItemsGroups } from "@/actions/items-groups";
import CreateItemsGroupModal from "@/components/createItemsGroupModal";
import DeleteItemsGroupModal from "@/components/deleteItemsGroupModal";
import ItemsGroupList from "@/components/itemsGroupList";
import ListItemsPageTemplate from "@/components/listItemsPageTemplate";
import Loading from "@/components/loading";
import UpdateItemsGroupModal from "@/components/updateItemsGroupModal";
import { ItemsGroup } from "@/models";
import { useEffect, useState } from "react";

export default function ItemsGroups () {
  const [itemsGroups, setItemsGroups] = useState<ItemsGroup[]>([]);
  const [itemsGroupsSearch, setItemsGroupsSearch] = useState<string>('');
  const [loadingSearch, setLoadingSearch] = useState<boolean>(true);
  const [, setSearchError] = useState<string>('');

  const [showCreateGroupModal, setShowCreateGroupModal] = useState<boolean>(false);
  const [showUpdateGroupModal, setShowUpdateGroupModal] = useState<boolean>(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState<boolean>(false);

  const [selectedItemsGroup, setSelectedItemsGroup] = useState<ItemsGroup | undefined>();
  
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
    <ListItemsPageTemplate
      inputSearch={{
        placeholder: "Filtrar itens",
        value: itemsGroupsSearch,
        setValue: setItemsGroupsSearch
      }} 
      searchButton={{
        text: "Buscar",
        onClick: () => {}
      }}
      createButton={{
        text: "Criar um novo grupo",
        onClick: () => setShowCreateGroupModal(true)
      }}
    >
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
      {showDeleteGroupModal && (
        <DeleteItemsGroupModal
          selectedItemsGroup={selectedItemsGroup}
          setShowModalState={setShowDeleteGroupModal}
          getItemsGroupsList={getItemsGroupsList}
        />
      )}
    </ListItemsPageTemplate>
  );
}