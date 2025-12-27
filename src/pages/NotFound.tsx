import { Link } from "react-router-dom";
import "../styles/notfound.css";

export default function NotFound() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/" className="home-link">
        Go back home
      </Link>
    </div>
  );
}
