import { NextResponse } from "next/server";
import { Product } from "@/app/lib/model/product";
import { connectDB } from "@/app/lib/db";

export async function GET() {
  try {
    await connectDB();

    const data = await Product.find();

    return NextResponse.json({
      result: data,
      success: true
    });

  } catch (error) {
    console.error("MongoDB Error:", error.message);

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const product = new Product({
      name: body.name,
      company: body.company,
      price: body.price,
      category: body.category
    });

    const data = await product.save();

    return NextResponse.json(
      {
        result: data,
        success: true
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("POST Error:", error.message);

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}