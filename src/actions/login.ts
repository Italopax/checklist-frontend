import { getClientInstance } from "@/utils/instance";

export async function loginSubmit ({ login, password }: { login: string, password: string }): Promise<void> {
  try {
    const instance = getClientInstance();
    await instance.post('/api/auth/login', { login, password });
  } catch (error) {
    throw new Error(error.response?.data?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}