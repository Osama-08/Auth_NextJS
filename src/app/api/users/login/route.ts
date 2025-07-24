import User from "@/models/userModel.js";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken"

connectToDatabase();
export async function POST(req: NextRequest) {
    try {
      const { email, password } = await req.json();
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
      }
  
      // Create token
      const tokenData = {
        id: user._id,
        username: user.username, // typo fix: usernamae ➝ username
        email: user.email
      };
  
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: "1d"
      });
  
      // Set cookie
      const response = NextResponse.json({
        message: "Login successful",
        success: true
      });
  
      response.cookies.set("token", token, {
        httpOnly: true,
        path: "/"
      });
  
      return response;
  
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }
  