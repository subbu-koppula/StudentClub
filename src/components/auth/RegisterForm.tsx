// 'use client';

// import { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { ref, set } from 'firebase/database';
// import { auth, database } from '@/app/firebase/config';
// import { useRouter } from 'next/navigation';

// export default function RegisterForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
    
//     try {
//       // Create user in Firebase Auth
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
      
//       // Create initial user data in Realtime DB
//       await set(ref(database, `users/${user.uid}`), {
//         email: user.email,
//         onboardingCompleted: false,
//         createdAt: Date.now()
//       });
      
//       // Redirect to onboarding
//       router.push('/onboarding');
//     } catch (err: any) {
//       setError(err.message || 'Failed to create account');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      
//       {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
        
//         <button 
//           type="submit" 
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
//         >
//           Sign Up
//         </button>
//       </form>
      
//       <div className="mt-4 text-center">
//         <p>Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
//       </div>
//     </div>
//   );
// }

'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    name: false,
    rollNo: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: false });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const newErrors = {
      name: formData.name.trim() === "",
      rollNo: formData.rollNo.trim() === "",
      email: !validateEmail(formData.email),
      password: formData.password === "",
      confirmPassword: formData.confirmPassword !== formData.password,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      // Create initial user data in Realtime DB
      await set(ref(database, `users/${user.uid}`), {
        name: formData.name,
        rollNo: formData.rollNo,
        email: user.email,
        onboardingCompleted: false,
        createdAt: Date.now()
      });
      
      // Redirect to onboarding
      router.push('/onboarding');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    }
  };

  return (
    <Card className="w-full max-w-md bg-white/5 text-white border-white/10">
      <CardHeader>
        <CardTitle>Sign Up for Student Club</CardTitle>
        <CardDescription className="text-gray-400">
          Create an account to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nikhil Kumar"
                className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
            </div>
            {/* Roll Number Field */}
            <div className="space-y-2">
              <label htmlFor="rollNo" className="text-sm font-medium">
                Roll Number
              </label>
              <Input
                id="rollNo"
                type="text"
                value={formData.rollNo}
                onChange={handleChange}
                placeholder="23q71a0580"
                className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${errors.rollNo ? "border-red-500" : ""}`}
              />
              {errors.rollNo && <p className="text-red-500 text-sm">Roll Number is required</p>}
            </div>
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="m@example.com"
                className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-sm">Please enter a valid email</p>}
            </div>
            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`bg-white/5 border-white/10 text-white ${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
            </div>
            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`bg-white/5 border-white/10 text-white ${errors.confirmPassword ? "border-red-500" : ""}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">Passwords do not match</p>}
            </div>
          </div>
          <CardFooter className="flex flex-col space-y-4 mt-4">
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
              Sign Up
            </Button>
            <div className="text-sm text-center text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-white hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
