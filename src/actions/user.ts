import { User } from "@/models";
import { getServerInstance } from "@/utils/instance";

export async function createUserSubmit ({ name, email, password }: { name: string, email: string, password: string }): Promise<void> {
  try {
    const instance = getServerInstance();
    await instance.post('/user/create', { name, email, password });
  } catch (error) {
    console.log('error:', error);
    throw new Error(error.response?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}

export async function getMeData (): Promise<User> {
  try {
    const instance = getServerInstance();
    const { data: { data } } = await instance.get('/user/me');
    return data;
  } catch (error) {
    console.log('error:', error);
    throw new Error(error.response?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}

export async function validateEmail (verificationCode: string): Promise<void> {
  try {
    const instance = getServerInstance();
    await instance.post('/user/verify-email', {
      verificationCode,
    });
  } catch (error) {
    console.log('error:', error);
    throw new Error(error.response?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}

export async function resendVerificationCode (): Promise<void> {
  try {
    const instance = getServerInstance();
    await instance.post('/user/resend-verification-code');
  } catch (error) {
    console.log('error:', error);
    throw new Error(error.response?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}

export async function updateAccountInfos ({ name, email }: { name: string, email: string }): Promise<void> {
  try {
    const instance = getServerInstance();
    await instance.put('/user/update', {
      email,
      name,
    });
  } catch (error) {
    console.log('error:', error);
    throw new Error(error.response?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}

export async function updateAccountPassword ({ actualPassword, newPassword }: { actualPassword: string, newPassword: string }): Promise<void> {
  try {
    const instance = getServerInstance();
    await instance.patch('/user/update-password', {
      actualPassword,
      newPassword,
    });
  } catch (error) {
    console.log('error:', error);
    throw new Error(error.response?.data?.errorMessage || 'Ocorreu um erro inesperado.');
  }
}
