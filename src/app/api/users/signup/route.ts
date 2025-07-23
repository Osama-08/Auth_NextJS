import {connectToDatabase} from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";


connectToDatabase();

export async function POST(req: NextRequest) {
    try{
        const { username, email, password } = await req.json();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    }
    catch(error: any) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


