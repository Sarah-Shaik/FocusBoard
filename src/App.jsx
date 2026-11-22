
import { useState } from 'react'
import { Plus } from 'lucide-react'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Header from './components/Header/Header.jsx'
import FocusNotes from './components/FocusNotes/FocusNotes.jsx'
import StatCard from './components/StatCard/StatCard.jsx'
import { sampleTasks } from './data/sampleTasks.js'
import TaskList from './components/TaskList/TaskList.jsx'
import FilterTabs from './components/FilterTabs/FilterTabs.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import TaskForm from './components/TaskForm/TaskForm.jsx'
import MobileBottomNav from './components/MobileBottomNav/MobileBottomNav.jsx'
import useLocalStorage from './hooks/useLocalStorage.js'

const App = () => {
  const [activePage, setActivePage] = useState('Overview')

  const [tasks, setTasks] = useLocalStorage(
  'focusboard-tasks',
  sampleTasks
)

  const [activeFilter, setActiveFilter] = useState('All')

  const [searchQuery, setSearchQuery] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('All')

  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)

  const [editingTask, setEditingTask] = useState(null)


const handlePageChange = (page) => {
  setActivePage(page)

  if (page === 'Overview') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (page === 'My tasks') {
    document.querySelector('.task-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

const handleOpenEdit = (task) => {
  setEditingTask(task)
  setIsTaskFormOpen(true)
}

const handleCloseTaskForm = () => {
  setIsTaskFormOpen(false)
  setEditingTask(null)
}

const handleCreateTask = (taskData) => {
  const newTask = {
    ...taskData,
    id: crypto.randomUUID(),
  }

  setTasks((previousTasks) => [newTask, ...previousTasks])

  setActiveFilter('All')
  setSearchQuery('')
  setPriorityFilter('All')

  handleCloseTaskForm()
}


const handleToggleComplete = (taskId) => {
  setTasks((previousTasks) =>
    previousTasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status:
              task.status === 'Completed'
                ? 'To do'
                : 'Completed',
          }
        : task
    )
  )
}

const handleUpdateTask = (updatedTask) => {
  setTasks((previousTasks) =>
    previousTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )
  )

  handleCloseTaskForm()
}


const handleDeleteTask = (taskId) => {
  const taskToDelete = tasks.find((task) => task.id === taskId)

  if (!taskToDelete) {
    return
  }

  const shouldDelete = window.confirm(
    `Are you sure you want to delete "${taskToDelete.title}"?`
  )

  if (shouldDelete) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    )
  }
}


  const totalTasks = tasks.length

  const inProgressTasks = tasks.filter(
    (task) => task.status === 'In progress'
  ).length

  const completedTasks = tasks.filter(
    (task) => task.status === 'Completed'
  ).length

  const completionPercentage =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0

const filteredTasks = tasks.filter((task) => {
  const matchesStatus =
    activeFilter === 'All' || task.status === activeFilter

  const matchesSearch =
    task.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.trim().toLowerCase())

  const matchesPriority =
    priorityFilter === 'All' || task.priority === priorityFilter

  return matchesStatus && matchesSearch && matchesPriority
})

  return (
    <div className="app-layout">
      <Sidebar
  activePage={activePage}
  onPageChange={handlePageChange}
/>

      <div className="app-main">
        <Header activePage={activePage} />

        <main className="main-content">
          
<div className="dashboard-heading">
  <div className="dashboard-intro">
    <h1>Your work, in focus.</h1>
    <p className="desktop-subtitle">
  Plan your day, stay organized, and celebrate small wins.
</p>

<p className="mobile-subtitle">
  Stay organized and keep moving forward.
</p>
  </div>
  
<button
  type="button"
  className="new-task-button"
  onClick={() => {
    setEditingTask(null)
    setIsTaskFormOpen(true)
  }}
>
  New task
</button>
</div>

          <FocusNotes />

<h2 className="mobile-overview-heading">Overview</h2>

          <section
            className="stats-container"
            aria-label="Task statistics"
          >
            <StatCard
              title="Total tasks"
              value={totalTasks}
              description="Across all projects"
              type="total"
            />

            <StatCard
              title="In progress"
              value={inProgressTasks}
              description="Keep the momentum"
              type="progress"
            />

            <StatCard
              title="Completed"
              value={completedTasks}
              description={`${completionPercentage}% of all tasks`}
              type="completed"
            />
          </section>
          

<div className="task-section">
  
<div className="task-section-heading">
  <div className="task-section-intro">
    <h2>My tasks</h2>
    <p className="desktop-task-subtitle">
    Manage and track everything in one place.
  </p>

  <p className="mobile-task-subtitle">
    Your priorities for this week
  </p>
  </div>

  <button
    type="button"
    className="view-all-button"
    onClick={() => {
      setActiveFilter('All')
      setSearchQuery('')
      setPriorityFilter('All')
    }}
  >
    View all tasks
  </button>

  <button
    type="button"
    className="mobile-add-task-button"
    onClick={() => {
      setEditingTask(null)
      setIsTaskFormOpen(true)
    }}
    aria-label="Create new task"
  >
    <Plus size={24} strokeWidth={2} />
  </button>
</div>


  <div className="task-filter-bar">
  <FilterTabs
    activeFilter={activeFilter}
    onFilterChange={setActiveFilter}
    totalTasks={totalTasks}
  />

  <div className="task-filter-controls">
    <SearchBar
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />

    <select
      className="priority-select"
      value={priorityFilter}
      onChange={(event) => setPriorityFilter(event.target.value)}
      aria-label="Filter by priority"
    >
      <option value="All">Priority: All</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
  </div>
</div>

  <TaskList
  tasks={filteredTasks}
  onToggleComplete={handleToggleComplete}
  onEdit={handleOpenEdit}
  onDelete={handleDeleteTask}
/>
</div>

        </main>
      </div>
      <MobileBottomNav
        activePage={activePage}
        onPageChange={handlePageChange}
      />
{isTaskFormOpen && (
  <TaskForm
    onClose={handleCloseTaskForm}
    onCreateTask={handleCreateTask}
    onUpdateTask={handleUpdateTask}
    editingTask={editingTask}
  />
)}
    </div>
  )
}

export default App
