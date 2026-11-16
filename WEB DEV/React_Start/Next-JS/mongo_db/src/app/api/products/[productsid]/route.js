import { NextResponse } from "next/server";
import { Product } from "@/app/lib/model/product";
import { connectDB } from "@/app/lib/db";

export async function GET(request, content) {
  const { productsid } = await content.params;

  await connectDB();

  const result = await Product.findById(productsid);

  return NextResponse.json({
    result,
    success: true
  });
}

export async function PUT(request, content) {
  const { productsid } = await content.params;

  const payload = await request.json();

  await connectDB();

  const result = await Product.findByIdAndUpdate(
    productsid,
    payload,
    { new: true, runValidators: true }
  );

  return NextResponse.json({
    result,
    success: true
  });
}

export async function DELETE(request, content) {
  const { productsid } = await content.params;

  await connectDB();

  const result = await Product.findByIdAndDelete(productsid);

  return NextResponse.json({
    result,
    success: true
  });
}