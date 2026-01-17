let map = L.map("map").setView([21.1458, 79.0882], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

let marker = L.marker([21.1458, 79.0882]).addTo(map);

// Current Location
function useCurrentLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    map.setView([lat, lng], 15);
    marker.setLatLng([lat, lng]);

    document.getElementById("address").value =
      `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
  });
}

// Submit (frontend demo)
function submitReport() {
  alert("Complaint submitted successfully (frontend demo)");
}
