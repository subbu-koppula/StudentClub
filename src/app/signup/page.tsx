
'use client'
import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Club Introduction Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 border-r border-white/10">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-6">Join Our Student Club</h1>
          <p className="text-xl mb-8">
            Become a member of a dynamic and supportive community. Explore opportunities, build skills, and make lasting connections.
          </p>
          <div className="text-3xl font-bold mb-2">Join the Family</div>
          {/* <div className="text-5xl font-extrabold">1,234 Members</div> */}
          <p className="mt-4 text-sm">
            Don’t wait! Sign up today and unlock your potential with our club.
          </p>
        </div>
      </div>

      {/* Signup Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <RegisterForm />
      </div>
    </div>
  );
}



