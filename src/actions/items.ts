import { Item, ItemsGroup } from "@/models";
import { getServerInstance } from "@/utils/instance";

export async function getItemsByGroupId (itemsGroupId: string): Promise<Item[]> {
  try {
    const instance = getServerInstance();
    const { data: { data } } = await instance.get(`/item/${itemsGroupId}`);
    return data;
  } catch (error) {
    console.log('error:', error);
    throw new Error(error.response?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}

export async function createItem (name: string, itemsGroupId: string): Promise<ItemsGroup> {
  try {
    const instance = getServerInstance();
    const { data: { data } } = await instance.post('/item/create', {
      name,
      itemsGroupId,
    });
    return data;
  } catch (error) {
    console.log('error:', error);
    throw new Error(error.response?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}

export async function updateItem (newName: string, itemId: string): Promise<ItemsGroup> {
  try {
    const instance = getServerInstance();
    const { data: { data } } = await instance.put(`/item/${itemId}`, {
      name: newName,
    });
    return data;
  } catch (error) {
    console.log('error:', error);
    throw new Error(error.response?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}

export async function deleteItem (itemId: string): Promise<ItemsGroup> {
  try {
    const instance = getServerInstance();
    const { data: { data } } = await instance.delete(`/item/${itemId}`);
    return data;
  } catch (error) {
    console.log('error:', error);
    throw new Error(error.response?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}