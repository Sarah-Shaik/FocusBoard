import { Search } from 'lucide-react'
import './SearchBar.css'

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="search-box">
      <Search size={16} strokeWidth={1.8} />

      <input
        type="search"
        placeholder="Find a task..."
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        aria-label="Search tasks"
      />
    </div>
  )
}

export default SearchBar
