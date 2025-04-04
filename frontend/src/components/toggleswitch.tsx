import "@/styles/toggle.css";
import { SyntheticEvent } from "react";

export default function Toggleswitch({ defaultChecked, name, onClick }: { defaultChecked?: boolean, name?: string, onClick?: (e: SyntheticEvent<HTMLInputElement>) => void }) {
  return (
    <label className="switch">
      <input type="checkbox" defaultChecked={defaultChecked} onChange={onClick} name={name} id={name} />
      <span className="slider"></span>
    </label>
  )
}
