import { dbConnect, collection } from "@/mongodb/dbConnect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    
    const { name, email, password, photo } = await request.json(); 
    
   
    const usersCollection = await dbConnect(collection.USERS);

   
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists!" }, { status: 400 });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    
    await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      photo: photo || "",
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Registration successful!" }, { status: 201 });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}