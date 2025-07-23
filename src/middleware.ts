import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest){
    const path=req.nextUrl.pathname;
    const isPublic=path==="/login" || path==="/signup";
    const token=req.cookies.get("token")?.value || "";
    if(isPublic && token){
        return NextResponse.redirect(new URL("/",req.url));
    }
    if(!isPublic && !token){
        return NextResponse.redirect(new URL("/login",req.url));
    }
}

//seeing matching paths
export const config={
    matcher:["/","/profile","/login","/signup"],
}

