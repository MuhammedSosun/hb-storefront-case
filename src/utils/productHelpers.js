export const applyFilters = (products, { searchTerm, filters, sortBy }) => {
  let result = [...products];

  const search = searchTerm?.trim().toLowerCase();

  if (search && search.length >= 2) {
    result = result.filter((product) =>
      product.name.toLowerCase().includes(search),
    );
  }

  if (filters.brand) {
    result = result.filter((product) => product.brand === filters.brand);
  }

  if (filters.color) {
    result = result.filter((product) => product.color === filters.color);
  }

  switch (sortBy) {
    case "lowestPrice":
      result.sort((a, b) => a.price - b.price);
      break;

    case "highestPrice":
      result.sort((a, b) => b.price - a.price);
      break;

    case "newest-az":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "newest-za":
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;

    default:
      break;
  }

  return result;
};
