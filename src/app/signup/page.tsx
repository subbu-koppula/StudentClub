// 'use client'
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import Link from "next/link";
// import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
// import { auth } from '@/app/firebase/config';
// import RegisterForm from '@/components/auth/RegisterForm';

// export default function SignupPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <RegisterForm />
//     </div>
//   );
// }


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
          <div className="text-5xl font-extrabold">1,234 Members</div>
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



// export default function SignupPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     rollNo: "",
//   });

//   const [CreateUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

//   const [errors, setErrors] = useState({
//     name: false,
//     email: false,
//     password: false,
//     confirmPassword: false,
//     rollNo: false,
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//     setErrors({ ...errors, [id]: false });
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {
//       name: formData.name.trim() === "",
//       email: !validateEmail(formData.email),
//       password: formData.password === "",
//       confirmPassword: formData.confirmPassword !== formData.password,
//       rollNo: formData.rollNo.trim() === "",
//     };

//     setErrors(newErrors);

//     if (Object.values(newErrors).some((error) => error)) {
//       return;
//     }

//     try {
//       const res = await CreateUserWithEmailAndPassword(formData.email, formData.password);
//       console.log(res);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
//       {/* Club Introduction Section */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-8 border-r border-white/10">
//         <div className="max-w-md text-center">
//           <h1 className="text-4xl font-bold mb-6">Join Our Student Club</h1>
//           <p className="text-xl mb-8">
//             Become a member of a dynamic and supportive community. Explore opportunities, build skills, and make lasting connections.
//           </p>
//           <div className="text-3xl font-bold mb-2">
//             Join the Family
//           </div>
//           <div className="text-5xl font-extrabold">
//             1,234 Members
//           </div>
//           <p className="mt-4 text-sm">
//             Don’t wait! Sign up today and unlock your potential with our club.
//           </p>
//         </div>
//       </div>

//       {/* Signup Form Section */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-8">
//         <Card className="w-full max-w-md bg-white/5 text-white border-white/10">
//           <CardHeader>
//             <CardTitle>Sign Up for Student Club</CardTitle>
//             <CardDescription className="text-gray-400">Create an account to get started</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                     Full Name
//                   </label>
//                   <Input
//                     id="name"
//                     type="text"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Nikhil Kumar"
//                     className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${errors.name ? "border-red-500" : ""}`}
//                   />
//                   {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
//                 </div>
//                 <div className="space-y-2">
//                   <label htmlFor="rollNo" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                     Roll Number
//                   </label>
//                   <Input
//                     id="rollNo"
//                     type="text"
//                     value={formData.rollNo}
//                     onChange={handleChange}
//                     placeholder="23q71a0580"
//                     className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${errors.rollNo ? "border-red-500" : ""}`}
//                   />
//                   {errors.rollNo && <p className="text-red-500 text-sm">Roll Number is required</p>}
//                 </div>
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
//                 <div className="space-y-2">
//                   <label htmlFor="confirmPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                     Confirm Password
//                   </label>
//                   <Input
//                     id="confirmPassword"
//                     type="password"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className={`bg-white/5 border-white/10 text-white ${errors.confirmPassword ? "border-red-500" : ""}`}
//                   />
//                   {errors.confirmPassword && <p className="text-red-500 text-sm">Passwords do not match</p>}
//                 </div>
//               </div>
//               <CardFooter className="flex flex-col space-y-4">
//                 <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
//                   Sign Up
//                 </Button>
//                 <div className="text-sm text-center text-gray-400">
//                   Already have an account?{" "}
//                   <Link href="/login" className="text-white hover:underline">
//                     Login
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
