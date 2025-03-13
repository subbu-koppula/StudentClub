"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useAuth } from "@/context/AuthContext"
import { database } from "@/app/firebase/config"
import { ref, set, push, onValue } from "firebase/database"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Code, Film, Palette, BookOpen, Plus } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Club data
const clubs = [
  {
    id: "coding",
    name: "Coding Club",
    description:
      "Join our community of programmers and developers. Learn new languages, work on exciting projects, and participate in hackathons and coding competitions.",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    members: 122,
  },
  {
    id: "popular-culture",
    name: "Popular Culture Club",
    description:
      "Explore the latest trends in music, movies, TV shows, and internet culture. Discuss your favorite fandoms and discover new interests with like-minded peers.",
    icon: BookOpen,
    color: "from-purple-500 to-pink-500",
    members: 87,
  },
  {
    id: "filmography",
    name: "Filmography Club",
    description:
      "For aspiring filmmakers and cinema enthusiasts. Learn about cinematography, editing, and storytelling. Create short films and documentaries with professional equipment.",
    icon: Film,
    color: "from-red-500 to-orange-500",
    members: 64,
  },
  {
    id: "arts",
    name: "Arts Club",
    description:
      "Express your creativity through various art forms including painting, drawing, sculpture, and digital art. Showcase your work in our annual exhibition.",
    icon: Palette,
    color: "from-green-500 to-emerald-500",
    members: 93,
  },
]

export default function ClubsPage() {
  const { user } = useAuth()
  const [newClubName, setNewClubName] = useState("")
  const [newClubDescription, setNewClubDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [joinedClubs, setJoinedClubs] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load user's joined clubs when they log in
  useEffect(() => {
    let unsubscribe: () => void;
    
    if (user?.uid) {
      setIsLoading(true)
      const userClubsRef = ref(database, `users/${user.uid}/clubs`)
      
      const listener = onValue(userClubsRef, (snapshot) => {
        if (snapshot.exists()) {
          const clubsData = snapshot.val()
          const userClubs = Object.keys(clubsData).filter(clubId => clubsData[clubId] === true)
          setJoinedClubs(userClubs)
        } else {
          setJoinedClubs([])
        }
        setIsLoading(false)
      }, (error) => {
        console.error("Error fetching joined clubs:", error)
        setIsLoading(false)
      })
      
      unsubscribe = () => listener()
    } else {
      setJoinedClubs([])
      setIsLoading(false)
    }
    
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [user])

  const handleClubAction = async (clubId: string) => {
    if (!user?.uid) {
      toast({
        title: "Authentication required",
        description: "Please log in to join or leave clubs",
        variant: "destructive",
      })
      return
    }

    try {
      if (joinedClubs.includes(clubId)) {
        // Leave club logic
        await set(ref(database, `users/${user.uid}/clubs/${clubId}`), null) // Remove from Firebase
        
        // Update local state
        setJoinedClubs(joinedClubs.filter(id => id !== clubId))
        
        toast({
          title: "Left club",
          description: `You've left the ${clubs.find((club) => club.id === clubId)?.name}`,
        })
      } else {
        // Join club logic
        await set(ref(database, `users/${user.uid}/clubs/${clubId}`), true)
        
        // Update local state
        setJoinedClubs([...joinedClubs, clubId])
        
        toast({
          title: "Success!",
          description: `You've joined the ${clubs.find((club) => club.id === clubId)?.name}`,
        })
      }
    } catch (error) {
      console.error("Error updating club membership:", error)
      toast({
        title: "Error",
        description: "Failed to update club membership. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRequestNewClub = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user?.uid) {
      toast({
        title: "Authentication required",
        description: "Please log in to request a new club",
        variant: "destructive",
      })
      return
    }

    if (!newClubName.trim() || !newClubDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a name and description for the new club",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Add club request to database
      await push(ref(database, "clubRequests"), {
        name: newClubName.trim(),
        description: newClubDescription.trim(),
        requestedBy: user.uid,
        requestedAt: Date.now(),
      })

      // Reset form
      setNewClubName("")
      setNewClubDescription("")

      toast({
        title: "Request submitted",
        description: "Your club request has been submitted for review",
      })
    } catch (error) {
      console.error("Error requesting new club:", error)
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Student Clubs</h1>
          <p className="text-xl text-gray-400 mb-8">Discover and join clubs that match your interests</p>
        </div>

        {/* Club Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {clubs.map((club) => (
            <Card key={club.id} className="bg-white/10 border-white/10 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${club.color}`} />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-white">
                    <club.icon className="w-5 h-5 mr-2" />
                    {club.name}
                  </CardTitle>
                  <div className="text-sm text-gray-400">{club.members} members</div>
                </div>
                <CardDescription className="text-gray-400">{club.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  className={`w-full ${
                    joinedClubs.includes(club.id) 
                      ? "bg-slate-500 hover:bg-slate-600 text-white" 
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                  onClick={() => handleClubAction(club.id)}
                  disabled={isLoading}
                >
                  {isLoading 
                    ? "Loading..." 
                    : joinedClubs.includes(club.id) 
                      ? "Leave Club" 
                      : "Join Club"
                  }
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Request New Club Form */}
        <Card className="mt-16 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Request a New Club
            </CardTitle>
            <CardDescription className="text-gray-400">
              Don't see a club that matches your interests? Submit a request to create a new one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRequestNewClub} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="clubName" className="text-sm font-medium">
                  Club Name
                </label>
                <Input
                  id="clubName"
                  value={newClubName}
                  onChange={(e) => setNewClubName(e.target.value)}
                  placeholder="e.g., Photography Club"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="clubDescription" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="clubDescription"
                  value={newClubDescription}
                  onChange={(e) => setNewClubDescription(e.target.value)}
                  placeholder="Describe the purpose and activities of the club..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[100px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" disabled={isSubmitting || !user}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}