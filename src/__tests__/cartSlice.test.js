import reducer, { addToCart, removeFromCart } from '../store/cartSlice';

describe('Cart Slice Testleri', () => {
  const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
  totalAmount: 0 // Veya istersen bunu da hesaplayabilirsin
  };

  test('Sepete yeni bir ürün eklenebilmeli', () => {
    const product = { id: 1, name: 'iPhone 11', price: 100 };
    const nextState = reducer(initialState, addToCart(product));
    expect(nextState.cartItems).toHaveLength(1);
    expect(nextState.cartItems[0].id).toBe(1);
  });

  test('Sepetten ürün silinebilmeli', () => {
    const stateWithItem = {
      cartItems: [{ id: 1, name: 'iPhone 11' }],
      totalAmount: 100
    };
    const nextState = reducer(stateWithItem, removeFromCart(1));
    expect(nextState.cartItems).toHaveLength(0);
  });
});