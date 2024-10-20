import React from "react";

const ShopFiltering = ({
  filters,
  filtersState,
  setFiltersState,
  handleClearFilter,
}) => {
  return (
    <div className="space-y-5 flex-shrink-0">
      <h3>Filters</h3>

      {/* Categories */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Category</h4>
        <hr />
        {filters.category.map((categoryItem, index) => (
          <label htmlFor={`category-${index}`} key={index} className="cursor-pointer capitalize">
            <input
              type="radio"
              name=""
              id={`category-${index}`}
              value={categoryItem}
              checked={filtersState.category === categoryItem}
              onChange={(e) =>
                setFiltersState({ ...filtersState, category: e.target.value })
              }
            />
            <span className="ml-1">{categoryItem}</span>
          </label>
        ))}
      </div>

        {/* colors */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Colors</h4>
        <hr />
        {filters.color.map((colorItem, index) => (
          <label htmlFor={`color-${index}`} key={index} className="cursor-pointer capitalize">
            <input
              type="radio"
              name=""
              id={`color-${index}`}
              value={colorItem}
              checked={filtersState.color === colorItem}
              onChange={(e) =>
                setFiltersState({ ...filtersState, color: e.target.value })
              }
            />
            <span className="ml-1">{colorItem}</span>
          </label>
        ))}
      </div>

        {/* Price Range */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Price Range</h4>
        <hr />
        {filters.priceRange.map((priceRangeItem, index) => (
          <label htmlFor={`priceRange-${index}`} key={index} className="cursor-pointer capitalize">
            <input
              type="radio"
              name=""
              id={`priceRange-${index}`}
              value={`${priceRangeItem.min} - ${priceRangeItem.max}`}
              checked={filtersState.priceRange === `${priceRangeItem.min} - ${priceRangeItem.max}`}
              onChange={(e) =>
                setFiltersState({ ...filtersState, priceRange: e.target.value })
              }
            />
            <span className="ml-1">{priceRangeItem.label}</span>
          </label>
        ))}
      </div>

      {/* clear all filters */}
      <button className="bg-primary py-1 px-4 text-white rounded" onClick={handleClearFilter}>Clear All Filters</button>
    </div>
  );
};

export default ShopFiltering;
