'use client';

import { getItemsByGroupId } from "@/actions/items";
import CreateItemModal from "@/components/createItemModal";
import DeleteItemModal from "@/components/deleteItemModal";
import ItemsList from "@/components/itemsList";
import ListItemsPageTemplate from "@/components/listItemsPageTemplate";
import Loading from "@/components/loading";
import UpdateItemModal from "@/components/updateItemModal";
import { Item } from "@/models";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ItemsGroupDetailsProps {
  params?: Promise<{ slug: string }>;
}

export default function ItemsGroupDetails ({}: ItemsGroupDetailsProps) {
  const { slug }: { slug: string} = useParams();

  const [items, setItems] = useState<Item[]>([]);
  const [itemsSearch, setItemsSearch] = useState<string>('');
  const [loadingSearch, setLoadingSearch] = useState<boolean>(true);
  const [searchError, setSearchError] = useState<string>('');

  const [showCreateItemModal, setShowCreateItemModal] = useState<boolean>(false);
  const [showUpdateItemModal, setShowUpdateItemModal] = useState<boolean>(false);
  const [showDeleteItemModal, setShowDeleteItemModal] = useState<boolean>(false);
  
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  
  async function getItemsList (): Promise<void> {
    try {
      setLoadingSearch(true);
      const itemsGroups = await getItemsByGroupId(slug);
      setItems(itemsGroups);
    } catch (error) {
      setSearchError(error.message);
    } finally {
      setLoadingSearch(false);
    }
  }

  useEffect(() => {
    getItemsList();
  }, []);

  return (
    <ListItemsPageTemplate 
      inputSearch={{
        placeholder: "Filtrar itens",
        value: itemsSearch,
        setValue: setItemsSearch,
      }} 
      searchButton={{
        text: "Buscar",
        onClick: () => {},
      }}
      createButton={{
        text: "Criar um novo item",
        onClick: () => setShowCreateItemModal(true),
      }}
    >
      <div>
        {loadingSearch ? (
          <Loading />
        ) : (
          <ItemsList
            items={items}
            setItem={setSelectedItem}
            showItemUpdateModal={setShowUpdateItemModal}
            showItemDeleteModal={setShowDeleteItemModal}
          />
        )}
      </div>
      {showCreateItemModal && (
        <CreateItemModal
          setShowModalState={setShowCreateItemModal}
          getItemsList={getItemsList}
          itemGroupId={slug}
        />
      )}
      {showUpdateItemModal && (
        <UpdateItemModal
          setShowModalState={setShowUpdateItemModal}
          getItemsList={getItemsList}
          selectedItem={selectedItem}
        />
      )}
      {showDeleteItemModal && (
        <DeleteItemModal
          setShowModalState={setShowDeleteItemModal}
          getItemsList={getItemsList}
          selectedItemId={String(selectedItem?.id)}
        />
      )}
    </ListItemsPageTemplate>
  );
}