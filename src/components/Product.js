// React
import React from "react";

// Styles
import "./Product.css";

// Hooks
import { useCart } from "../context/CartProvider";

const Product = (props) => {
  const { name, category, score, impact, co2, description, image } = props.data;
  const { addToCart } = useCart();

  const getScoreClass = (s) => `badge-${s.toLowerCase()}`;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
      </div>

      <div className="card-header">
        <div className={`score-badge ${getScoreClass(score)}`}>{score}</div>
        <div className="header-info">
          <h3>{name}</h3>
          <span className="category-label">{category}</span>
        </div>
      </div>

      <div className="product-details">
        <div className="impact-tag">
          <strong>{impact} stopa</strong> CO2 ({co2}kg)
        </div>
        <p className="description">{description}</p>
      </div>

      <button
        className="add-button"
        onClick={() => {
          addToCart(props.data);
        }}
      >
        Přidat do košíku
      </button>
    </div>
  );
};

export default Product;
