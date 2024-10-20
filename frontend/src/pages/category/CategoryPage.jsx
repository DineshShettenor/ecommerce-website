import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import products from "../../data/products.json";
import ProductCards from "../shop/ProductCards";

const CategoryPage = () => {
  const { categoryName } = useParams();
  // console.log("categoryName :- ", categoryName);
  const [filteredProducts, setfilteredProducts] = useState([]);

  useEffect(() => {
    const filterdData = products.filter(
      (product) =>
        product.category.toLocaleLowerCase() ===
        categoryName.toLocaleLowerCase()
    );
    // console.log(filterdData)
    setfilteredProducts(filterdData);
  }, [categoryName]);

  useEffect(()=> {
    window.scrollTo(0, 0)
  }, [categoryName])

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          eius odit ratione, fugit eaque a voluptatibus architecto aspernatur
          debitis magnam fuga aperiam saepe exercitationem itaque, voluptate
          unde enim omnis. Libero?
        </p>
      </section>
      {/* product cards */}
      <div className="section__container">
        <ProductCards products={filteredProducts} />
      </div>
    </>
  );
};

export default CategoryPage;
