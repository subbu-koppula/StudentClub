"use client";
import React from "react";
import { useState, useEffect } from "react";
import LoginForm from "@/components/auth/LoginForm";
import { database } from "@/app/firebase/config";
import { ref, onValue } from "firebase/database";

export default function LoginPage() {
  const [userCount, setUserCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const usersRef = ref(database, "users");

    const unsubscribe = onValue(
      usersRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const count = Object.keys(snapshot.val()).length;
          setUserCount(count);
        } else {
          setUserCount(0);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching user count:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Club Introduction Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 border-r border-white/10">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to Our Student Club
          </h1>
          <p className="text-xl mb-8">
            Join our vibrant community of learners, innovators, and future
            leaders. We're dedicated to fostering growth, collaboration, and
            excellence.
          </p>
          <div className="text-3xl font-bold mb-2">Current Members</div>
          <div className="text-5xl font-extrabold">123</div>
          {/* <div className="text-5xl font-extrabold">
            {isLoading ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              userCount
            )}
          </div> */}
          <p className="mt-4 text-sm">
            Be part of something extraordinary. Login or sign up to participate
            in our exciting events and activities!
          </p>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <LoginForm />
      </div>
    </div>
  );
}
