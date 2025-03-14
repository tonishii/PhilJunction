import Toggleswitch from "@/components/toggleswitch"
import { useLocalStorage } from "@/hook/storage";
import { SyntheticEvent, useEffect } from "react";
import { IUser } from "@/models/userType";

export default function Settings({ user }: { user: IUser; }) {

  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeToggle = (e: SyntheticEvent<HTMLInputElement>) => {
    setTheme(e.currentTarget.checked ? "dark" : "light");
  }

  return (
    <div className="settings-container">
      <section>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" placeholder={user.username}></input>

        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" placeholder={user.email}></input>

        <label htmlFor="bio">Bio</label>
        <textarea name="bio" id="bio" placeholder={user.description}></textarea>
      </section>

      <h2>Web Interface</h2>
      <section>
        <label htmlFor="theme">Enable dark theme</label>
        <Toggleswitch name="theme" onClick={handleThemeToggle} defaultChecked={theme === "dark"} />

        <label htmlFor="font-style">Customize font-style</label>
        <select name="font-style" id="font-style">
          <option value="times">times</option>
          <option value="roman">roman</option>
          <option value="new">new</option>
        </select>

        <label htmlFor="font-size">Customize font-size</label>
        <input type="number" name="font-size" id="font-size" />
      </section>

      <h2>User Privacy</h2>
      <section>
        <label htmlFor="anonymous">Allow username publicly displayed? </label>
        <Toggleswitch name="anonymous" />
      </section>

    </div>
  )
}