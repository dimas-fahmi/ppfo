import { NextRequest, NextResponse } from "next/server";

export async function usersGet(_: NextRequest) {
  return NextResponse.json({ response: "Hi, There!" }, { status: 200 });
}
