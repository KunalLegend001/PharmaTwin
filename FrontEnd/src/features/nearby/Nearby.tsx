import { useEffect, useState } from "react";

export const LiveLocationMap = () => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setError("Unable to retrieve location");
      }
    );
  }, []);

  const mapSrc = coords
    ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`
    : "";
  return (
    <div>
      {error && <p>{error}</p>}
      {!coords && !error && <p>Getting location...</p>}

      {coords && (
        <iframe
          src={mapSrc}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Live Location Map"
        ></iframe>
      )}
    </div>
  );
};
