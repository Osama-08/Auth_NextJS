import User from "@/models/userModel.js";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import { error } from "console";
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
    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        return NextResponse.json({error:"User Password is Valid"},{status:200});
    }

    //create a session or token here if needed
    const tokenData = {
        id:user._id,
        usernamae:user.username,
        email:user.email
    }
    //create token
    const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1h"});
    
    const responseData = NextResponse.json({
        message: "Login successful",
        success: true,})
    responseData.cookies.set({name:"token",value:token,
        httpOnly:true,path:"/"})


        return responseData;
    // If the password is invalid, return an error response
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });


 } catch (error:any) {
    return  NextResponse.json({error:error.message},{status:500}) 
 }


}