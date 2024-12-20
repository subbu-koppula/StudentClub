import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { CalendarDays, Users, BookOpen, ExternalLink } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Coding Club</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
              <li><Link href="/events" className="hover:text-gray-300 transition-colors">Events</Link></li>
              <li><Link href="/resources" className="hover:text-gray-300 transition-colors">Resources</Link></li>
              <li><Link href="/login" className="hover:text-gray-300 transition-colors">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Coding Club</h2>
          <p className="text-xl text-gray-400 mb-8">Empowering future developers and innovators</p>
          <div className="inline-flex items-center bg-white/5 rounded-lg px-6 py-3 space-x-4">
            <Users className="w-6 h-6" />
            <div>
              <div className="text-sm font-medium text-gray-400">Current Members</div>
              <div className="text-2xl font-bold">1,234</div>
            </div>
          </div>
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
                  <h3 className="font-semibold mb-1 text-white">Hackathon 2023</h3>
                  <p className="text-sm text-gray-400">Join us for our annual hackathon on July 15-16!</p>
                </li>
                <li>
                  <h3 className="font-semibold mb-1 text-white">AI Ethics Talk</h3>
                  <p className="text-sm text-gray-400">Dr. Jane Smith discusses AI ethics on August 3rd.</p>
                </li>
              </ul>
              <Button variant="outline" className="mt-4 w-full">View All Events</Button>
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
                  <h3 className="font-semibold mb-1 text-white">New Python Course</h3>
                  <p className="text-sm text-gray-400">We've just launched a new Python for beginners course.</p>
                </li>
                <li>
                  <h3 className="font-semibold mb-1 text-white">Club Achievement</h3>
                  <p className="text-sm text-gray-400">Our team won first place in the Regional Coding Competition!</p>
                </li>
              </ul>
              <Button variant="outline" className="mt-4 w-full">Read More News</Button>
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
                  <Link href="https://discord.gg/collegename" className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    College Discord Server
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/codingclub" className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Club GitHub Repository
                  </Link>
                </li>
                <li>
                  <Link href="https://www.collegename.edu/codingclub" className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Official Club Webpage
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/company/collegecoding" className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    LinkedIn Group
                  </Link>
                </li>
              </ul>
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
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">HTML & CSS Basics</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">JavaScript Fundamentals</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">React Tutorial</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Data Science</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Python for Data Analysis</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Machine Learning Basics</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Data Visualization Techniques</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Mobile Development</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">iOS App Development</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Android Studio Guide</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Flutter & Dart Tutorial</Link></li>
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
  )
}

