import { getServerInstance } from "@/utils/instance";
import { NextResponse } from "next/server";

export async function POST (request: Request): Promise<NextResponse> {
  const { name, email, password } = await request.json();

  const instance = getServerInstance();

  try {
    const { status, data } = await instance.post('/user/create', {
      name,
      email,
      password,
    });

    const response = new NextResponse(data, { status });

    return response;
  } catch (error) {
    return NextResponse.json(
      { data: error?.response?.data },
      { status: error?.response?.status }
    );
  }
}
