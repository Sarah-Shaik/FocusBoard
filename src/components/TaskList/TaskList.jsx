
import TaskCard from '../TaskCard/TaskCard.jsx'
import './TaskList.css'

const TaskList = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  return (
    <section className="task-list-section" aria-label="Tasks">
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="empty-tasks">No tasks found.</p>
        )}
      </div>
    </section>
  )
}

export default TaskList
