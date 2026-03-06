import { createSlice } from '@reduxjs/toolkit';
import { applyFilters } from '../utils/productHelpers';

const initialState = {
  items: [],           // Orijinal 40 ürün
  filteredItems: [],   // Ekranda basılacak olanlar
  searchTerm: '',
  filters: { brand: null, color: null },
  sortBy: '',
  currentPage: 1,
  itemsPerPage: 12
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      state.filteredItems = applyFilters(state.items, state);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredItems = applyFilters(state.items, state);
      state.currentPage = 1; // Arama yapınca 1. sayfaya dön
    },
    setBrandFilter: (state, action) => {
      state.filters.brand = action.payload === state.filters.brand ? null : action.payload;
      state.filteredItems = applyFilters(state.items, state);
    },
    setColorFilter: (state, action) => {
      state.filters.color = action.payload === state.filters.color ? null : action.payload;
      state.filteredItems = applyFilters(state.items, state);
    },
    setSortOrder: (state, action) => {
      state.sortBy = action.payload;
      state.filteredItems = applyFilters(state.items, state);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  }
});

export const { 
  setProducts, setSearchTerm, setBrandFilter, 
  setColorFilter, setSortOrder, setCurrentPage 
} = productSlice.actions;

export default productSlice.reducer;