import Toggleswitch from "@/components/toggleswitch"
import { IUser } from "@/models/userType";

export default function Settings({ user }: { user: IUser; }) {
  return (
    <div className="settings-container">
      <section>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username"></input>

        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email"></input>

        <label htmlFor="bio">Bio</label>
        <textarea name="bio" id="bio"></textarea>
      </section>

      <h2>Web Interface</h2>
      <section>
        <label htmlFor="theme">Select theme light or dark</label>
        <Toggleswitch name="theme" />

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