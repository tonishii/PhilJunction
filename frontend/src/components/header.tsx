import { Search, User, BadgePlus, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useContext, useEffect, useState, memo } from "react";
import { toast } from "react-toastify";

import Logo from "@/components/logo";
import { AuthContext } from "@helpers/context";
import { makeServerURL } from "@helpers/url";

function Header() {
  const navigate = useNavigate();
  const [username] = useContext(AuthContext);
  const [profileIcon, setProfileIcon] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIcon() {
      if (!username) {
        setProfileIcon(null);
        return;
      }

      try {
        const res = await fetch(makeServerURL(`user/${username}`));
        const data = await res.json();

        if (!res.ok) {
          toast.error("An error has occured while fetching icon.");
          console.error(data.message);
        } else {
          setProfileIcon(data.user.icon.imageUrl);
          console.log(data.message);
        }
      } catch (error) {
        toast.error("An error has occured while fetching icon.");
        console.error(error);
      }
    }
    fetchIcon();
  }, [username]);

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

      <Link to="about">
        <button className="aboutus-button">
          <span>About us</span>
          <ArrowUpRight
            className="aboutus-arrow"
            color="#4E565A"
            size={13}/>
        </button>
      </Link>

      {
        username === null
          ?
          <Link to="auth/login">
            <button className="login-button">
              Log In
            </button>
          </Link>

          :

          <Link to={"user/" + username}>
            {profileIcon ? (<img src={profileIcon} alt="icon" className="profile-icon" />
            ) : (
              <button className="round-button">
                <User className="pulse icon" />
              </button>
            )}
          </Link>
      }
    </header>
  );
}

export default memo(Header);
