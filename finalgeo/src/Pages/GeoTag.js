import React, { useEffect, useRef, useState, useContext } from "react";
import * as L from "leaflet";
import axios from "axios";
import {
  MapContainer,
  LayersControl,
  TileLayer,
  Marker,
  Popup,
  LayerGroup,
  FeatureGroup,
  useMapEvents,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { OpenStreetMapProvider, SearchControl } from "react-leaflet-geosearch";
import openStreetMapProvider from "react-leaflet-geosearch/lib/Providers/openStreetMapProvider";
import { FullscreenControl } from "react-leaflet-fullscreen";
import Sidebar from "../Components/Sidebar";
import { Button } from "@mui/material";
import ScaleText from "react-scale-text";

import tags from "../Data/List";
import { GeoContext } from "../Contexts/GeoContext";

const ShortestRoutes = () => {
  const markerIcon = new L.icon({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
    iconAnchor: [17, 45], //[left/right,top bottom]
    popupAnchor: [-5, -30],
  });

  const [mapLayer, setMapLayer] = useState([]);
  const [state, setState] = useState({ map: null });
  const pos = [18.5204, 73.8567];
  const mapRef = useRef();
  const [Polygons, setPolygons] = useState([]); //polygons contain all the coordinates of a polygon/fence
  const [Points, setPoints] = useState([]);
  const [Location, setLocation] = useState([]);
  const [map, setMap] = useState();
  const [position, setPosition] = useState(null);
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [pointsData, setPointsData] = useState(null);
  const [infoData, setInfoData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    lat: null,
    lng: null,
  });

  const { savePoint, deletePoint } = useContext(GeoContext);

  const GeoSearchControlElement = SearchControl;
  const prov = openStreetMapProvider();

  let INF = 10000;

  useEffect(() => {
    let latlngarray = [];
    mapLayer.forEach((item) => {
      item.latlngs.forEach((coords) => {
        latlngarray.push([coords.lat, coords.lng]);
      });
      //setPolygons(item.latlngs);
    });
    //console.log(latlngarray);
    setPolygons(latlngarray);
    //console.log(Polygons);
  }, [mapLayer, setMapLayer]); //run everytime maplayer changes

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let token = JSON.parse(localStorage.getItem("token"));

      axios
        .get("http://localhost:5000/api/points/", {
          headers: { "x-auth-token": token },
        })
        .then(function (response) {
          if (response.status === 200) {
            setPointsData(response.data);
            console.log(pointsData);

            // alert("Data Loaded Successfully!");
          }
        })
        .catch(function (error) {
          if (error.response) {
            alert("ERROR");
          }
        });
    } else {
      alert("Access Token Invalid");
    }
  }, []);

  const Controls = () => {
    if (state.map) {
      var drawnItems = new L.FeatureGroup();
      state.map.addLayer(drawnItems);
      var drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems,
        },
      });
      var toolbar = L.Toolbar();
      toolbar.addToolbar(state.map);
      state.map.addControl(drawControl);
    }
  };

  function LocationMarker() {
    const map = useMapEvents({
      dblclick() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        setLocation([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    return position === null ? null : (
      <Marker position={position} icon={myIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  function geoFencing() {
    //console.log("clicked geofencing button");
    const in_or_not = isInside(Polygons, Polygons.length, Location);
    if (in_or_not) alert("Is in the Fence");
    else alert("Not in the fence");
  }

  function onSegment(p, q, r) {
    if (
      q[0] <= Math.max(p[0], r[0]) &&
      q[0] >= Math.min(p[0], r[0]) &&
      q[1] <= Math.max(p[1], r[1]) &&
      q[1] >= Math.min(p[1], r[1])
    ) {
      return true;
    }
    return false;
  }

  function orientation(p, q, r) {
    let val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);

    if (val == 0) {
      return 0; // collinear
    }
    return val > 0 ? 1 : 2; // clock or counterclock wise
  }

  function doIntersect(p1, q1, p2, q2) {
    // Find the four orientations needed for
    // general and special cases
    let o1 = orientation(p1, q1, p2);
    let o2 = orientation(p1, q1, q2);
    let o3 = orientation(p2, q2, p1);
    let o4 = orientation(p2, q2, q1);

    // General case
    if (o1 != o2 && o3 != o4) {
      return true;
    }

    // Special Cases
    // p1, q1 and p2 are collinear and
    // p2 lies on segment p1q1
    if (o1 == 0 && onSegment(p1, p2, q1)) {
      return true;
    }

    // p1, q1 and p2 are collinear and
    // q2 lies on segment p1q1
    if (o2 == 0 && onSegment(p1, q2, q1)) {
      return true;
    }

    // p2, q2 and p1 are collinear and
    // p1 lies on segment p2q2
    if (o3 == 0 && onSegment(p2, p1, q2)) {
      return true;
    }

    // p2, q2 and q1 are collinear and
    // q1 lies on segment p2q2
    if (o4 == 0 && onSegment(p2, q1, q2)) {
      return true;
    }

    // Doesn't fall in any of the above cases
    return false;
  }

  function isInside(polygon, n, p) {
    // There must be at least 3 vertices in polygon[]
    if (n < 3) {
      return false;
    }

    // Create a point for line segment from p to infinite
    let extreme = [INF, p[1]];

    // Count intersections of the above line
    // with sides of polygon
    let count = 0,
      i = 0;
    do {
      let next = (i + 1) % n;

      // Check if the line segment from 'p' to
      // 'extreme' intersects with the line
      // segment from 'polygon[i]' to 'polygon[next]'
      if (doIntersect(polygon[i], polygon[next], p, extreme)) {
        // If the point 'p' is colinear with line
        // segment 'i-next', then check if it lies
        // on segment. If it lies, return true, otherwise false
        if (orientation(polygon[i], p, polygon[next]) == 0) {
          return onSegment(polygon[i], p, polygon[next]);
        }

        count++;
      }
      i = next;
    } while (i != 0);

    // Return true if count is odd, false otherwise
    return count % 2 == 1; // Same as (count%2 == 1)
  }

  const _onCreated = (e) => {
    const { layerType, layer } = e;
    if (layerType === "polygon" || layerType === "rectangle") {
      const { _leaflet_id } = layer;
      setMapLayer((layers) => [
        ...layers,
        { id: _leaflet_id, latlng: layer.getLatLngs()[0] },
      ]);
    }
    console.log(e);

    if (layerType === "marker") {
      const { _leaflet_id } = layer;
      console.log("Marker Dropped");
      setPoints((layers) => [
        ...layers,
        { id: _leaflet_id, latlng: layer.getLatLng() },
      ]);
      setFormData((prevData) => ({
        ...prevData,
        lat: layer.getLatLng().lat,
        lng: layer.getLatLng().lng,
      }));
      var mybtb = document.getElementById("myBtn");
      mybtb.click();
    }
  };

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    console.log("editing polygons");
    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMapLayer((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
    console.log("updated");

    //for point

    // console.log("editing point");
    // Object.values(_layers).map(({ _leaflet_id, editing }) => {
    //   setPoints((layers) =>
    //     layers.map((l) =>
    //       l.id === _leaflet_id ? { ...l, latlng: { ...editing.latlng[0] } } : l
    //     )
    //   );
    // });
  };

  const _onDeleted = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;
    Object.values(_layers).map((_leaflet_id) => {
      setMapLayer((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
    console.log("deleted");
    setMapLayer(mapLayer);
    console.log(mapLayer);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      lat: null,
      lng: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    savePoint(formData.name, formData.description, {
      lat: formData.lat,
      lng: formData.lng,
    });

    setFormData({
      name: "",
      description: "",
      lat: null,
      lng: null,
    });
    window.location.reload();
  };

  const handleDelete = (data) => {
    deletePoint(data._id);
    window.location.reload();
  };

  var myIcon = L.icon({
    iconUrl:
      "https://cdn.discordapp.com/attachments/909801322436505600/933675374628438016/forest-fire.png",

    iconSize: [30, 30],
  });

  const toggleDrawerLeft = () => {
    setOpenLeft(!openLeft);
  };

  const toggleDrawerRight = (data) => {
    setOpenRight(!openRight);
    setInfoData(data);
  };

  const handleRightClose = () => {
    setInfoData(null);
    // setOpenRight(false);
  };

  return (
    <>
      {/* <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css"
      /> */}
      {/* {pointsData !== null ? JSON.stringify(pointsData) : null} */}
      <MapContainer
        style={{ height: "90vh" }}
        center={[18.5204, 73.8567]}
        zoom={13}
        scrollWheelZoom={true}
        doubleClickZoom={false}
        whenCreated={(map) => {
          setState((prevState) => ({
            ...prevState,
            map: map,
          }));
          Controls();
        }}
      >
        <LayersControl position="bottomright">
          <LayersControl.BaseLayer checked name="OSM">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="MapTiler Street Map">
            <TileLayer
              attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
              url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ZwUohaY0M43TShPZZw1q"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="MapTiler Topography">
            <TileLayer
              attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
              url="https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=ZwUohaY0M43TShPZZw1q"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <FeatureGroup>
          <EditControl
            onCreated={_onCreated}
            onEdited={_onEdited}
            onDeleted={_onDeleted}
            position="topright"
          ></EditControl>
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
        {pointsData !== null
          ? pointsData.map((p) => {
              return (
                <>
                  <Marker
                    position={[p.latlng[0].lat, p.latlng[0].lng]}
                    icon={myIcon}
                    key={p._id}
                  >
                    <Popup closeButton={true} offset={L.point(0, -8)}>
                      <>
                        <center>
                          <b>
                            <h5>{p.name}</h5>
                          </b>
                          <br></br>
                          <button onClick={() => toggleDrawerRight(p)}>
                            More Info
                          </button>
                          <br></br>
                          <br></br>
                          {p.email ===
                          JSON.parse(localStorage.getItem("user")).email ? (
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(p)}
                            >
                              Delete
                            </button>
                          ) : null}
                        </center>
                      </>
                    </Popup>
                  </Marker>
                </>
              );
            })
          : null}
        <Sidebar
          anchor={"left"}
          open={openLeft}
          toggleDrawer={toggleDrawerLeft}
        >
          <div className="left-sidebar" style={{ backgroundColor: "#212121" }}>
            <div
              style={{
                position: "fixed",
                backgroundColor: "#212121",
                boxSizing: "border-box",
                width: "30vw",
              }}
            >
              <h1
                style={{
                  color: "white",
                  boxSizing: "border-box",
                }}
              >
                All Tags
              </h1>
            </div>
            <ul style={{ paddingTop: "10vh" }}>
              {pointsData !== null
                ? pointsData.map((e, index) => {
                    return (
                      <div
                        key={e.name + "-" + index}
                        style={{ backgroundColor: "#212121" }}
                      >
                        <li>
                          <div>
                            <ScaleText>
                              <h2>{e.latlng[0].lat + " " + e.latlng[0].lng}</h2>
                              <h5>{e.name}</h5>
                              <h5>{e.email}</h5>
                              <h5>{e.username}</h5>
                            </ScaleText>
                          </div>
                        </li>
                      </div>
                    );
                  })
                : null}
            </ul>
          </div>
        </Sidebar>

        <Sidebar
          anchor={"right"}
          open={openRight}
          toggleDrawer={toggleDrawerRight}
        >
          <div className="right-sidebar">
            <h1 style={{ color: "white" }}>Info</h1>

            <div className="tags-info" style={{ fontSize: "40px" }}>
              {infoData !== null ? JSON.stringify(infoData.description) : null}
            </div>
          </div>
        </Sidebar>
        <Button
          variant="contained"
          className="left-sidebar-button"
          style={{
            zIndex: "1000",
            backgroundColor: "#212121",
            borderRadius: "0px 15px 15px 0px",
          }}
          onClick={toggleDrawerLeft}
        >
          All Tags
        </Button>
      </MapContainer>
      {/* <pre>{JSON.stringify(mapLayer, 0, 2)}</pre> */}
      {/* <pre>{JSON.stringify(Points, 0, 2)}</pre> */}

      {/* MODAL */}
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        id="myBtn"
        style={{ display: "none" }}
      >
        Launch static backdrop modal
      </button>

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Add Point
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="name" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-describedby="nameHelp"
                  />
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    id="lat"
                    value={formData.lat}
                    placeholder="Latitude"
                    aria-label="Latitude"
                  />
                  <input
                    type="number"
                    id="lng"
                    value={formData.lng}
                    class="form-control"
                    placeholder="Longitude"
                    aria-label="Longitude"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortestRoutes;
