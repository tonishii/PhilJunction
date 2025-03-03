import "@/styles/toggle.css"
export default function Toggleswitch({ toggled, name }: { toggled?: boolean, name: string }) {
    return (
        <label className="switch">
            <input type="checkbox" checked={toggled} name={name} id={name} />
            <span className="slider"></span>
        </label>
    )
}