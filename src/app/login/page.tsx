// 'use client'
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import Link from "next/link";
// import LoginForm from "@/components/auth/LoginForm";

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <LoginForm />
//     </div>
//   );
// }



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





// export default function LoginPage() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({ email: false, password: false });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//     setErrors({ ...errors, [id]: false });
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = {
//       email: !validateEmail(formData.email),
//       password: formData.password === "",
//     };

//     setErrors(newErrors);

//     if (Object.values(newErrors).some((error) => error)) {
//       return;
//     }

//     // Submit the form (placeholder for actual submission logic)
//     console.log("Form submitted", formData);
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
//       {/* Club Introduction Section */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-8 border-r border-white/10">
//         <div className="max-w-md text-center">
//           <h1 className="text-4xl font-bold mb-6">Welcome to Our Student Club</h1>
//           <p className="text-xl mb-8">
//             Join our vibrant community of learners, innovators, and future leaders. We're dedicated to fostering growth, collaboration, and excellence.
//           </p>
//           <div className="text-3xl font-bold mb-2">Current Members</div>
//           <div className="text-5xl font-extrabold">123</div>
//           <p className="mt-4 text-sm">
//             Be part of something extraordinary. Login or sign up to participate in our exciting events and activities!
//           </p>
//         </div>
//       </div>

//       {/* Login Form Section */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-8">
//         <Card className="w-full max-w-md bg-white/5 text-white border-white/10">
//           <CardHeader>
//             <CardTitle>Login to Student Club</CardTitle>
//             <CardDescription className="text-gray-400">Enter your credentials to access your account</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                     Email
//                   </label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="m@example.com"
//                     className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${errors.email ? "border-red-500" : ""}`}
//                   />
//                   {errors.email && <p className="text-red-500 text-sm">Please enter a valid email</p>}
//                 </div>
//                 <div className="space-y-2">
//                   <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                     Password
//                   </label>
//                   <Input
//                     id="password"
//                     type="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className={`bg-white/5 border-white/10 text-white ${errors.password ? "border-red-500" : ""}`}
//                   />
//                   {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
//                 </div>
//               </div>
//               <CardFooter className="flex flex-col space-y-4">
//                 <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
//                   Login
//                 </Button>
//                 <div className="text-sm text-center text-gray-400">
//                   Don't have an account?{" "}
//                   <Link href="/signup" className="text-white hover:underline">
//                     Sign up
//                   </Link>
//                 </div>
//               </CardFooter>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
