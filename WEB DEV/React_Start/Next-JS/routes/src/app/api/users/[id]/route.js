import { user } from "@/util/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;

  const userdata = user.filter(
    (item) => item.id == id
  );

  if (userdata.length === 0) {
    return NextResponse.json(
      { message: "User Not Found" },
      { status: 404 }
    );
  }

  return NextResponse.json(userdata, {
    status: 200,
  });
}