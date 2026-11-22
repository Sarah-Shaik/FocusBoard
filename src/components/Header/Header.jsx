
import { ChevronDown, LayoutGrid } from 'lucide-react'
import './Header.css'

const Header = ({ activePage }) => {
  return (
    <header className="header">
        <div className="mobile-brand">
         <div className="mobile-brand-icon">
         <LayoutGrid size={17} strokeWidth={2.5} />
         </div>
          <span>FocusBoard</span>
         </div>
      <div className="header-breadcrumb">
        <span className="breadcrumb-workspace">Workspace</span>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current">{activePage}</span>
      </div>

      <div className="header-profile">
        <div className="profile-avatar">JD</div>
        <ChevronDown size={15} strokeWidth={1.8} />
      </div>
    </header>
  )
}

export default Header
