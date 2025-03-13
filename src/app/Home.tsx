"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  CalendarDays,
  Users,
  BookOpen,
  ExternalLink,
  CheckSquare,
} from "lucide-react";
import { database } from "@/app/firebase/config";
import { ref, onValue } from "firebase/database";


 
import TodoList from "@/components/todo/Todo";

export default function HomePage() {
  const [userCount, setUserCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Reference to the users node in Firebase
    const usersRef = ref(database, 'users');
    
    // Set up a listener to get the count of users
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        // Count the number of user records
        const count = Object.keys(snapshot.val()).length;
        setUserCount(count);
      } else {
        // No users found
        setUserCount(0);
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching user count:", error);
      setIsLoading(false);
    });
    
    // Clean up listener on component unmount
    return () => unsubscribe();
  }, []);
  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Header user={user} handleSignOut={handleSignOut} /> */}

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to Our Coding Club
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Empowering future developers and innovators
          </p>
          <div className="inline-flex items-center bg-white/5 rounded-lg px-6 py-3 space-x-4">
            <Users className="w-6 h-6" />
            <div>
              <div className="text-sm font-medium text-gray-400">
                Current Members
              </div>
              {/* <div className="text-2xl font-bold">
                {isLoading ? (
                  <span className="text-gray-500">Loading...</span>
                ) : (
                  userCount
                )}
              </div> */}
              <div className="text-2xl font-bold ">122</div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {/* Todo List */}
          <Card className="bg-white/5 border-white/10 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <CheckSquare className="w-5 h-5 mr-2" />
                My Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TodoList />
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <ExternalLink className="w-5 h-5 mr-2 text-white" />
                Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://discord.gg/collegename"
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    College Discord Server
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/codingclub"
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Club GitHub Repository
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.collegename.edu/codingclub"
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Official Club Webpage
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/company/collegecoding"
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    LinkedIn Group
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Upcoming Events */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <CalendarDays className="w-5 h-5 mr-2 " />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <h3 className="font-semibold mb-1 text-white">
                    Hackathon 2025
                  </h3>
                  <p className="text-sm text-gray-400">
                    Join us for our annual hackathon on March 13th!
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold mb-1 text-white">
                    JNTU GV Tech Fest
                  </h3>
                  <p className="text-sm text-gray-400">
                    Another exciting event at JNTU, on March 23, 24
                  </p>
                </li>
              </ul>
              <Button variant="outline" className="mt-4 w-full">
                View All Events
              </Button>
            </CardContent>
          </Card>

          {/* Latest News */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <ExternalLink className="w-5 h-5 mr-2 text-white" />
                Latest News
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <h3 className="font-semibold mb-1 text-white">
                    New Python Course
                  </h3>
                  <p className="text-sm text-gray-400">
                    We've just launched a new Python for beginners course.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold mb-1 text-white">
                    Club Achievement
                  </h3>
                  <p className="text-sm text-gray-400">
                    Our team won first place in the Regional Coding Competition!
                  </p>
                </li>
              </ul>
              <Button variant="outline" className="mt-4 w-full">
                Read More News
              </Button>
            </CardContent>
          </Card>

          {/* Club Resources */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BookOpen className="w-5 h-5 mr-2 text-white" />
                Club Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <h3 className="font-semibold mb-1 text-white">
                    Meeting Notes
                  </h3>
                  <p className="text-sm text-gray-400">
                    Access notes from our previous meetings.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold mb-1 text-white">
                    Project Repository
                  </h3>
                  <p className="text-sm text-gray-400">
                    View and contribute to our shared projects.
                  </p>
                </li>
              </ul>
              <Button variant="outline" className="mt-4 w-full">
                View Resources
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Learning Resources */}
        <Card className="mt-12 bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Learning Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="font-semibold text-lg mb-4">Web Development</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      HTML & CSS Basics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      JavaScript Fundamentals
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      React Tutorial
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Data Science</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Python for Data Analysis
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Machine Learning Basics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Data Visualization Techniques
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">
                  Mobile Development
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      iOS App Development
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Android Studio Guide
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Flutter & Dart Tutorial
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-400">
          <p>&copy; 2023 Coding Club. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
