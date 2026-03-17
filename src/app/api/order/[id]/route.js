import { dbConnect, collection } from "@/mongodb/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    
    const { id } = await params; 
    
    
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ success: false, message: "Status is required" }, { status: 400 });
    }

   
    const orderCollection = dbConnect(collection.ORDERS); 

  
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid Order ID format" }, { status: 400 });
    }

   
    const result = await orderCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Order status updated to ${status}` 
    });

  } catch (error) {
    console.error("PATCH ERROR DETAILS:", error.message);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}