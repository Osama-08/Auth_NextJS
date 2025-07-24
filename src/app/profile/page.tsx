"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // ✅ Import this
import { log } from "console";
import React from "react";
import { useEffect ,useState} from "react";

export default function ProfilePage() {
  const router = useRouter(); // ✅ Initialize router

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout Successfully");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error in logout");
      // Optionally, you can redirect to login page on error
      router.push("/login");
    }
  };
  const [data, setUserData] = React.useState("nothing");
  const fetchUserData = async () => {
  const res=axios.get("/api/users/me")
  // console.log("User Data:", ( (await res).data);
  setUserData((await res).data._id);
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-3 rounded bg-green-500" >{data ==='nothing'?"Nothing":<Link href={`/profile/${data}`} className="text-blue-500 underline">
        {data}
      </Link>}</h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 text-white p-2 rounded-md"
      >
        Logout
      </button>
      <button onClick={fetchUserData} className="bg-blue-500 mt-4 text-white p-2 rounded-md">Get User Detail</button>
    </div>
  );
}
