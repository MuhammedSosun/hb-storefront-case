import { render, screen } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

describe("ProductCard Component Testleri", () => {
  const product = {
    name: "iPhone 11",
    brand: "Apple",
    color: "Black",
    price: 100,
    imageUrl: "test.jpg",
  };

  test("ürün adı render edilmeli", () => {
    render(
      <ProductCard product={product} isInCart={false} onAddToCart={() => {}} />,
    );

    expect(screen.getByText("iPhone 11")).toBeInTheDocument();
  });

  test("sepetteyse buton disabled olmalı", () => {
    render(
      <ProductCard product={product} isInCart={true} onAddToCart={() => {}} />,
    );

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });
});
