import { Search, Calendar, Star, SlidersHorizontal, ChevronDown } from "lucide-react";

const FilterButton = ({ icon: Icon, text }) => (
  <button className="filter-dropdown-btn">
    <div className="filter-btn-left">
      <Icon size={16} className="filter-icon" />
      <span>{text}</span>
    </div>
    <ChevronDown size={14} className="filter-chevron" />
  </button>
);

export default function FilterBar() {
  return (
    <div className="filter-bar">
      <div className="filter-item search-filter">
        <Search size={16} className="filter-icon" />
        <input type="text" placeholder="Search candidate..." />
      </div>
      
      <div className="filter-divider"></div>
      
      <FilterButton icon={Calendar} text="Date Range" />
      
      <div className="filter-divider"></div>
      
      <FilterButton icon={Star} text="Score Range" />

      <div className="filter-divider"></div>

      <FilterButton icon={SlidersHorizontal} text="Advance Filter" />
    </div>
  );
}
