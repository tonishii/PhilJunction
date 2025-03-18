import { MapPinXIcon } from "lucide-react";
import "@styles/error-styles.css"
export default function FourOFourPage() {

    return (
        <div className="error-container">
            <h1>Seems like you got a little lost in your commute.</h1>
            <MapPinXIcon className="MapPinXIcon" />
        </div>
    )
}