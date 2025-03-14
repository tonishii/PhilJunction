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

  /* For User functionality update: username, email, and bio*/


  const handleSubmit = async () => {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const email =  (document.getElementById("email") as HTMLInputElement).value;
    const bio = (document.getElementById("bio") as HTMLTextAreaElement).value;

    try {
        const response = await fetch(`http://localhost:3001/updateuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              oldusername: user.username,
              username: username,
              email: email,
              bio: bio
            }),
        });

        if (!response.ok) throw new Error("Failed to update user");

        const data = await response.json();
        console.log("User updated:", data);
        alert("User details updated successfully!");
    } catch (error) {
        console.error("Error updating user:", error);
      }
  }

  /* Example usage:
  updateUser("650abc123def456ghi789jkl", {
    username: "newUsername",
    email: "newemail@example.com",
    bio: "This is my updated bio."
  }); */

  return (
    <div className="settings-container">
      <section>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" defaultValue={user?.username}></input>

        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" defaultValue={user?.email}></input>

        <label htmlFor="bio">Bio</label>
        <textarea name="bio" id="bio" defaultValue={user?.description}></textarea>

        <label htmlFor="update"></label>
        <button type="button" id="update" name="update" onClick={handleSubmit}>Update user</button>
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