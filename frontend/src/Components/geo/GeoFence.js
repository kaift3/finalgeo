// import React, { useEffect, useState } from "react";
// import {
// 	MapContainer,
// 	TileLayer,
// 	Marker,
// 	Popup,
// 	LayersControl,
// 	useMapEvents,
// 	FeatureGroup,
// 	Polygon,
// } from "react-leaflet";
// import { SearchControl, OpenStreetMapProvider } from "react-leaflet-geosearch";
// import { EditControl } from "react-leaflet-draw";
// import { FullscreenControl } from "react-leaflet-fullscreen";

// import "leaflet-draw/dist/leaflet.draw.css";
// import "leaflet/dist/leaflet.css";
// import "leaflet-geosearch/assets/css/leaflet.css";

// import "../../Assets/css/GeoFence.css";
// import { useRef } from "react";
// import L, { icon, polygon, popup } from "leaflet";
// import Sidebar from "../layout/Sidebar";
// import { Button } from "@mui/material";

// import tags from "../../Data/List";
// // import { Button } from "react-bootstrap";

// //L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
// 	iconRetinaUrl:
// 		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
// 	iconUrl:
// 		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
// 	shadowUrl:
// 		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
// });
// const markerIcon = new L.icon({
// 	iconRetinaUrl:
// 		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
// 	iconUrl:
// 		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
// 	shadowUrl:
// 		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
// 	iconAnchor: [17, 45], //[left/right,top bottom]
// 	popupAnchor: [-5, -30],
// });

// export default function GeoFence() {
// 	const pos = [18.5204, 73.8567];
// 	const mapRef = useRef();
// 	const [mapLayer, setMapLayer] = useState([]);
// 	const [Polygons, setPolygons] = useState([]); //polygons contain all the coordinates of a polygon/fence
// 	const [Points, setPoints] = useState([]);
// 	const [Location, setLocation] = useState([]);
// 	const [map, setMap] = useState();

// 	let INF = 10000;

// 	useEffect(() => {
// 		let latlngarray = [];
// 		mapLayer.forEach((item) => {
// 			item.latlngs.forEach((coords) => {
// 				latlngarray.push([coords.lat, coords.lng]);
// 			});
// 			//setPolygons(item.latlngs);
// 		});
// 		console.log(latlngarray);
// 		setPolygons(latlngarray);
// 		//console.log(Polygons);
// 	}, [mapLayer, setMapLayer]); //run everytime maplayer changes

// 	/////////
// 	const [position, setPosition] = useState(null);
// 	const [openLeft, setOpenLeft] = useState(false);

// 	const toggleDrawerLeft = () => {
// 		setOpenLeft(!openLeft);
// 	};

// 	function LocationMarker() {
// 		const map = useMapEvents({
// 			dblclick() {
// 				map.locate();
// 			},
// 			locationfound(e) {
// 				setPosition(e.latlng);
// 				setLocation([e.latlng.lat, e.latlng.lng]);

// 				//console.log(e.latlng);
// 				map.flyTo(e.latlng, map.getZoom());
// 			},
// 		});

// 		// useEffect(() => {
// 		//   console.log(Location);
// 		// }, [Location]);

// 		return position === null ? null : (
// 			<Marker position={position} icon={markerIcon}>
// 				<Popup>You are here</Popup>
// 			</Marker>
// 		);
// 	}

// 	function locateUser() {
// 		console.log("locateUser called");
// 		const mapp = mapp.locate().locationfound((e) => {
// 			console.log("location found");
// 			setPosition(e.latlng);
// 			setLocation([e.latlng.lat, e.latlng.lng]); //console.log(e.latlng);
// 			mapp.flyTo(e.latlng, mapp.getZoom());
// 		});
// 		return position === null ? null : (
// 			<Marker position={position} icon={markerIcon}>
// 				<Popup>You are here</Popup>
// 			</Marker>
// 		);
// 	}

// 	var myvar;
// 	function LiveLocation() {
// 		myvar = setInterval(locateUser, 1000);
// 	}

