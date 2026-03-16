import { dbConnect } from "@/mongodb/dbConnect";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const body = await req.json();
    const ordersCollection = await dbConnect("orders");

    const result = await ordersCollection.insertOne({
      ...body,
      status: "pending", 
      createdAt: new Date(),
    });

    return NextResponse.json({ 
      success: true, 
      message: "Order placed successfully!",
      id: result.insertedId 
    });
  } catch (error) {
    console.error("Order POST Error:", error);
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const ordersCollection = await dbConnect("orders");

    let query = {};
    if (email) {
      
      query = { customerEmail: email };
    }

 
    const result = await ordersCollection.find(query).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ 
      success: true, 
      data: result 
    });
  } catch (error) {
    console.error("Order GET Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" }, 
      { status: 500 }
    );
  }
}