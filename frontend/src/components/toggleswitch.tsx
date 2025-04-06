import "@/styles/toggle.css";
import { memo, SyntheticEvent } from "react";

function Toggleswitch({ defaultChecked, name, onClick }: { defaultChecked?: boolean, name?: string, onClick?: (e: SyntheticEvent<HTMLInputElement>) => void }) {
  return (
    <label className="switch">
      <input type="checkbox" defaultChecked={defaultChecked} onChange={onClick} name={name} id={name} />
      <span className="slider"></span>
    </label>
  )
}

export default memo(Toggleswitch);
