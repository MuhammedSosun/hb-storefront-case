import { createSlice } from "@reduxjs/toolkit";

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price, 0).toFixed(2);
};

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  totalAmount: calculateTotal(JSON.parse(localStorage.getItem("cart")) || []),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exists = state.cartItems.find(
        (item) => item.id === action.payload.id,
      );
      if (!exists) {
        state.cartItems.push({
          ...action.payload,
          addedDate: new Date().toISOString(),
        });
        state.totalAmount = calculateTotal(state.cartItems);
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );

      state.totalAmount = calculateTotal(state.cartItems);

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer; // Hatanın sebebi bu satırın eksik olmasıydı
