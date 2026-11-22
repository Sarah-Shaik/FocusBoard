
import { useState } from 'react'
import {
  Check,
  MoreHorizontal,
  Pencil,
  Trash2,
  CalendarDays,
} from 'lucide-react'

import './TaskCard.css'

const TaskCard = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isCompleted = task.status === 'Completed'

  const formattedDate = task.dueDate
    ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(
        'en-US',
        {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }
      )
    : 'No due date'

  return (
    <article className="task-card">
      <div className="task-main">
        <button
          type="button"
          className={`task-checkbox ${isCompleted ? 'checked' : ''}`}
          onClick={() => onToggleComplete(task.id)}
          aria-label={
            isCompleted
              ? `Mark ${task.title} as to do`
              : `Mark ${task.title} as completed`
          }
          aria-pressed={isCompleted}
        >
          {isCompleted && <Check size={15} strokeWidth={2.5} />}
        </button>

        <div className="task-info">
          <h3 className={isCompleted ? 'task-title-completed' : ''}>
            {task.title}
          </h3>

          <p>{task.description}</p>
        </div>
      </div>

      <div className="task-meta">
        <span className="task-category">
          {task.category}
        </span>

        <span className={`task-priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>

        <div className="task-date">
          <CalendarDays size={14} />
          <span>{formattedDate}</span>
        </div>

        <div className="task-menu-wrapper">
          <button
            type="button"
            className="task-more"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-label={`Actions for ${task.title}`}
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
          >
            <MoreHorizontal size={20} />
          </button>

          {isMenuOpen && (
            <div className="task-dropdown">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  onEdit(task)
                }}
              >
                <Pencil size={15} />
                Edit
              </button>

              <button
                type="button"
                className="delete-option"
                onClick={() => {
                  setIsMenuOpen(false)
                  onDelete(task.id)
                }}
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default TaskCard
