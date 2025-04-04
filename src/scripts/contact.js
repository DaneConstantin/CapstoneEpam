document.addEventListener('DOMContentLoaded', () => {

    const lat = 44.4268;
    const lng = 26.1025;

    const map = L.map('map').setView([lat, lng], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([lat, lng]).addTo(map);

    marker.bindPopup(`
        <strong>EPAM Demo Office </strong><br>
        123 Real Estate Street<br>
        Bucharest, Romania
    `).openPopup();
});