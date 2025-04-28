import { getServerInstance } from "@/utils/instance";

export async function loginSubmit ({ login, password }: { login: string, password: string }): Promise<void> {
  try {
    const instance = getServerInstance();
    await instance.post<void>('/auth/login', { login, password });
  } catch (error) {
    throw new Error(error.response?.data?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}

export async function refershToken (): Promise<void> {
  try {
    const instance = getServerInstance();
    await instance.post<void>('/auth/refreshToken');
  } catch (error) {
    throw new Error(error.response?.data?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}