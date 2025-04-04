import { renderGallery } from './galleryRenderer.js';
import { applySearchFilter, applySortFilter, applyTypeFilter } from './filters.js';

const galleryContainer = document.getElementById('gallery-container');
const paginationContainer = document.getElementById('pagination-container');
const loadMoreBtn = document.getElementById('load-more-btn');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const filterSelect = document.getElementById('filter-select');
const sortSelect = document.getElementById('sort-select');

async function fetchProperties() {
    try {
        const response = await fetch('./properties.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading properties:', error);
        return [];
    }
}

let state = {
    data: [],
    filteredData: [],
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 0,
    visibleItems: 10,
    filter: 'all',
    sort: 'default',
    searchQuery: ''
};

document.addEventListener('DOMContentLoaded', async () => {
    try {
       
        const urlParams = new URLSearchParams(window.location.search);
        const typeFromFilter = urlParams.get('type');

        const propertyData = await fetchProperties();
        state.data = propertyData;
        state.filteredData = [...propertyData];
        state.totalPages = Math.ceil(propertyData.length / state.itemsPerPage);


        if (typeFromFilter) {
            state.filter = typeFromFilter;
            filterSelect.value = typeFromFilter;
            applyFilters();
        } else {
            renderGallery(state, galleryContainer);
            renderPagination();
            updateLoadMoreButton();
        }

        setupEventListeners();
    } catch (error) {
        console.error('Error initializing gallery:', error);
        galleryContainer.innerHTML = `
            <div class="error-message">
                <p>Sorry, we couldn't load the property listings. Please try again later.</p>
            </div>
        `;
    }
});


function setupEventListeners() {
    // Search
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Filter 
    filterSelect.addEventListener('change', handleFilter);

    // Sort 
    sortSelect.addEventListener('change', handleSort);

    // Load more 
    loadMoreBtn.addEventListener('click', handleLoadMore);
}

function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    state.searchQuery = query;
    state.currentPage = 1;
    applyFilters();
}

function handleFilter() {
    state.filter = filterSelect.value;
    state.currentPage = 1;
    applyFilters();
}

function handleSort() {
    state.sort = sortSelect.value;
    applyFilters(false);
}

function handleLoadMore() {
    state.visibleItems += state.itemsPerPage;
    renderGallery(state, galleryContainer);
    updateLoadMoreButton();
    paginationContainer.style.display = 'none';

}


function applyFilters(resetVisibleItems = true) {
    let filtered = [...state.data];

    filtered = applySearchFilter(filtered, state.searchQuery);

    filtered = applyTypeFilter(filtered, state.filter);

    filtered = applySortFilter(filtered, state.sort);

    state.filteredData = filtered;
    state.totalPages = Math.ceil(filtered.length / state.itemsPerPage);

    if (resetVisibleItems) {
        state.visibleItems = state.itemsPerPage;
    }

    renderGallery(state, galleryContainer);
    renderPagination();
    updateLoadMoreButton();
}

function renderPagination() {
    paginationContainer.innerHTML = '';

    if (state.totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }

    paginationContainer.style.display = 'flex';

    const prevBtn = document.createElement('button');
    prevBtn.className = `page-btn ${state.currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = state.currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (state.currentPage > 1) {
            state.currentPage--;
            state.visibleItems = state.itemsPerPage;
            renderGallery(state, galleryContainer);
            renderPagination();
            updateLoadMoreButton();

        }
    });
    paginationContainer.appendChild(prevBtn);

    const maxVisiblePages = 5;
    let startPage = Math.max(1, state.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(state.totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === state.currentPage ? 'active' : ''}`;
        pageBtn.textContent = i.toString();
        pageBtn.addEventListener('click', () => {
            state.currentPage = i;
            state.visibleItems = state.itemsPerPage;
            renderGallery(state, galleryContainer);
            renderPagination();
            updateLoadMoreButton();

        });
        paginationContainer.appendChild(pageBtn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = `page-btn ${state.currentPage === state.totalPages ? 'disabled' : ''}`;
    nextBtn.textContent = 'Next';
    nextBtn.disabled = state.currentPage === state.totalPages;
    nextBtn.addEventListener('click', () => {
        if (state.currentPage < state.totalPages) {
            state.currentPage++;
            state.visibleItems = state.itemsPerPage;
            renderGallery(state, galleryContainer);
            renderPagination();
            updateLoadMoreButton();
        }
    });
    paginationContainer.appendChild(nextBtn);
}


function updateLoadMoreButton() {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const currentPageItems = state.filteredData.slice(startIndex);

    if (state.visibleItems >= currentPageItems.length || currentPageItems.length === 0) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}
