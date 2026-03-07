import { createSlice } from "@reduxjs/toolkit";
import { applyFilters } from "../utils/productHelpers";

const initialState = {
  items: [],
  filteredItems: [],
  searchTerm: "",
  filters: { brand: null, color: null },
  sortBy: "",
  currentPage: 1,
  itemsPerPage: 12,
};

const updateFilteredItems = (state) => {
  state.filteredItems = applyFilters(state.items, state);
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      updateFilteredItems(state);
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
      updateFilteredItems(state);
    },

    setBrandFilter: (state, action) => {
      state.filters.brand =
        action.payload === state.filters.brand ? null : action.payload;

      state.currentPage = 1;
      updateFilteredItems(state);
    },

    setColorFilter: (state, action) => {
      state.filters.color =
        action.payload === state.filters.color ? null : action.payload;

      state.currentPage = 1;
      updateFilteredItems(state);
    },

    setSortOrder: (state, action) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
      updateFilteredItems(state);
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setProducts,
  setSearchTerm,
  setBrandFilter,
  setColorFilter,
  setSortOrder,
  setCurrentPage,
} = productSlice.actions;

export default productSlice.reducer;
