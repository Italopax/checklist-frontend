import { getServerInstance } from "@/utils/instance";
import { NextResponse } from "next/server";

export async function POST (request: Request): Promise<NextResponse> {
  const { login, password } = await request.json();

  const instance = getServerInstance();

  try {
    const { status, headers } = await instance.post('/auth/login', {
      login,
      password,
    });

    const response = new NextResponse(null, { status });

    const cookies = headers?.get('set-cookie');
    if (cookies) {
      response.headers.set('set-cookie', cookies);
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      { data: error?.response?.data },
      { status: error?.response?.status }
    );
  }
}
