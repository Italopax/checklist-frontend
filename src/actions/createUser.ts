import { getClientInstance } from "@/utils/instance";

export async function createUserSubmit ({ name, email, password }: { name: string, email: string, password: string }): Promise<void> {
  try {
    const instance = getClientInstance();
    await instance.post('/api/user/create-account', { name, email, password });
  } catch (error) {
    throw new Error(error.response?.data?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}