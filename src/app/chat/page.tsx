"use client";

import { useState, useEffect, useRef } from "react";
import { database } from "@/app/firebase/config"; // Your existing Realtime DB
import { ref, onValue } from "firebase/database";
import { useAuth } from "@/context/AuthContext"; // Your existing Auth context
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, User, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "../../lib/date-utils";

// Firestore imports
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { firestoreDb } from "../firebase/config"; // You'll need to create this

// Initialize Firestore
// const firestoreDb = initializeFirestore()

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const { user } = useAuth(); // Using your existing auth context
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get messages from Firestore
  useEffect(() => {
    const q = query(
      collection(firestoreDb, "global_chat"),
      orderBy("timestamp", "asc"),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData: Message[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messagesData.push({
          id: doc.id,
          username: data.username,
          content: data.content,
          timestamp: data.timestamp?.toDate() || new Date(),
        });
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  // Handle sending a new message

  // Inside your component
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Not logged in",
        description: "You must be logged in to send messages",
        variant: "destructive",
      });
      return;
    }

    if (newMessage.trim() === "") {
      toast({
        title: "Empty message",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(firestoreDb, "global_chat"), {
        username: user.name || "Anonymous",
        content: newMessage.trim(),
        timestamp: serverTimestamp(),
      });

      setNewMessage("");
      inputRef.current?.focus(); // Focus the input field after sending
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Student Chat</h1>
          <p className="text-xl text-gray-400 mb-8">
            Chat in real-time with other students
          </p>
        </div>

        <Card className="mb-12 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Global Chat
            </CardTitle>
            <CardDescription className="text-gray-400">
              {user
                ? `You are chatting as ${user.name}`
                : "Log in to participate in the chat"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Messages Container */}
            <div className="bg-white/5 border border-white/10 rounded-md p-4 mb-4 h-96 overflow-y-auto flex flex-col gap-4">
              {messages.length === 0 ? (
                <p className="text-gray-400 text-center my-auto">
                  No messages yet. Start the conversation!
                </p>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg ${
                      message.username === user?.name
                        ? "bg-blue-900/30 ml-auto"
                        : "bg-white/10"
                    } max-w-3/4`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{message.username}</span>
                      <span className="text-xs text-gray-400">
                        {formatDistanceToNow(message.timestamp.getTime(), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="text-white">{message.content}</p>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2">

              <Input
                ref={inputRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={user ? "Type your message..." : "Log in to chat"}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                disabled={!user || isSubmitting}
              />

              <Button
                type="submit"
                className="bg-white text-black hover:bg-gray-200"
                disabled={!user || isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
