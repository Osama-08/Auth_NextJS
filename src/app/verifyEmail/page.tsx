"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function VerifyEmail() {
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyEmail = async () => {
        try {
            await axios.post('/api/verifyemail', { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.error('Error verifying email:', error.message);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || '');
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail();
        }
    }, [token]);

    return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
             <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
            
            <h2 className="p-2 bg-orange-500 text-black">{token ?`${token}`:"No token found"}</h2>

            {verified ? (
                <div className="text-green-500">
                    <p>Your email has been successfully verified!</p>
                    <Link href="/login" className="text-blue-500 underline">Go to Login</Link>
                </div>
            ):""}
            {error && (
                <div className="text-red-500">
                    <p>There was an error verifying your email. Please try again.</p>
                    <Link href="/resend-verification" className="text-blue-500 underline">Resend Verification Email</Link>
                </div>
            )}
            
            {!verified && !error && (
                <p className="text-gray-500">Verifying your email...</p>
            )}
         </div>
    );
}
