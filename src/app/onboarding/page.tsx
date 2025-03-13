'use client';
import OnboardingForm from '@/components/auth/OnboardingForm';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Club Introduction Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 border-r border-white/10">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Student Club</h1>
          <p className="text-xl mb-8">
            Tell us a bit about your class details to get started on your journey with us.
          </p>
          <div className="text-3xl font-bold mb-2">Join the Community</div>
          <div className="text-5xl font-extrabold">1,234 Members</div>
          <p className="mt-4 text-sm">
            Your onboarding helps us personalize your experience. Let's get you set up!
          </p>
        </div>
      </div>

      {/* Onboarding Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <OnboardingForm />
      </div>
    </div>
  );
}
