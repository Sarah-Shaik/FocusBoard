
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import './TaskForm.css'

const TaskForm = ({
  onClose,
  onCreateTask,
  onUpdateTask,
  editingTask,
}) => {
   
const [formData, setFormData] = useState({
  title: editingTask?.title || '',
  description: editingTask?.description || '',
  category: editingTask?.category || 'Development',
  status: editingTask?.status || 'To do',
  priority: editingTask?.priority || 'Medium',
  dueDate: editingTask?.dueDate || '',
})

  const [errors, setErrors] = useState({})

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: '',
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required.'
    }

    if (formData.dueDate) {
      const today = new Date()
      const localToday = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, '0'),
        String(today.getDate()).padStart(2, '0'),
      ].join('-')

      if (formData.dueDate < localToday) {
        newErrors.dueDate = 'Due date cannot be in the past.'
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    
const taskDetails = {
  ...formData,
  title: formData.title.trim(),
  description: formData.description.trim(),
}

if (editingTask) {
  onUpdateTask({
    ...taskDetails,
    id: editingTask.id,
  })
} else {
  onCreateTask(taskDetails)
}
  }

  return (
    <div
      className="task-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
      >
        <div className="task-modal-header">
          <div>
            <h2 id="task-modal-title">
  {editingTask ? 'Edit task' : 'Create new task'}
</h2>
            <p>Add a task to stay organized.</p>
          </div>

          <button
            type="button"
            className="task-modal-close"
            onClick={onClose}
            aria-label="Close task form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="task-modal-body">
            <div className="task-form-group">
              <label htmlFor="task-title">
                Task title <span>*</span>
              </label>
              <input
                id="task-title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Design landing page"
                maxLength={100}
                aria-invalid={Boolean(errors.title)}
                aria-describedby={
                  errors.title ? 'task-title-error' : undefined
                }
              />
              {errors.title && (
                <p className="task-form-error" id="task-title-error">
                  {errors.title}
                </p>
              )}
            </div>

            <div className="task-form-group">
              <label htmlFor="task-description">Description</label>
              <textarea
                id="task-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add a short description..."
                rows={3}
              />
            </div>

            <div className="task-form-group">
              <label htmlFor="task-category">Category</label>
              <select
                id="task-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Content">Content</option>
                <option value="Testing">Testing</option>
                <option value="Documentation">Documentation</option>
                <option value="Research">Research</option>
              </select>
            </div>

            <div className="task-form-row">
              <div className="task-form-group">
                <label htmlFor="task-status">Status</label>
                <select
                  id="task-status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="To do">To do</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="task-form-group">
                <label htmlFor="task-priority">Priority</label>
                <select
                  id="task-priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="task-form-group">
              <label htmlFor="task-due-date">Due date</label>
              <input
                id="task-due-date"
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                aria-invalid={Boolean(errors.dueDate)}
                aria-describedby={
                  errors.dueDate ? 'task-due-date-error' : undefined
                }
              />
              {errors.dueDate && (
                <p className="task-form-error" id="task-due-date-error">
                  {errors.dueDate}
                </p>
              )}
            </div>
          </div>

          <div className="task-modal-footer">
            <button
              type="button"
              className="task-cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="task-create-button">
              {editingTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
