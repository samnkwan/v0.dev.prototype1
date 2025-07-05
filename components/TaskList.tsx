"use client"

import type React from "react"
import styled from "styled-components"
import type { Task } from "../types"
import { TaskItem } from "./TaskItem"

interface TaskListProps {
  tasks: Task[]
  onUpdateTask: (task: Task) => void
  onDeleteTask: (id: string) => void
  isReadOnly?: boolean
}

const ListContainer = styled.div`
  margin-top: 2rem;
`

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const TaskCount = styled.span`
  color: #6c757d;
  font-size: 0.875rem;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6c757d;
`

export const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask, isReadOnly = false }) => {
  return (
    <ListContainer>
      <ListHeader>
        <h2>Your Tasks</h2>
        <TaskCount>{tasks.length} tasks</TaskCount>
      </ListHeader>

      {tasks.length === 0 ? (
        <EmptyState>No tasks yet. Add your first task above!</EmptyState>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            isReadOnly={isReadOnly}
          />
        ))
      )}
    </ListContainer>
  )
}
