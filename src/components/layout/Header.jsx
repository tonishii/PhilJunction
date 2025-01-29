import Button from "@ui/Button";
import Input from "@ui/Input";
import { Menu, Search, User } from "lucide-react";

export default function Header() {
  return (
    <header className='header'>
      <Button className='menu-button'>
        <Menu className='icon' />
      </Button>

      <img className='header-logo' />
      <h1 className="header-text">PhilJunction!</h1>

        <div className='search-bar'>
          <Search className='search-icon'/>
          <Input
            type='text'
            placeholder='Search'
            className='search-input'
          />
        </div>

      <Button className='profile-button'>
        <User className='icon'/>
      </Button>
    </header>
  )
}