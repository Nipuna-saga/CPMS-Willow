import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";

const Map = ({ sites, project }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [-74.5, 40],
      zoom: 0,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    sites.forEach((site) => {
      new maplibregl.Marker()
        .setLngLat([site.longitude, site.latitude])
        .setPopup(new maplibregl.Popup({ offset: 25 }).setText(site.name))
        .addTo(map);
    });

    if (project) {
      // Add a custom marker for project site
      const customMarkerElement = document.createElement("div");
      customMarkerElement.className = "custom-marker";

      new maplibregl.Marker({ element: customMarkerElement })
        .setLngLat([project.longitude, project.latitude]) // Set the coordinates for the custom marker
        .setPopup(new maplibregl.Popup({ offset: 25 }).setText(project.name))
        .addTo(map);
    }

    return () => map.remove();
  }, [sites, project]);

  return <div className="map-container" ref={mapContainerRef}></div>;
};

export default Map;
