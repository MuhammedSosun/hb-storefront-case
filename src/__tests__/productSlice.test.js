import reducer, { setSortOrder, setProducts } from '../store/productSlice';

describe('Product Slice Testleri', () => {
  const initialState = {
    items: [],
    filteredItems: [],
    sortBy: '',
    searchTerm: '',
    filters: { brand: null, color: null }
  };

  test('setProducts aksiyonu ürünleri state e doğru yüklemeli', () => {
    const mockProducts = [{ id: 1, name: 'Test Ürün' }];
    const nextState = reducer(initialState, setProducts(mockProducts));
    expect(nextState.items).toHaveLength(1);
    expect(nextState.filteredItems).toHaveLength(1);
  });

  test('setSortOrder aksiyonu sortBy değerini güncellemeli', () => {
    const nextState = reducer(initialState, setSortOrder('lowestPrice'));
    expect(nextState.sortBy).toBe('lowestPrice');
  });
});