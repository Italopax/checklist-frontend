import { ItemsGroup } from "@/models";
import { getServerInstance } from "@/utils/instance";

export async function getItemsGroups (): Promise<ItemsGroup[]> {
  try {
    const instance = getServerInstance();
    const { data: { data } } = await instance.get('/items-group/all');
    return data;
  } catch (error) {
    console.log('error:', error);
    throw new Error(error.response?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}

export async function createItemsGroups (name: string): Promise<ItemsGroup> {
  try {
    const instance = getServerInstance();
    const { data: { data } } = await instance.post('/items-group/create', {
      name,
    });
    return data;
  } catch (error) {
    console.log('error:', error);
    throw new Error(error.response?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}