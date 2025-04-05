import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Directions({
  origin,
  destination,
} : {
  origin: { id: string, place: string };
  destination: { id: string, place: string };
}) {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const [directionService, setDirectionService] = useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionRenderer] = useState<google.maps.DirectionsRenderer>();

  useEffect(() => {
    if (!routesLib || !map) return;

    if (!directionService) {
      setDirectionService(new routesLib.DirectionsService());
    }

    if (!directionRenderer) {
      setDirectionRenderer(new routesLib.DirectionsRenderer({ map }));
    }
  }, [map, routesLib]);

  useEffect(() => {
    if (!directionService ||
        !directionRenderer ||
        !origin.place.trim() ||
        !origin.id.trim() ||
        !destination.place.trim() ||
        !destination.id.trim()) return;

    directionService.route({
      origin: origin.place,
      destination: destination.place,
      travelMode: google.maps.TravelMode.TRANSIT,
    }).then(res => {
      directionRenderer.setDirections(res);
    }).catch((error) => {
      toast.error("No routes found!");
      console.error(error);
    });

  }, [origin, destination, directionService, directionRenderer]);

  return null;
}
