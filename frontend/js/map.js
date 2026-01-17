// ===============================
// MAP INITIALIZATION
// ===============================
const map = L.map("map").setView([21.1466, 79.0888], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

// ===============================
// ICONS (STATUS WISE)
// ===============================
function getIcon(status) {
  const iconUrls = {
    Open: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    "In Progress": "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    Resolved: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    Viewed: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  };

  return new L.Icon({
    iconUrl: iconUrls[status] || iconUrls["Open"],
    iconSize: [32, 32],
  });
}

// ===============================
// DUMMY DATA (ABHI KE LIYE)
// ===============================
let allComplaints = [
  {
    lat: 21.145,
    lng: 79.088,
    status: "Open",
    category: "Road",
  },
  {
    lat: 21.148,
    lng: 79.082,
    status: "Resolved",
    category: "Garbage",
  },
  {
    lat: 21.142,
    lng: 79.091,
    status: "In Progress",
    category: "Street Light",
  },
  {
    lat: 21.150,
    lng: 79.095,
    status: "Viewed",
    category: "Road",
  },
];

// ===============================
// MARKER HANDLING
// ===============================
let markers = [];

function showMarkers(data) {
  // remove old markers
  markers.forEach((m) => map.removeLayer(m));
  markers = [];

  data.forEach((c) => {
    const marker = L.marker([c.lat, c.lng], {
      icon: getIcon(c.status),
    })
      .addTo(map)
      .bindPopup(
        `<b>Status:</b> ${c.status}<br><b>Category:</b> ${c.category}`
      );

    markers.push(marker);
  });
}

// ===============================
// SUMMARY UPDATE
// ===============================
function updateSummary(data) {
  document.getElementById("total").innerText = data.length;

  document.getElementById("open").innerText = data.filter(
    (c) => c.status === "Open"
  ).length;

  document.getElementById("progress").innerText = data.filter(
    (c) => c.status === "In Progress"
  ).length;

  document.getElementById("resolved").innerText = data.filter(
    (c) => c.status === "Resolved"
  ).length;

  document.getElementById("viewed").innerText = data.filter(
    (c) => c.status === "Viewed"
  ).length;
}

// ===============================
// FILTER LOGIC
// ===============================
function applyFilters() {
  const status = document.getElementById("statusFilter").value;
  const category = document.getElementById("categoryFilter").value;

  let filtered = allComplaints;

  if (status !== "all") {
    filtered = filtered.filter((c) => c.status === status);
  }

  if (category !== "all") {
    filtered = filtered.filter((c) => c.category === category);
  }

  showMarkers(filtered);
  updateSummary(filtered);
}

// ===============================
// APPLY BUTTON EVENT
// ===============================
document
  .getElementById("applyFilter")
  .addEventListener("click", applyFilters);

// ===============================
// INITIAL LOAD
// ===============================
showMarkers(allComplaints);
updateSummary(allComplaints);
