import { dbConnect } from "@/mongodb/dbConnect";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const body = await req.json();
    const gamesCollection = await dbConnect("games");

    const result = await gamesCollection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ 
      success: true, 
      message: "Game added successfully!", 
      id: result.insertedId 
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add game" }, 
      { status: 500 }
    );
  }
}


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email"); 
    
    const gamesCollection = await dbConnect("games");

    let query = {};
    if (email) {
     
      query = { sellerEmail: email };
    }

    const result = await gamesCollection.find(query).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch games" }, 
      { status: 500 }
    );
  }
}