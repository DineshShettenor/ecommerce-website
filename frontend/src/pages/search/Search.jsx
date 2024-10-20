import React, { useState } from "react";
import products from "../../data/products.json";
import ProductCards from "../shop/ProductCards";
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearchProduct = () => {
    const filteredData = products.filter(
      (product) =>
        product.category
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase()) ||
        product.description
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase())
    );
    setFilteredProducts(filteredData);
  };
  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Search Products</h2>
        <p className="section__subheader">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          eius odit ratione, fugit eaque a voluptatibus architecto aspernatur
          debitis magnam fuga aperiam saepe exercitationem itaque, voluptate
          unde enim omnis. Libero?
        </p>
      </section>
      <section className="section__container">
        <div className="w-full flex mb-12 flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search product ....."
            className="search-bar w-full max-w-4xl border rounded"
          />
          <button
            className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded"
            onClick={handleSearchProduct}
          >
            Search
          </button>
        </div>
        {/* product cards */}
        <ProductCards products={filteredProducts} />
      </section>
    </>
  );
};

export default Search;
