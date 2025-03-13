'use client'
import LoginForm from '@/components/auth/LoginForm';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Club Introduction Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 border-r border-white/10">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Our Student Club</h1>
          <p className="text-xl mb-8">
            Join our vibrant community of learners, innovators, and future leaders. We're dedicated to fostering growth, collaboration, and excellence.
          </p>
          <div className="text-3xl font-bold mb-2">Current Members</div>
          <div className="text-5xl font-extrabold">123</div>
          <p className="mt-4 text-sm">
            Be part of something extraordinary. Login or sign up to participate in our exciting events and activities!
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