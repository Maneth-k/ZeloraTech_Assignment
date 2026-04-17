import { LayoutDashboard, Users, Briefcase, Calendar, MessageSquare, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-circle"></div>
      </div>
      <nav className="sidebar-nav">
        <a href="#" className="nav-item tooltip"><LayoutDashboard size={20} /><span className="tooltip-text">Dashboard</span></a>
        <a href="#" className="nav-item active tooltip"><Users size={20} /><span className="tooltip-text">Candidates</span></a>
        <a href="#" className="nav-item tooltip"><Briefcase size={20} /><span className="tooltip-text">Jobs</span></a>
        <a href="#" className="nav-item tooltip"><Calendar size={20} /><span className="tooltip-text">Calendar</span></a>
        <a href="#" className="nav-item tooltip"><MessageSquare size={20} /><span className="tooltip-text">Messages</span></a>
      </nav>
      <div className="sidebar-bottom">
        <a href="#" className="nav-item tooltip"><Settings size={20} /><span className="tooltip-text">Settings</span></a>
      </div>
    </aside>
  );
}
