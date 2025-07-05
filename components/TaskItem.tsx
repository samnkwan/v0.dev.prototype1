"use client"

import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import type { Task } from "../types"

interface TaskItemProps {
  task: Task
  onUpdateTask: (task: Task) => void
  onDeleteTask: (id: string) => void
  isReadOnly?: boolean
}

const TaskContainer = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`

const TaskTitle = styled.h4`
  margin: 0;
  flex: 1;
  color: #333;
`

const TaskDescription = styled.p`
  margin: 0 0 1rem 0;
  color: #666;
  line-height: 1.5;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const Button = styled.button<{ variant?: "primary" | "danger" | "success" }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  ${(props) => {
    switch (props.variant) {
      case "danger":
        return `
          background-color: #dc3545;
          color: white;
          &:hover { background-color: #c82333; }
        `
      case "success":
        return `
          background-color: #28a745;
          color: white;
          &:hover { background-color: #218838; }
        `
      default:
        return `
          background-color: #007bff;
          color: white;
          &:hover { background-color: #0056b3; }
        `
    }
  }}
`

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 60px;
  resize: vertical;
`

export const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateTask, onDeleteTask, isReadOnly = false }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description)

  const handleEdit = () => {
    if (!isReadOnly) {
      setIsEditing(true)
      setEditTitle(task.title)
      setEditDescription(task.description)
    }
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editTitle.trim()) {
      onUpdateTask({
        ...task,
        title: editTitle.trim(),
        description: editDescription.trim(),
      })
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditTitle(task.title)
    setEditDescription(task.description)
  }

  return (
    <TaskContainer>
      {isEditing ? (
        <EditForm onSubmit={handleSaveEdit}>
          <Input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} autoFocus />
          <TextArea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
          <ButtonGroup>
            <Button type="submit" variant="success" disabled={!editTitle.trim()}>
              Save
            </Button>
            <Button type="button" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </ButtonGroup>
        </EditForm>
      ) : (
        <>
          <TaskHeader>
            <TaskTitle>{task.title}</TaskTitle>
          </TaskHeader>
          {task.description && <TaskDescription>{task.description}</TaskDescription>}
          {!isReadOnly && (
            <ButtonGroup>
              <Button onClick={handleEdit}>Edit</Button>
              <Button variant="danger" onClick={() => onDeleteTask(task.id)}>
                Delete
              </Button>
            </ButtonGroup>
          )}
        </>
      )}
    </TaskContainer>
  )
}
