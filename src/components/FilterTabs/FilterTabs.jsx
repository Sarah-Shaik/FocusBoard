import './FilterTabs.css'

const FilterTabs = ({ activeFilter, onFilterChange, totalTasks }) => {
  const filters = ['All', 'In progress', 'Completed']

  return (
    <div className="filter-tabs" aria-label="Filter tasks">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`filter-tab ${
            activeFilter === filter ? 'selected' : ''
          }`}
          onClick={() => onFilterChange(filter)}
          aria-pressed={activeFilter === filter}
        >
          {filter === 'All' ? `All tasks ${totalTasks}` : filter}
        </button>
      ))}
    </div>
  )
}

export default FilterTabs
