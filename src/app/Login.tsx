'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export default function LoginPage({ handleLogin }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Club Introduction Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 border-r border-white/10">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Our Student Club</h1>
          <p className="text-xl mb-8">
            Join our community of enthusiastic learners and creators. We host a variety of events and activities to help you grow and connect with others.
          </p>
          <div className="text-3xl font-bold mb-2">
            Current Members
          </div>
          <div className="text-5xl font-extrabold">
            1,234
          </div>
          <p className="mt-4 text-sm">
            Be part of something extraordinary. Login or sign up to participate in our exciting events and activities!
          </p>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-white/5 text-white border-white/10">
          <CardHeader>
            <CardTitle>Login to Student Club</CardTitle>
            <CardDescription className="text-gray-400">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                  <Input required id="email" type="email" placeholder="m@example.com" className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                  <Input id="password" type="password" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" onClick={handleLogin}>Login</Button>
            <div className="text-sm text-center text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-white hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

