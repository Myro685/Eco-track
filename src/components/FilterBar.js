// React
import React from "react";

// Styles
import "./FilterBar.css";

const FilterBar = ({ activeCategory, setCategory, sortBy, setSortBy }) => {
  const categories = [
    "Vše",
    "Ovoce a zelenina",
    "Maso",
    "Mléčné výrobky",
    "Luštěniny",
    "Ostatní",
  ];

  return (
    <div className="filter-container">
      <div className="category-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`pill ${activeCategory === cat ? "active" : ""}`}
            onClick={() => {
              setCategory(cat);
              console.log(activeCategory);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="sort-wrapper">
        <label>Řadit podle:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Výchozí</option>
          <option value="co2-asc">Nejnižší CO2 stopa</option>
          <option value="name-asc">Názvu (A-Z)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
