import type { Task, User } from "../types"

const TASKS_KEY = "tasks"
const USER_KEY = "user"

export const getTasks = (): Task[] => {
  try {
    const tasks = localStorage.getItem(TASKS_KEY)
    return tasks ? JSON.parse(tasks) : []
  } catch (error) {
    console.error("Error getting tasks from localStorage:", error)
    return []
  }
}

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error)
  }
}

export const getUser = (): User | null => {
  try {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error("Error getting user from localStorage:", error)
    return null
  }
}

export const saveUser = (user: User): void => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch (error) {
    console.error("Error saving user to localStorage:", error)
  }
}

export const clearUser = (): void => {
  try {
    localStorage.removeItem(USER_KEY)
  } catch (error) {
    console.error("Error clearing user from localStorage:", error)
  }
}
