import React, { useState } from "react";
import ProductCards from "./ProductCards";
import products from '../../data/products.json'

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);

    const handleLoadMoreProducts =() => {
        setVisibleProducts(prevCount => prevCount + 4)
    }
  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia id
        quos quisquam nihil voluptas quasi ratione illo? Doloribus labore
        perspiciatis nisi, nihil amet magnam sit, reiciendis quibusdam
        voluptates molestias non?
      </p>

      {/* product cards */}
      <ProductCards products={products.slice(0, visibleProducts)}/>

      {/* load more products button */}
      <div className="product__btn">
                {
                    visibleProducts < products.length && (
                        <button className="btn" onClick={handleLoadMoreProducts}>Load More</button>
                    )
                }
            </div>
    </section>
  );
};

export default TrendingProducts;
