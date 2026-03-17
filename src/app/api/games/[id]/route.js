import { dbConnect, collection } from "@/mongodb/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function DELETE(request, { params }) {
  try {

    const { id } = await params;

    
    const gameCollection = dbConnect(collection.PRODUCTS);

  
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid Game ID" },
        { status: 400 }
      );
    }

  
    const result = await gameCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({
        success: true,
        message: "Game deleted successfully from database",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Game not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("DELETE ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}