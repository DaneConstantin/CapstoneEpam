document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const propertyId = params.get("id");

    try {
        const response = await fetch("properties.json");
        const properties = await response.json();
        const property = properties.find(p => p.id == propertyId);

        if (!property) {
            document.getElementById("property-details").innerHTML = "<p>Property not found.</p>";
            return;
        }

        document.getElementById("property-details").innerHTML = `
        <div class="property-header">
           <a href="gallery.html" class="back-button">Back to listings</a>
            <h1>${property.title}</h1>
            </div>
       <div class="empty-space"></div>
          
             <img src="${property.image}" alt="${property.title}">
            
            
 <div class="property-location">
                <div class="location-details"><h3>Location:</h3> ${property.address}</div>
                
                  <div id="map" class="contact-map"></div>
            </div>
           
           
 <div class="property-description">${property.description}</div>
            <div class="empty-space"></div>
           

            <div class="property-specs">
            
           
            
           
                <div class="spec-item">
                    <div class="spec-value">€${property.price.toLocaleString("en-IE")}</div>
                    <div class="spec-label">Price</div>
                </div>
                <div class="spec-item">
                    <div class="spec-value">${property.size} m²</div>
                    <div class="spec-label">Size</div>
                </div>
                <div class="spec-item">
                    <div class="spec-value">${property.bedrooms}</div>
                    <div class="spec-label">Bedrooms</div>
                </div>
                <div class="spec-item">
                    <div class="spec-value">${property.bathrooms}</div>
                    <div class="spec-label">Bathrooms</div>
                </div>
           
            </div>
        `;

        const lat = property.latitude || 44.4268; 
        const lng = property.longitude || 26.1025;

        const map = L.map('map').setView([lat, lng], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const marker = L.marker([lat, lng]).addTo(map);

        marker.bindPopup(`
            <strong>${property.title} </strong><br>
        ${property.address}<br>
           Romania
        `).openPopup();

    } catch (error) {
        console.error("Error loading property:", error);
    }




});