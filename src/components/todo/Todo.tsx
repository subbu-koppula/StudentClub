"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useAuth } from "@/context/AuthContext"
import { database } from "@/app/firebase/config"
import { ref, push, onValue, remove, update } from "firebase/database"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Check, Plus } from "lucide-react"

interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const { user } = useAuth()

  useEffect(() => {
    if (!user?.uid) return

    const tasksRef = ref(database, `todos/${user.uid}`)
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val()
      if (!data) {
        setTasks([])
        return
      }

      const taskList = Object.entries(data).map(([id, task]: [string, any]) => ({
        id,
        ...task,
      }))

      // Sort by creation date (newest first) and then by completion status
      taskList.sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1 // Incomplete tasks first
        }
        return b.createdAt - a.createdAt // Then by date (newest first)
      })

      setTasks(taskList)
    })

    return () => {
      unsubscribe()
    }
  }, [user])

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim() || !user?.uid) return

    const tasksRef = ref(database, `todos/${user.uid}`)
    push(tasksRef, {
      title: newTask.trim(),
      completed: false,
      createdAt: Date.now(),
    })
    setNewTask("")
  }

  const handleToggleComplete = (taskId: string, completed: boolean) => {
    if (!user?.uid) return
    const taskRef = ref(database, `todos/${user.uid}/${taskId}`)
    update(taskRef, { completed: !completed })
  }

  const handleDeleteTask = (taskId: string) => {
    if (!user?.uid) return
    const taskRef = ref(database, `todos/${user.uid}/${taskId}`)
    remove(taskRef)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddTask} className="flex space-x-2">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
        />
        <Button type="submit" size="icon" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No tasks yet. Add one above!</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-2 rounded border border-white/10 ${
                task.completed ? "bg-white/10 text-gray-400" : "bg-white/5 text-white"
              }`}
            >
              <div className="flex items-center space-x-2 overflow-hidden">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 rounded-full"
                  onClick={() => handleToggleComplete(task.id, task.completed)}
                >
                  <Check className={`h-4 w-4 ${task.completed ? "text-green-500" : "text-gray-500"}`} />
                </Button>
                <span className={`text-sm truncate ${task.completed ? "line-through" : ""}`}>{task.title}</span>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 text-gray-500 hover:text-red-500"
                onClick={() => handleDeleteTask(task.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}