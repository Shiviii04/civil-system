// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if(!currentUser){
    window.location.href = 'login.html';
}

// Logout
const logout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Handle complaint submission (on report-issue page)
const complaintForm = document.getElementById('complaintForm');
if(complaintForm){
    complaintForm.addEventListener('submit', function(e){
        e.preventDefault();
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const location = document.getElementById('location').value;

        let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        complaints.push({
            userEmail: currentUser.email,
            category,
            description,
            location,
            status: 'Pending'
        });
        localStorage.setItem('complaints', JSON.stringify(complaints));
        alert('Complaint submitted!');
        window.location.href = 'dashboard.html';
    });
}

// Display complaints on dashboard
const complaintsList = document.getElementById('complaintsList');
if(complaintsList){
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]')
        .filter(c => c.userEmail === currentUser.email);
    complaintsList.innerHTML = complaints.map(c =>
        `<div>
            <b>${c.category}</b>: ${c.description} <br>
            Location: ${c.location} <br>
            Status: ${c.status} <hr>
        </div>`
    ).join('');
}

// Map view
if(document.getElementById('map')){
    const map = L.map('map').setView([20.5937, 78.9629], 5); // India center
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);

    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    complaints.forEach(c => {
        L.marker([20.5937, 78.9629]).addTo(map)
            .bindPopup(`<b>${c.category}</b><br>${c.description}`);
    });
}
