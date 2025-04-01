import { Search, User, BadgePlus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Logo from "@/components/logo";
import { useContext } from "react";
import { AuthContext } from "@/hook/context";

export default function Header() {
  const navigate = useNavigate();
  // const [isLoggedIn,] = useLoggedIn();
  const [username] = useContext(AuthContext);

  function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const searchInput = event.currentTarget.value.trim();
      const params = new URLSearchParams([["keywords", searchInput], ["tags", "[]"], ["filterBy", "1"]]);
      if (searchInput) {
        navigate(`/search?${params.toString()}`)
      }
    }
  }

  return (
    <header className="header">
      <div className="header-leftmost">
        {/* <Link to="user/settings"> 
          <button className="round-button">
            <Menu className="icon" />
          </button>
        </Link> */}

        {username && <Link to="holler">
          <button className="create-post-button">
            <BadgePlus className="icon" />
            <span>Create a Post</span>
          </button>
        </Link>}

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

      {
        username === null
          ?
          <div>
            <Link to="auth/signup">Signup</Link>
            <Link to="auth/login">Login</Link>
          </div>

          :

          <Link to={"user/" + username}>
            <button className="round-button">
              <User className="icon" />
            </button>
          </Link>
      }
    </header>
  );
}
