export interface Task {
  id: string
  title: string
  description: string
  createdAt: string
}

export interface User {
  email: string
  isLoggedIn: boolean
}
