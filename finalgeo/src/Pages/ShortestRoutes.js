import React, { useEffect, useState } from "react";
import * as L from "leaflet";
import {
	MapContainer,
	LayersControl,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
} from "react-leaflet";
import "leaflet-routing-machine";
import { SearchControl, OpenStreetMapProvider } from "react-leaflet-geosearch";
import "leaflet-geosearch/assets/css/leaflet.css";

import "./GeoTag.css";

const GeoTag = () => {
	const [state, setState] = useState({
		map: null,
		markers: [],
		flag: false,
	});

	const GeoSearchControlElement = SearchControl;
	const prov = OpenStreetMapProvider();

	var myIcon = L.icon({
		iconUrl:
			"https://cdn.discordapp.com/attachments/909801322436505600/933675374628438016/forest-fire.png",

		iconSize: [30, 30],
	});

	var carIcon = L.icon({
		iconUrl:
			"https://cdn.discordapp.com/attachments/511846277554896926/976448671484899348/NicePng_marker-circle-png_1015767.png",
		iconSize: [30, 30],
	});

	function LocationMarker() {
		const map = useMapEvents({
			click(e) {
				// console.log(e.latlng);

				if (state.markers.length < 2) {
					setState((prevState) => ({
						...prevState,
						markers: [...prevState.markers, [e.latlng.lat, e.latlng.lng]],
					}));
				}
			},
		});

		return state.markers !== null
			? state.markers.map((m, index) => (
					<>
						<Marker position={m} icon={myIcon}>
							<Popup>Point {index}</Popup>
						</Marker>
					</>
			  ))
			: null;
	}

	const resetMarkers = () => {
		setState((prevState) => ({
			...prevState,
			markers: [],
			flag: false,
		}));
		window.location.reload();
	};

	const getRoute = (map) => {
		var marker = L.marker(state.markers[0], { icon: carIcon }).addTo(map);
		L.Routing.control({
			waypoints: [L.latLng(state.markers[0]), L.latLng(state.markers[1])],
		})
			.on("routesfound", function (e) {
				var routes = e.routes;
				console.log(routes);

				e.routes[0].coordinates.forEach(function (coord, index) {
					setTimeout(function () {
						marker.setLatLng([coord.lat, coord.lng]);
					}, 100 * index);
				});
			})
			.addTo(map);
	};

	const setFlag = (val) => {
		setState((prevState) => ({
			...prevState,
			flag: val,
		}));
	};

	return (
		<>
			{/* {state.markers !== null ? JSON.stringify(state.markers) : null} */}
			<MapContainer
				style={{ height: "92vh" }}
				center={[18.5204, 73.8567]}
				zoom={13}
				scrollWheelZoom={true}
				doubleClickZoom={false}
				whenCreated={(map) => {
					setState((prevState) => ({
						...prevState,
						map: map,
					}));
				}}
			>
				<LayersControl position="topright">
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

				<LocationMarker />

				{state.markers.length > 0 ? (
					<div
						className="container-fluid"
						style={{ position: "absolute", bottom: 15, zIndex: 314159 }}
					>
						<button className="btn btn-danger" onClick={resetMarkers}>
							Reset
						</button>

						{state.markers.length > 1 ? (
							<button
								className="btn btn-primary ms-2"
								onClick={() => {
									setFlag(true);
									getRoute(state.map);
								}}
							>
								Get Route
							</button>
						) : null}
					</div>
				) : null}
			</MapContainer>
		</>
	);
};

export default GeoTag;
