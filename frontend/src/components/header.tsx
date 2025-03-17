import { Menu, Search, User, BadgePlus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Logo from "@/components/logo";

export default function Header() {
  const navigate = useNavigate();

  function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const searchInput = event.currentTarget.value.trim();
      if (searchInput) {
        navigate(`/search?q=${encodeURIComponent(searchInput)}`)
      }
    }
  }

  return (
    <header className="header">
      <div className="header-leftmost">
        <Link to="user/settings"> {/* FIX  */}
          <button className="round-button">
            <Menu className="icon" />
          </button>
        </Link>
        <Link to="holler">
          <button className="create-post-button">
            <BadgePlus className="icon" />
            <span>Create a Post</span>
          </button>
        </Link>
      </div>

      <Link to="/" className="header-link">
        <button className="header-button">
          <Logo />
        </button>
        <h1 className="header-text">PhilJunction!</h1>
      </Link>

      <div className="search-bar">
        <Link to="search"><Search className="search-icon" /></Link>
        <input
          type="text"
          placeholder="Search"
          id="search-input"
          className="search-input"
          onKeyDown={handleSearch}
        />
      </div>

      <Link to="user">
        <button className="round-button">
          <User className="icon" />
        </button>
      </Link>
    </header>
  );
}
