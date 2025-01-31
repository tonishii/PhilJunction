import { Menu, Search, User } from "lucide-react";

export default function Header() {
  return (
    <header className='header'>
      <button className="menu-button">
        <Menu className="icon"/>
      </button>

      <img className='header-logo' />
      <h1 className="header-text">PhilJunction!</h1>

        <div className='search-bar'>
          <Search className='search-icon'/>
          <input
            type='text'
            placeholder='Search'
            className='search-input'
          />
        </div>

      <button className='profile-button'>
        <User className='icon'/>
      </button>
    </header>
  )
}