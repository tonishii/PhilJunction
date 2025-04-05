import { ThemeContext } from "@/helpers/context";
import "@/styles/map-styles.css";
import { APIProvider, ColorScheme, Map } from "@vis.gl/react-google-maps";
import { Dispatch, SetStateAction, useContext } from "react";
import Directions from "./directions";
import LocationInput from "./locationpicker";

const style: React.CSSProperties = {
  borderRadius: "10px",
}

export default function RouteMap({
  center,
  origin,
  destination,
  setOrigin,
  setDestination,
  isEditable = false,
} : {
  center?: { // auto-centers
    lat: number,
    lng: number,
  };
  origin: { id: string, place: string };
  destination: { id: string, place: string };
  setOrigin?: Dispatch<SetStateAction<{ id: string; place: string; }>>;
  setDestination?: Dispatch<SetStateAction<{ id: string; place: string; }>>;
  isEditable?: boolean;
}) {
  const theme = useContext(ThemeContext);

  // useEffect(() => {
  //   console.log(origin, destination);
  // }, [origin, destination]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY!}>
      <div className="map-wrapper">
        { isEditable && setOrigin && setDestination && <div className="location-wrapper">
          <LocationInput label="Origin" onChange={setOrigin} value={origin} />
          <LocationInput label="Destination" onChange={setDestination} value={destination} />
        </div> }

        <Map className="map-container"
          mapId={import.meta.env.VITE_MAPS_ID}
          defaultCenter={center ?? { lat: 13.41, lng: 122.56 }}
          colorScheme={theme[0].toUpperCase() as keyof typeof ColorScheme}
          defaultZoom={5}
          disableDefaultUI={true}
          style={style}>

        { origin && destination &&
          <Directions
            origin={origin}
            destination={destination}/> }
        </Map>
      </div>
    </APIProvider>
  );
}
