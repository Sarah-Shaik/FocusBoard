
import { LayoutGrid, List, CalendarDays, Settings } from 'lucide-react'
import './Sidebar.css'

const menuItems = [
  { name: 'Overview', icon: LayoutGrid },
  { name: 'My tasks', icon: List },
  { name: 'Calendar', icon: CalendarDays },
  { name: 'Settings', icon: Settings },
]

const Sidebar = ({ activePage, onPageChange }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <LayoutGrid size={20} strokeWidth={2.5} />
        </div>
        <span>FocusBoard</span>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <p className="sidebar-label">WORKSPACE</p>

        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <button
              key={item.name}
              type="button"
              className={`sidebar-link ${
                activePage === item.name ? 'active' : ''
              }`}
              onClick={() => onPageChange(item.name)}
              aria-current={activePage === item.name ? 'page' : undefined}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{item.name}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
