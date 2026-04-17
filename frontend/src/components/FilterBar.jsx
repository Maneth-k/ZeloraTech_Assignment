import { Search, Calendar, Star, SlidersHorizontal } from "lucide-react";

export default function FilterBar() {
  return (
    <div className="filter-bar">
      <div className="filter-item search-filter">
        <Search size={16} className="filter-icon" />
        <input type="text" placeholder="Search candidate..." />
      </div>
      
      <div className="filter-divider"></div>
      
      <button className="filter-btn">
        <Calendar size={16} className="filter-icon" />
        Date Range
      </button>
      
      <div className="filter-divider"></div>
      
      <button className="filter-btn">
        <Star size={16} className="filter-icon" />
        Score Range
      </button>

      <div className="filter-divider"></div>

      <button className="filter-btn advance-filter">
        <SlidersHorizontal size={16} className="filter-icon" />
        Advance Filter
      </button>
    </div>
  );
}
