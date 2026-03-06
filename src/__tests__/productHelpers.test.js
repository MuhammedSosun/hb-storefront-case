import { applyFilters } from '../utils/productHelpers';

const mockItems = [
  { id: 1, name: 'iPhone 11', brand: 'Apple', color: 'Siyah', price: 100 },
  { id: 2, name: 'Samsung S21', brand: 'Samsung', color: 'Beyaz', price: 200 },
  { id: 3, name: 'iPhone 12', brand: 'Apple', color: 'Mavi', price: 150 },
];

describe('Ürün Filtreleme ve Arama Mantığı Testleri', () => {
  
  test('Arama terimi 2 karakterden azsa (örn: "i") sonuçları filtrelememeli', () => {
    const state = { searchTerm: 'i', filters: { brand: null, color: null }, sortBy: '' };
    const result = applyFilters(mockItems, state);
    expect(result.length).toBe(3); // Hepsi dönmeli
  });

  test('Arama terimi 2 karakter veya fazlaysa doğru filtreleme yapmalı', () => {
    const state = { searchTerm: 'iph', filters: { brand: null, color: null }, sortBy: '' };
    const result = applyFilters(mockItems, state);
    expect(result.length).toBe(2); // Sadece iPhone'lar
  });

  test('Marka filtresi seçildiğinde sadece o markanın ürünlerini getirmeli', () => {
    const state = { searchTerm: '', filters: { brand: 'Samsung', color: null }, sortBy: '' };
    const result = applyFilters(mockItems, state);
    expect(result[0].name).toBe('Samsung S21');
    expect(result.length).toBe(1);
  });
});