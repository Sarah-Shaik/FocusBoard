
import {
  LayoutGrid,
  List,
  CalendarDays,
  Settings,
} from 'lucide-react'

import './MobileBottomNav.css'

const menuItems = [
  { name: 'Overview', icon: LayoutGrid },
  { name: 'My tasks', icon: List },
  { name: 'Calendar', icon: CalendarDays },
  { name: 'Settings', icon: Settings },
]

const MobileBottomNav = ({ activePage, onPageChange }) => {
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {menuItems.map((item) => {
        const Icon = item.icon
        const isActive = activePage === item.name
        const isAvailable =
          item.name === 'Overview' || item.name === 'My tasks'

        return (
          <button
            key={item.name}
            type="button"
            className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onPageChange(item.name)}
            disabled={!isAvailable}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={21} strokeWidth={1.8} />
            <span>
              {item.name === 'My tasks' ? 'Tasks' : item.name}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

export default MobileBottomNav