// 	//Geo Fencing
// 	function geoFencing() {
// 		//console.log("clicked geofencing button");
// 		const in_or_not = isInside(Polygons, Polygons.length, Location);
// 		if (in_or_not) alert("Is in the Fence");
// 		else alert("Not in the fence");
// 	}

// 	// Given three collinear points p, q, r,
// 	// the function checks if point q lies
// 	// on line segment 'pr'
// 	function onSegment(p, q, r) {
// 		if (
// 			q[0] <= Math.max(p[0], r[0]) &&
// 			q[0] >= Math.min(p[0], r[0]) &&
// 			q[1] <= Math.max(p[1], r[1]) &&
// 			q[1] >= Math.min(p[1], r[1])
// 		) {
// 			return true;
// 		}
// 		return false;
// 	}

// 	// To find orientation of ordered triplet (p, q, r).
// 	// The function returns following values
// 	// 0 --> p, q and r are collinear
// 	// 1 --> Clockwise
// 	// 2 --> Counterclockwise
// 	function orientation(p, q, r) {
// 		let val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);

// 		if (val == 0) {
// 			return 0; // collinear
// 		}
// 		return val > 0 ? 1 : 2; // clock or counterclock wise
// 	}

// 	// The function that returns true if
// 	// line segment 'p1q1' and 'p2q2' intersect.
// 	function doIntersect(p1, q1, p2, q2) {
// 		// Find the four orientations needed for
// 		// general and special cases
// 		let o1 = orientation(p1, q1, p2);
// 		let o2 = orientation(p1, q1, q2);
// 		let o3 = orientation(p2, q2, p1);
// 		let o4 = orientation(p2, q2, q1);

// 		// General case
// 		if (o1 != o2 && o3 != o4) {
// 			return true;
// 		}

// 		// Special Cases
// 		// p1, q1 and p2 are collinear and
// 		// p2 lies on segment p1q1
// 		if (o1 == 0 && onSegment(p1, p2, q1)) {
// 			return true;
// 		}

// 		// p1, q1 and p2 are collinear and
// 		// q2 lies on segment p1q1
// 		if (o2 == 0 && onSegment(p1, q2, q1)) {
// 			return true;
// 		}

// 		// p2, q2 and p1 are collinear and
// 		// p1 lies on segment p2q2
// 		if (o3 == 0 && onSegment(p2, p1, q2)) {
// 			return true;
// 		}

// 		// p2, q2 and q1 are collinear and
// 		// q1 lies on segment p2q2
// 		if (o4 == 0 && onSegment(p2, q1, q2)) {
// 			return true;
// 		}

// 		// Doesn't fall in any of the above cases
// 		return false;
// 	}

// 	// Returns true if the point p lies
// 	// inside the polygon[] with n vertices
// 	function isInside(polygon, n, p) {
// 		// There must be at least 3 vertices in polygon[]
// 		if (n < 3) {
// 			return false;
// 		}

// 		// Create a point for line segment from p to infinite
// 		let extreme = [INF, p[1]];

// 		// Count intersections of the above line
// 		// with sides of polygon
// 		let count = 0,
// 			i = 0;
// 		do {
// 			let next = (i + 1) % n;

// 			// Check if the line segment from 'p' to
// 			// 'extreme' intersects with the line
// 			// segment from 'polygon[i]' to 'polygon[next]'
// 			if (doIntersect(polygon[i], polygon[next], p, extreme)) {
// 				// If the point 'p' is colinear with line
// 				// segment 'i-next', then check if it lies
// 				// on segment. If it lies, return true, otherwise false
// 				if (orientation(polygon[i], p, polygon[next]) == 0) {
// 					return onSegment(polygon[i], p, polygon[next]);
// 				}

// 				count++;
// 			}
// 			i = next;
// 		} while (i != 0);

// 		// Return true if count is odd, false otherwise
// 		return count % 2 == 1; // Same as (count%2 == 1)
// 	}

