import { getDataFromToken } from "@/helpers/getDataFromToken";
// getDataFromToken is a utility function that extracts user data from a JWT token. It is used to retrieve the current user's information based on the token provided in the request headers.
import { NextResponse ,NextRequest} from "next/server";
import User from "@/models/userModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

await connectToDatabase();

export async function GET(req: NextRequest) {
   
    
    try {
     const userId =await getDataFromToken(req);
      const user=await User.findOne({ _id: userId }).select("-password -__v -createdAt -updatedAt");
       return NextResponse.json(user, { status: 200 });

    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


