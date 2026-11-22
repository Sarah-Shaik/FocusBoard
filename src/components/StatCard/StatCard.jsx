
import { List, Clock3, Check } from 'lucide-react'
import './StatCard.css'

const icons = {
  total: List,
  progress: Clock3,
  completed: Check,
}

const StatCard = ({ title, value, description, type }) => {
  const Icon = icons[type]

  return (
    <div className={`stat-card stat-${type}`}>
      <div className="stat-icon">
        <Icon size={20} strokeWidth={2} />
      </div>

      <div className="stat-details">
        <p className="stat-title">{title}</p>
        <h2 className="stat-value">{value}</h2>
        <p className="stat-description">{description}</p>
      </div>
    </div>
  )
}

export default StatCard