// 	// const testPoly = [
// 	//   [18.525493623623678, 73.85469737513199],
// 	//   [18.51663415837991, 73.8490989708613],
// 	//   [18.515852418297065, 73.862528273318],
// 	// ];

// 	const testPoly = [
// 		[18.521547464087433, 73.85760087494525],
// 		[18.520423744610582, 73.85524817115075],
// 		[18.519092371548023, 73.85741197165932],
// 	];

// 	// const testPoint = [18.5204, 73.8567];

// 	// var ans = ray_casting(testPoint, testPoly);
// 	// console.log(ans);

// 	const _onCreated = (e) => {
// 		const { layerType, layer } = e;
// 		if (layerType === "polygon" || layerType === "rectangle") {
// 			const { _leaflet_id } = layer;
// 			setMapLayer((layers) => [
// 				...layers,
// 				{ id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
// 			]);
// 		}
// 		console.log(e);
// 		// if (layerType === "marker") {
// 		//   const { _leaflet_id } = layer;
// 		//   console.log("Marker Dropped");
// 		//   setPoints((layers) => [
// 		//     ...layers,
// 		//     { id: _leaflet_id, latlng: layer.getLatLng() },
// 		//   ]);
// 		// }
// 	};

// 	const _onEdited = (e) => {
// 		console.log(e);
// 		const {
// 			layers: { _layers },
// 		} = e;

// 		console.log("editing polygons");
// 		Object.values(_layers).map(({ _leaflet_id, editing }) => {
// 			setMapLayer((layers) =>
// 				layers.map((l) =>
// 					l.id === _leaflet_id
// 						? { ...l, latlngs: { ...editing.latlngs[0] } }
// 						: l
// 				)
// 			);
// 		});
// 		console.log("updated");

// 		//for point

// 		// console.log("editing point");
// 		// Object.values(_layers).map(({ _leaflet_id, editing }) => {
// 		//   setPoints((layers) =>
// 		//     layers.map((l) =>
// 		//       l.id === _leaflet_id ? { ...l, latlng: { ...editing.latlng[0] } } : l
// 		//     )
// 		//   );
// 		// });
// 	};

// 	const _onDeleted = (e) => {
// 		console.log(e);
// 		const {
// 			layers: { _layers },
// 		} = e;
// 		Object.values(_layers).map((_leaflet_id) => {
// 			setMapLayer((layers) => layers.filter((l) => l.id !== _leaflet_id));
// 		});
// 		setMapLayer(mapLayer);
// 		console.log("deleted");
// 	};

// 	//locate current position
// 	// const locateOptions = {
// 	//   position: "topright",
// 	//   strings: {
// 	//     title: "Show me where I am, yo!",
// 	//   },
// 	//   onActivate: () => {}, // callback before engine starts retrieving locations
// 	// };
// 	const GeoSearchControlElement = SearchControl;
// 	const prov = OpenStreetMapProvider();

