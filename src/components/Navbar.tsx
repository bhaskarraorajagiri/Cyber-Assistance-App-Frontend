import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">CyberAssist</div>

      <div className="nav-right">
        <NavLink to="/dashboard">Dashboard</NavLink>
      </div>
    </nav>
  );
}
