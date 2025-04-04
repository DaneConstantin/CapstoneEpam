export function applySearchFilter(items, searchQuery) {
    if (!searchQuery) return items;

    return items.filter(item =>
        item.title.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery) ||
        item.address.toLowerCase().includes(searchQuery) ||
        item.features.some(feature => feature.toLowerCase().includes(searchQuery)) ||
        item.type.toLowerCase().includes(searchQuery)
    );
}

export function applyTypeFilter(items, filterType) {
    if (filterType === 'all') return items;
    return items.filter(item => item.type === filterType);
}

export function applySortFilter(items, sortType) {
    const sortedItems = [...items];

    switch (sortType) {
        case 'price-asc':
            return sortedItems.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sortedItems.sort((a, b) => b.price - a.price);
        case 'size-asc':
            return sortedItems.sort((a, b) => a.size - b.size);
        case 'size-desc':
            return sortedItems.sort((a, b) => b.size - a.size);
        default:
            return sortedItems.sort((a, b) => a.id - b.id);
    }
}