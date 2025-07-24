import { NextResponse } from "next/server";

export async function GET(req:Request){
    const {searchParams} = new URL(req.url);
    const token = searchParams.get("token");
    console.log("Token from search params:", token);
    try {
        const response=NextResponse.json({
            message:"Logout Successfully",
            success:true,
        })
        // response.cookies.delete("token");
         response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});
        return response;
   
    } catch (error) {
        console.error("Error in GET /api/users/logout:", error);
        return NextResponse.json({error:"Error in logout"},{status:500});
    }
}

