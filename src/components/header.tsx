import { Menu, Search, User } from "lucide-react";
import { Link } from "react-router";
import Logo from "@/components/logo";

export default function Header() {
  function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const searchInput = document.getElementById(
        "search-input"
      ) as HTMLInputElement;
      const searchQuery = searchInput.value;

      // Search for posts with the search in a search page
      // query here...
    }
  }

  return (
    <header className="header">
      <button className="round-button">
        <Menu className="icon" />
      </button>

      <Link to="/" className="header-link">
        <button className="header-button">
          <Logo />
        </button>
        <h1 className="header-text">PhilJunction!</h1>
      </Link>

      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          id="search-input"
          className="search-input"
          onKeyDown={handleSearch}
        />
      </div>

      <Link to="/profile">
        <button className="round-button">
          <User className="icon" />
        </button>
      </Link>
    </header>
  );
}
