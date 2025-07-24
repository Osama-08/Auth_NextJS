import { connectToDatabase } from "@/dbConfig/dbConfig";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";
connectToDatabase();
 export async function POST(req: NextRequest) {
    try {
        const { token} = await req.json();
        if (!token) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
          
        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        
          return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });

   
    } catch (error) {
        console.error('Error in POST /api/users/verifyemail:', error);
        return NextResponse.json({ error:'Internal Server Error' }, { status: 500 });
    }

 }


