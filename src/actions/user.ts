import { User } from "@/models";
import { getServerInstance } from "@/utils/instance";

export async function createUserSubmit ({ name, email, password }: { name: string, email: string, password: string }): Promise<void> {
  try {
    const instance = getServerInstance();
    await instance.post('/api/user/create-account', { name, email, password });
  } catch (error) {
    throw new Error(error.response?.data?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}

export async function getMeData (): Promise<User> {
  try {
    const instance = getServerInstance();
    const { data: { data } } = await instance.get('/user/me');
    return data;
  } catch (error) {
    console.log('error:', error);
    throw new Error(error.response?.data?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}
