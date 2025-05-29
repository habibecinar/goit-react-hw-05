import { NavLink } from "react-router-dom";

export default function Navigation() {
    return (
      <header>
    <nav className="page-title">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/movies">Movies</NavLink>
            </nav>
        </header>
  );
}
