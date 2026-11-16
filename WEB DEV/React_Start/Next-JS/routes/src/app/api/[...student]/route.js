import { NextResponse } from "next/server";

export async function GET(request, content) {
  const studentDetailes = (await content.params).student;

  return NextResponse.json(
    { result: studentDetailes },
    { status: 200 }
  );
}



