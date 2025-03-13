// // src/components/auth/LoginForm.tsx
// 'use client';

// import { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '@/app/firebase/config';
// import { useRouter } from 'next/navigation';

// export default function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
    
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       // The redirection will be handled by the ProtectedRoute component
//     } catch (err: any) {
//       setError(err.message || 'Failed to login');
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      
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
//           disabled={isLoading}
//         >
//           {isLoading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
      
//       <div className="mt-4 text-center">
//         <p>Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a></p>
//       </div>
//     </div>
//   );
// }

'use client'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      email: !validateEmail(formData.email),
      password: formData.password === "",
    };

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // Redirection will be handled by your ProtectedRoute or auth context.
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-white/5 text-white border-white/10">
      <CardHeader>
        <CardTitle>Login to Student Club</CardTitle>
        <CardDescription className="text-gray-400">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">
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
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none">
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
          </div>
          <CardFooter className="flex flex-col space-y-4 mt-4">
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <div className="text-sm text-center text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-white hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
