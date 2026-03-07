import reducer, { addToCart, removeFromCart } from "../store/cartSlice";

describe("Cart Slice Testleri", () => {
  const initialState = {
    cartItems: [],
    totalAmount: 0,
  };

  test("Sepete yeni bir ürün eklenebilmeli", () => {
    const product = { id: 1, name: "iPhone 11", price: 100 };

    const nextState = reducer(initialState, addToCart(product));

    expect(nextState.cartItems).toHaveLength(1);
    expect(nextState.cartItems[0].id).toBe(1);
  });

  test("Aynı ürün sepete iki kez eklenmemeli", () => {
    const product = { id: 1, name: "iPhone 11", price: 100 };

    const state = reducer(initialState, addToCart(product));
    const nextState = reducer(state, addToCart(product));

    expect(nextState.cartItems).toHaveLength(1);
  });

  test("Sepetten ürün silinebilmeli", () => {
    const stateWithItem = {
      cartItems: [{ id: 1, name: "iPhone 11", price: 100 }],
      totalAmount: 100,
    };

    const nextState = reducer(stateWithItem, removeFromCart(1));

    expect(nextState.cartItems).toHaveLength(0);
  });

  test("totalAmount doğru hesaplanmalı", () => {
    const product = { id: 1, name: "iPhone 11", price: 100 };

    const nextState = reducer(initialState, addToCart(product));

    expect(nextState.totalAmount).toBe("100.00");
  });
});
