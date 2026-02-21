import React from "react";
import { it, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Product } from "./Product";
import userEvent from "@testing-library/user-event";
import axios from "axios";
vi.mock("axios");

describe("Product component", () => {
  const product = {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 1090,
    keywords: ["socks", "sports", "apparel"],
  };

  it("display product details correctly", () => {
    const getCartItemsMock = vi.fn();
    render(<Product product={product} getCartItems={getCartItemsMock} />);

    const nameElement = screen.getByText(
      "Black and Gray Athletic Cotton Socks - 6 Pairs",
    );
    expect(nameElement).toBeInTheDocument();
    const priceElement = screen.getByText("$10.90");
    expect(priceElement).toBeInTheDocument();
    const ratingCountElement = screen.getByText("87");
    expect(ratingCountElement).toBeInTheDocument();
  });

  it("calls addToCart when 'Add to Cart' button is clicked", async () => {
    const getCartItemsMock = vi.fn();
    axios.post.mockResolvedValue({ data: {} });

    render(<Product product={product} getCartItems={getCartItemsMock} />);
    const user = userEvent.setup();
    const buttonElement = screen.getByRole("button", { name: /add to cart/i });
    await user.click(buttonElement);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: product.id,
      quantity: 1,
    });
    expect(getCartItemsMock).toHaveBeenCalled();
  });
});
