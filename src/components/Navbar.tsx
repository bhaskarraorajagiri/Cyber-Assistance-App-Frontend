import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">CyberAssist</div>

      <div className="nav-right">
        <NavLink to="/history">History</NavLink>
        <NavLink to="/">Home</NavLink>
      </div>
    </nav>
  );
}
