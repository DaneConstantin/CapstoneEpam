export function renderGallery(state, galleryContainer) {

    galleryContainer.innerHTML = '';

    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = Math.min(startIndex + state.visibleItems, state.filteredData.length);

    const currentItems = state.filteredData.slice(startIndex, endIndex);

    if (currentItems.length === 0) {
        galleryContainer.innerHTML = `
            <div class="no-results">
                <p>No properties found matching your criteria.</p>
            </div>
        `;
        return;
    }

    currentItems.forEach(item => {
        const card = createCard(item);
        galleryContainer.appendChild(card);
    });
}

function createCard(property) {
    const card = document.createElement('div');
    card.className = 'card';

    const formattedPrice = property.price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
    });

    const bedroomsText = `${property.bedrooms} ${property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}`;
    const bathroomsText = `${property.bathrooms} ${property.bathrooms === 1 ? 'Bath' : 'Baths'} `;

    card.innerHTML = `
    <div class="card-image">
            <a href="./property.html?id=${property.id}"><img loading="lazy" src="${property.image}" alt="${property.title}" loading="lazy"><a/>
            <div class="property-address"><img src="./utils/images/icons/location.svg" class="map-icon" /> ${property.address}</div>
            <div class="property-price">${formattedPrice}</div>
        </div>
        <div class="card-content">
            <h3><a href="./property.html?id=${property.id}">${property.title}</a></h3>

            <p class="property-description">${property.description}</p>
            <div class="property-details">
                <span class="detail"><img src="./utils/images/icons/bedroom.svg" /> ${bedroomsText}</span>
                <span class="detail"><img src="./utils/images/icons/bath.svg" /> ${bathroomsText}</span>
                <span class="detail"><img src="./utils/images/icons/size.svg" />${property.size.toLocaleString()} m&sup2;</span>
            </div>
            <div class="property-features">
                ${property.features.map(feature => `<span class="feature">${feature}</span>`).join('')}
            </div>
           
        </div>
`;
    return card;
}