// // src/components/auth/OnboardingForm.tsx
// 'use client';

// import { useState } from 'react';
// import { ref, update } from 'firebase/database';
// import { database } from '@/app/firebase/config';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';

// export default function OnboardingForm() {
//   const [year, setYear] = useState('2nd');
//   const [section, setSection] = useState('A');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();
//   const { user } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!user?.uid) return;
    
//     try {
//       setIsSubmitting(true);
      
//       // Update user data with year and section
//       await update(ref(database, `users/${user.uid}`), {
//         year,
//         section,
//         onboardingCompleted: true
//       });
      
//       // Force reload to update auth context with new data
//       window.location.href = '/';
//     } catch (err) {
//       console.error("Error saving onboarding data:", err);
//       setIsSubmitting(false);
//     }
//   };

//   if (!user) return <div className="text-center p-8">Please log in first</div>;

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Almost there!</h2>
//       <p className="mb-6 text-center">Please tell us about your class details</p>
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2" htmlFor="year">Year</label>
//           <select
//             id="year"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="2nd">2nd Year</option>
//           </select>
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2" htmlFor="section">Section</label>
//           <select
//             id="section"
//             value={section}
//             onChange={(e) => setSection(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="A">Section A</option>
//             <option value="B">Section B</option>
//             <option value="C">Section C</option>
//           </select>
//         </div>
        
//         <button 
//           type="submit" 
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? 'Processing...' : 'Complete Setup'}
//         </button>
//       </form>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { database } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export default function OnboardingForm() {
  const [year, setYear] = useState('2nd');
  const [section, setSection] = useState('A');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;
    
    try {
      setIsSubmitting(true);
      await update(ref(database, `users/${user.uid}`), {
        year,
        section,
        onboardingCompleted: true
      });
      // Force reload to update auth context
      window.location.href = '/';
    } catch (err) {
      console.error("Error saving onboarding data:", err);
      setIsSubmitting(false);
    }
  };

  if (!user) return <div className="text-center p-8">Please log in first</div>;

  return (
    <Card className="w-full max-w-md bg-white/5 text-white border-white/10">
      <CardHeader>
        <CardTitle>Complete Your Onboarding</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="year" className="text-sm font-medium">
                Year
              </label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2nd">2nd Year</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="section" className="text-sm font-medium">
                Section
              </label>
              <select
                id="section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
          </div>
          <CardFooter className="flex flex-col space-y-4 mt-4">
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Complete Setup'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
