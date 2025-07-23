"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage() {
    const router = useRouter();
    const [user,setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignup=async() => {
        
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            if (response.status === 201) {
                toast.success("User created successfully");
                router.push("/login");
            }

            
        } catch (error: any) {
            // Handle error (e.g., show a notification)
            toast.error(error.response?.data?.error || "An error occurred during signup");
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
         if (user.username.length > 0 && user.email.length >0  && user.password.length>0) {
            setButtonDisabled(false);
        
        } else {
            setButtonDisabled(true);}
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading?"Processing":"SignUp"}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} placeholder="Username" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"/>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="password" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"/>
            
            <button onClick={onSignup}
             className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled?"No SignUp":"SignUp"}</button>
            <Link href="/login">Back to Login</Link>
        </div>
    )
}