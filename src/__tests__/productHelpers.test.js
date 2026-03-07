import { applyFilters } from "../utils/productHelpers";

const mockItems = [
  { id: 1, name: "iPhone 11", brand: "Apple", color: "Siyah", price: 100 },
  { id: 2, name: "Samsung S21", brand: "Samsung", color: "Beyaz", price: 200 },
  { id: 3, name: "iPhone 12", brand: "Apple", color: "Mavi", price: 150 },
];

describe("Ürün Filtreleme ve Arama Testleri", () => {
  test("Arama terimi 2 karakterden azsa filtre uygulanmamalı", () => {
    const state = {
      searchTerm: "i",
      filters: { brand: null, color: null },
      sortBy: "",
    };

    const result = applyFilters(mockItems, state);

    expect(result.length).toBe(3);
  });

  test("Arama doğru çalışmalı", () => {
    const state = {
      searchTerm: "iphone",
      filters: { brand: null, color: null },
      sortBy: "",
    };

    const result = applyFilters(mockItems, state);

    expect(result.length).toBe(2);
  });

  test("Marka filtresi çalışmalı", () => {
    const state = {
      searchTerm: "",
      filters: { brand: "Samsung", color: null },
      sortBy: "",
    };

    const result = applyFilters(mockItems, state);

    expect(result[0].brand).toBe("Samsung");
  });

  test("Renk filtresi çalışmalı", () => {
    const state = {
      searchTerm: "",
      filters: { brand: null, color: "Siyah" },
      sortBy: "",
    };

    const result = applyFilters(mockItems, state);

    expect(result.length).toBe(1);
  });

  test("lowestPrice sorting çalışmalı", () => {
    const state = {
      searchTerm: "",
      filters: { brand: null, color: null },
      sortBy: "lowestPrice",
    };

    const result = applyFilters(mockItems, state);

    expect(result[0].price).toBe(100);
  });

  test("highestPrice sorting çalışmalı", () => {
    const state = {
      searchTerm: "",
      filters: { brand: null, color: null },
      sortBy: "highestPrice",
    };

    const result = applyFilters(mockItems, state);

    expect(result[0].price).toBe(200);
  });
});
