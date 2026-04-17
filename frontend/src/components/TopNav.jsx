import { Briefcase, Users, Search, Bell, ChevronDown, Plus, LayoutGrid, User } from "lucide-react";

export default function TopNav() {
  return (
    <header className="top-nav">
      <div className="top-nav-left">
        <div className="nav-logo">
          <LayoutGrid size={24} className="logo-icon" />
         <h3>Recruitment</h3>
        </div>
      </div>

      <div className="stats">
        <span className="stat-item">
          <Briefcase size={16} /> Jobs <strong>8</strong>
        </span>
        <span className="stat-item">
          <Users size={16} /> Candidate <strong>551</strong>
        </span>
        <span className="stat-item">
          <Users size={16} /> Career site
        </span>
      </div>

      <div className="top-nav-right">
        <div className="actions">
          <button className="icon-btn plus-btn tooltip">
            <Plus size={20} />
            <span className="tooltip-text">Add New</span>
          </button>
          <button className="icon-btn tooltip">
            <Search size={20} />
            <span className="tooltip-text">Search</span>
          </button>
          <button className="icon-btn tooltip">
            <Bell size={20} />
            <span className="tooltip-text">Notifications</span>
          </button>
          <button className="icon-btn tooltip">
            <User size={20} />
            <span className="tooltip-text">Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}


