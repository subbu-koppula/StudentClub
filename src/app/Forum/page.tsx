"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useAuth } from "@/context/AuthContext"
import { database } from "@/app/firebase/config"
import { ref, push, onValue } from "firebase/database"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, User, Clock } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "../../lib/date-utils"

interface ForumPost {
  id: string
  title: string
  description: string
  authorId: string
  authorName: string
  createdAt: number
}

export default function ForumPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const postsRef = ref(database, "forumPosts")
    const unsubscribe = onValue(postsRef, (snapshot) => {
      const data = snapshot.val()
      if (!data) {
        setPosts([])
        return
      }

      const postList = Object.entries(data).map(([id, post]: [string, any]) => ({
        id,
        ...post,
      }))

      // Sort by creation date (newest first)
      postList.sort((a, b) => b.createdAt - a.createdAt)

      setPosts(postList)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and description for your post",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Add post to database
      await push(ref(database, "forumPosts"), {
        title: title.trim(),
        description: description.trim(),
        authorId: user?.uid || "anonymous",
        authorName: user?.name || "Anonymous",
        createdAt: Date.now(),
      })

      // Reset form
      setTitle("")
      setDescription("")

      toast({
        title: "Post submitted",
        description: "Your post has been published to the forum",
      })
    } catch (error) {
      console.error("Error creating post:", error)
      toast({
        title: "Error",
        description: "Failed to submit post. Please try again.",
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
          <h1 className="text-4xl font-bold mb-4">Student Forum</h1>
          <p className="text-xl text-gray-400 mb-8">Share your thoughts and connect with other students</p>
        </div>

        {/* Create Post Form */}
        <Card className="mb-12 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Create a New Post
            </CardTitle>
            <CardDescription className="text-gray-400">
              Share your ideas, questions, or announcements with the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitPost} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="postTitle" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="postTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's on your mind?"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="postDescription" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="postDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Share more details about your post..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[100px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post to Forum"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Forum Posts */}
        <div className="space-y-6 text-white">
          <h2 className="text-2xl font-bold">Recent Posts</h2>

          {posts.length === 0 ? (
            <Card className="bg-white/5 border-white/10 p-8 text-center">
              <p className="text-gray-400">No posts yet. Be the first to share something!</p>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">{post.title}</CardTitle>
                  <div className="flex items-center text-sm text-gray-400 space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{post.authorName}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line text-white">{post.description}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

