import React from "react";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/assets/css/leaflet.css";
import { EditControl } from "react-leaflet-draw";
import { FeatureGroup } from "react-leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";
import { SearchControl, OpenStreetMapProvider } from "react-leaflet-geosearch";

const ShortestRoutes = () => {
  const pos = [18.5204, 73.8567];
  const GeoSearchControlElement = SearchControl;
  const prov = OpenStreetMapProvider();
  return (
    <div className="container">
      <MapContainer
        className="mymap"
        id="mymap"
        style={{ width: "100%", height: "100vh" }}
        center={pos}
        zoom={15}
        scrollWheelZoom={true}
        doubleClickZoom={false}
      >
        <FeatureGroup>
          <EditControl
            // onCreated={_onCreated}
            // onEdited={_onEdited}
            // onDeleted={_onDeleted}
            position="topright"
            draw={{
              rectangle: true,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: true,
            }}
          ></EditControl>
          {/* <Polygon
            positions={testPoly}
          /> */}
        </FeatureGroup>
        <FullscreenControl position="topleft" />
        <GeoSearchControlElement
          provider={prov}
          showMarker={true}
          showPopup={false}
          maxMarkers={3}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={false}
          searchLabel={"Enter address, please"}
          keepResult={true}
          popupFormat={({ query, result }) => result.label}
        />
        <LayersControl position="bottomright">
          <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Test Layer">
            <TileLayer url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" />
            <LayersControl.Overlay name="Marker with popup">
              <Marker>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </LayersControl.Overlay>
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="Get My Location"></LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};
export default ShortestRoutes;
