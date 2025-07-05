"use client"

import type React from "react"
import { useState, useEffect } from "react"
import styled from "styled-components"
import type { Task, User } from "./types"
import { getTasks, saveTasks, getUser, saveUser, clearUser } from "./utils/localStorage"
import { LoginModal } from "./components/LoginModal"
import { AddTask } from "./components/AddTask"
import { TaskList } from "./components/TaskList"

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`

const Header = styled.header`
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
`

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.h1`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const WelcomeText = styled.span`
  color: #666;
  font-size: 0.875rem;
`

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  ${(props) =>
    props.variant === "primary"
      ? `
    background-color: #007bff;
    color: white;
    
    &:hover {
      background-color: #0056b3;
    }
  `
      : `
    background-color: #6c757d;
    color: white;
    
    &:hover {
      background-color: #545b62;
    }
  `}
`

const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`

const LoginPrompt = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  useEffect(() => {
    // Load user and tasks from localStorage on app start
    const savedUser = getUser()
    if (savedUser) {
      setUser(savedUser)
    }

    const savedTasks = getTasks()
    setTasks(savedTasks)
  }, [])

  const handleLogin = (newUser: User) => {
    setUser(newUser)
    saveUser(newUser)
  }

  const handleLogout = () => {
    setUser(null)
    clearUser()
  }

  const handleAddTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  const handleUpdateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  return (
    <AppContainer>
      <Header>
        <HeaderContent>
          <Logo>Task Manager</Logo>
          <UserInfo>
            {user ? (
              <>
                <WelcomeText>Welcome, {user.email}!</WelcomeText>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => setIsLoginModalOpen(true)}>
                Login
              </Button>
            )}
          </UserInfo>
        </HeaderContent>
      </Header>

      <Main>
        {user && <AddTask onAddTask={handleAddTask} />}

        {!user && tasks.length === 0 ? (
          <LoginPrompt>
            <h2>Welcome to Task Manager</h2>
            <p>No tasks available. Please log in to create and manage tasks.</p>
            <Button variant="primary" onClick={() => setIsLoginModalOpen(true)} style={{ marginTop: "1rem" }}>
              Login to Manage Tasks
            </Button>
          </LoginPrompt>
        ) : (
          <>
            {!user && (
              <div
                style={{
                  background: "white",
                  padding: "1rem",
                  borderRadius: "8px",
                  marginBottom: "2rem",
                  textAlign: "center",
                  border: "1px solid #e9ecef",
                }}
              >
                <p style={{ margin: "0", color: "#6c757d" }}>
                  You are viewing tasks in read-only mode.
                  <Button variant="primary" onClick={() => setIsLoginModalOpen(true)} style={{ marginLeft: "0.5rem" }}>
                    Login to Manage
                  </Button>
                </p>
              </div>
            )}
            <TaskList
              tasks={tasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              isReadOnly={!user}
            />
          </>
        )}
      </Main>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
    </AppContainer>
  )
}

export default App
