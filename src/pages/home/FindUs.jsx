import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const icon = L.icon({
	iconRetinaUrl: iconRetina,
	iconUrl: iconMarker,
	shadowUrl: iconShadow,
	iconSize: [22, 32],
	iconAnchor: [16, 32],
	popupAnchor: [0, -32],
});


const FindUs = () => {
	return (
		<div className="w-full p-10 bg-green-50">
			<MapContainer
				center={[51.505, -0.09]}
				zoom={13}
				style={{ height: "400px", width: "100%" }}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				<Marker position={[51.505, -0.09]} icon={icon}>
					<Popup>{"Global Palate"}</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default FindUs;