// 	return (
// 		<>
// 			<MapContainer
// 				className="mymap"
// 				id="mymap"
// 				style={{ width: "100%", height: "90vh" }}
// 				center={pos}
// 				zoom={15}
// 				scrollWheelZoom={true}
// 				doubleClickZoom={false}
// 				// whenCreated={(map) => {
// 				//   setMap((prevState) => ({
// 				//     ...prevState,
// 				//     map: map,
// 				//   }));
// 				// }}
// 			>
// 				<LayersControl position="bottomright">
// 					<LayersControl.BaseLayer name="OSM">
// 						<TileLayer
// 							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// 							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// 						/>
// 					</LayersControl.BaseLayer>
// 					<LayersControl.BaseLayer checked name="MapTiler Street Map">
// 						<TileLayer
// 							attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
// 							url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ZwUohaY0M43TShPZZw1q"
// 						/>
// 					</LayersControl.BaseLayer>
// 					<LayersControl.BaseLayer name="Google Map">
// 						<TileLayer
// 							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// 							url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga"
// 						/>
// 					</LayersControl.BaseLayer>
// 					<LayersControl.BaseLayer name="MapTiler Topography">
// 						<TileLayer
// 							attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
// 							url="https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=ZwUohaY0M43TShPZZw1q"
// 						/>
// 					</LayersControl.BaseLayer>
// 					<LayersControl.BaseLayer name="MapTiler Hybrid">
// 						<TileLayer
// 							attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
// 							url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=ZwUohaY0M43TShPZZw1q"
// 						/>
// 					</LayersControl.BaseLayer>
// 				</LayersControl>
// 				<Sidebar
// 					anchor={"left"}
// 					open={openLeft}
// 					toggleDrawer={toggleDrawerLeft}
// 				>
// 					<div className="left-sidebar" style={{ backgroundColor: "#212121" }}>
// 						<div
// 							style={{
// 								position: "fixed",
// 								backgroundColor: "#212121",
// 								boxSizing: "border-box",
// 								width: "30vw",
// 							}}
// 						>
// 							<h1
// 								style={{
// 									color: "white",
// 									boxSizing: "border-box",
// 								}}
// 							>
// 								All Fences
// 							</h1>
// 						</div>
// 						<ul style={{ paddingTop: "10vh" }}>
// 							{tags.map((e, index) => {
// 								return (
// 									<div
// 										key={e.name + "-" + index}
// 										style={{ backgroundColor: "#212121" }}
// 									>
// 										<li>
// 											<div>
// 												<h2>{e.location}</h2>
// 												<h5>{e.name}</h5>
// 											</div>
// 										</li>
// 									</div>
// 								);
// 							})}
// 						</ul>
// 					</div>
// 				</Sidebar>
// 				<Button
// 					variant="contained"
// 					className="left-sidebar-button"
// 					style={{
// 						zIndex: "1000",
// 						backgroundColor: "#212121",
// 						borderRadius: "0px 15px 15px 0px",
// 					}}
// 					onClick={toggleDrawerLeft}
// 				>
// 					All Fences
// 				</Button>

// 				<FeatureGroup>
// 					<EditControl
// 						onCreated={_onCreated}
// 						onEdited={_onEdited}
// 						onDeleted={_onDeleted}
// 						position="topright"
// 						// draw={{
// 						//   rectangle: true,
// 						//   polyline: false,
// 						//   circle: false,
// 						//   circlemarker: false,
// 						//   marker: true,
// 						// }}
// 					></EditControl>
// 					{/* <Polygon
//             positions={testPoly}
//           /> */}
// 				</FeatureGroup>

// 				{/* <SetViewOnClick animateRef={animateRef} /> */}

// 				<button
// 					className="geofence-button"
// 					style={{ zIndex: "1000", position: "relative" }}
// 					onClick={geoFencing}
// 				>
// 					{/* <LocationMarker /> */}
// 				</button>

// 				<button
// 					className="geofence-button"
// 					style={{ zIndex: "1000", position: "relative" }}
// 					onClick={LiveLocation}
// 				>
// 					{/* <LocationMarker /> */}
// 				</button>
// 				<LocationMarker />
// 				<FullscreenControl position="topleft" />
// 				<GeoSearchControlElement
// 					provider={prov}
// 					showMarker={true}
// 					showPopup={false}
// 					maxMarkers={3}
// 					retainZoomLevel={false}
// 					animateZoom={true}
// 					autoClose={false}
// 					searchLabel={"Enter address, please"}
// 					keepResult={true}
// 					popupFormat={({ query, result }) => result.label}
// 				/>
// 			</MapContainer>
// 			{/* <div style={{ backgroundColor: "grey" }}>
//         <>Enable Animated Scrolling</>
//         <input
//           type="checkbox"
//           onChange={() => {
//             animateRef.current = !animateRef.current;
//           }}
//         />
//         {latlong}
//       </div> */}
// 			{/* <pre>{JSON.stringify(mapLayer, 0, 2)}</pre> */}
// 			{/* <pre>{JSON.stringify(Points, 0, 2)}</pre> */}
// 		</>
// 	);
// }

import React from "react";

const GeoFence = () => {
	return <>GeoFence</>;
};

export default GeoFence;
