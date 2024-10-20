import React from "react";
import blogsData from "../../data/blogs.json";

const Blogs = () => {
  // console.log(blogsData);
  return (
    <section className="section__container blogs__container">
      <h2 className="section__header">Latest Blogs</h2>
      <p className="section__subheader mb-12">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam vel eius
        culpa veniam voluptates laboriosam deleniti aspernatur quibusdam. Magni
        odit magnam ipsam quidem fuga vitae perferendis velit amet aut
        accusamus.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {blogsData.map((blog, index) => (
          <div
            key={index}
            className="blog__card cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <img src={blog.imageUrl} alt={blog.title} />
            <div className="blog__card__content">
              <h6>{blog.subtitle}</h6>
              <h4>{blog.title}</h4>
              <p>{blog.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
