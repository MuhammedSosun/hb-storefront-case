export const applyFilters = (products, { searchTerm, filters, sortBy }) => {
  let result = [...products];

  // 1. Arama Mantığı (En az 2 karakter kuralı)
  if (searchTerm && searchTerm.length >= 2) {
    result = result.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // 2. Marka Filtresi
  if (filters.brand) {
    result = result.filter((product) => product.brand === filters.brand);
  }

  // 3. Renk Filtresi
  if (filters.color) {
    result = result.filter((product) => product.color === filters.color);
  }

  // 4. Sıralama Mantığı
  switch (sortBy) {
    case 'lowestPrice':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'highestPrice':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'newest-az':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'newest-za':
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  return result;
};