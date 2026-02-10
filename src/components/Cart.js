// React
import React from "react";

// React components
import "./Cart.css";

// Hooks
import { useCart } from "../context/CartProvider";

const Cart = () => {
  const { cartItems, removeFromCart, stats } = useCart();
  const getScoreClass = (s) => `badge-${s.toLowerCase()}`;

  return (
    <aside className="cart-container">
      <div className="cart-header">
        <h2>Tvůj košík</h2>
        <span className="item-count">{cartItems.length} položky</span>
      </div>

      <div className={`score-overview score-${stats.score.toLowerCase()}`}>
        <div className={`score-value ${getScoreClass(stats.score)}`}>
          {stats.score}
        </div>
        <div className="score-label">
          <h4>Celkové Eco-Score</h4>
          <p>Tvůj nákup je udržitelný.</p>
        </div>
      </div>

      <div className="cart-items-list">
        {cartItems.length === 0 ? (
          <p className="empty-msg">Košík je zatím prázdný...</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.cartId} className="cart-item">
              <img src={item.image} alt={item.name} className="item-thumb" />
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span
                  className={`item-score-mini badge-${item.score.toLowerCase()}`}
                >
                  {item.score}
                </span>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.cartId)}
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer">
        <div className="total-co2">
          <span>Celková stopa:</span>
          <strong>{stats.totalCo2} kg CO2</strong>
        </div>
        <button className="checkout-btn">Uložit nákup</button>
      </div>
    </aside>
  );
};

export default Cart;
