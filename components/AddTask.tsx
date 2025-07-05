"use client"

import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import type { Task } from "../types"

interface AddTaskProps {
  onAddTask: (task: Omit<Task, "id" | "createdAt">) => void
}

const AddTaskContainer = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #218838;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        description: description.trim(),
      })
      setTitle("")
      setDescription("")
    }
  }

  return (
    <AddTaskContainer>
      <h3>Add New Task</h3>
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextArea
          placeholder="Task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" disabled={!title.trim()}>
          Add Task
        </Button>
      </Form>
    </AddTaskContainer>
  )
}
