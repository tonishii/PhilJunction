import { MapPinOff } from "lucide-react";
import "@styles/error-styles.css"

export default function FourOFourPage() {
  return (
    <div className="error-container">
      <div className="error-404-wrapper">
        <h1 className="error-404">ERROR 404</h1>
        <MapPinOff size={50}/>
      </div>
      <span>Seems like you got a little lost in your commute.</span>
    </div>
  )
}
