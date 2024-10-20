import React, { useEffect, useState } from "react";

import productData from "../../data/products.json";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";

const filters = {
  category: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  color: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRange: [
    { label: "under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 - Above", min: 200, max: "Infinity" },
  ],
};

const ShopPage = () => {
  const [products, setProducts] = useState(productData);
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  //   filter function
  const handleFilter = () => {
    let filteredProducts = productData;

    // filter by category
    if (filtersState.category && filtersState.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filtersState.category
      );
    }

    // filter by color
    if (filtersState.color && filtersState.color !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === filtersState.color
      );
    }

    // filter by priceRange
    if (filtersState.priceRange) {
      const [minPrice, maxPrice] = filtersState.priceRange
        .split("-")
        .map(Number);
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }
    setProducts(filteredProducts);
  };

  useEffect(() => {
    handleFilter();
  }, [filtersState]);

  //   clearFilter
  const handleClearFilter = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRange: "",
    });
  };

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          eius odit ratione, fugit eaque a voluptatibus architecto aspernatur
          debitis magnam fuga aperiam saepe exercitationem itaque, voluptate
          unde enim omnis. Libero?
        </p>
      </section>
      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* left div */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            handleClearFilter={handleClearFilter}
          />

          {/* right div */}
          <div>
            <h2 className="text-xl font-medium mb-4">Available Products {products.length}</h2>
            <ProductCards products={products} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
