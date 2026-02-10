// React
import { useMemo, useState } from "react";

// Styles
import "./App.css";

// Data
import data from "./data/products.json";

// React components
import Product from "./components/Product";
import FilterBar from "./components/FilterBar";
import Cart from "./components/Cart";

// Hooks
import { CartProvider } from "./context/CartProvider";

function App() {
  const [activeCategory, setActiveCategory] = useState("Vše");
  const [sortBy, setSortBy] = useState("default");

  const filteredAndSortedProducts = useMemo(() => {
    let result = data.filter((product) => {
      if (activeCategory === "Vše") return true;
      return product.category === activeCategory;
    });

    result.sort((a, b) => {
      if (sortBy === "co2-asc") {
        return a.co2 - b.co2;
      }
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [activeCategory, sortBy]);

  return (
    <CartProvider>
      <div
        style={{
          maxWidth: "1920px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          width: "100%",
        }}
      >
        <h1 style={{ paddingBottom: "1rem" }}>EcoTracker</h1>
        <FilterBar
          activeCategory={activeCategory}
          setCategory={setActiveCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <div className="container">
          <main className="main-container">
            {filteredAndSortedProducts.map((item) => (
              <Product data={item} key={item.id} />
            ))}
          </main>
          <aside className="aside-container">
            <Cart />
          </aside>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
