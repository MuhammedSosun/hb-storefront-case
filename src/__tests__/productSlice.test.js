import reducer, {
  setProducts,
  setSortOrder,
  setSearchTerm,
} from "../store/productSlice";

describe("Product Slice Testleri", () => {
  const initialState = {
    items: [],
    filteredItems: [],
    sortBy: "",
    searchTerm: "",
    filters: { brand: null, color: null },
    currentPage: 1,
    itemsPerPage: 12,
  };

  test("setProducts ürünleri state'e yüklemeli", () => {
    const mockProducts = [{ id: 1, name: "Test Ürün" }];

    const nextState = reducer(initialState, setProducts(mockProducts));

    expect(nextState.items).toHaveLength(1);
    expect(nextState.filteredItems).toHaveLength(1);
  });

  test("setSortOrder sortBy değerini değiştirmeli", () => {
    const nextState = reducer(initialState, setSortOrder("lowestPrice"));

    expect(nextState.sortBy).toBe("lowestPrice");
  });

  test("setSearchTerm searchTerm değerini değiştirmeli", () => {
    const nextState = reducer(initialState, setSearchTerm("iphone"));

    expect(nextState.searchTerm).toBe("iphone");
  });

  test("arama yapılınca currentPage 1 olmalı", () => {
    const state = {
      ...initialState,
      currentPage: 3,
    };

    const nextState = reducer(state, setSearchTerm("iphone"));

    expect(nextState.currentPage).toBe(1);
  });
});
