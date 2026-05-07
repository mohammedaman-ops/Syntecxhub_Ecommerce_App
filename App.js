import React, { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "MacBook Air M2",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: 1100,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
  },
  {
    id: 4,
    name: "Apple Watch Ultra 2",
    price: 2900,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("store");
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [trackID, setTrackID] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );


  const addToCart = (product) => {
    setCart([...cart, product]);
  };


  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

 
  const handleConfirmOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const generatedID =
      "IZ" + Math.floor(1000 + Math.random() * 9000);

    setTrackID(generatedID);
    setOrderStatus("Success");

    alert(
      `Order Confirmed!\nYour Order ID: ${generatedID}`
    );

    setCart([]);
    setView("track");
  };


  const renderView = () => {
    switch (view) {

      
      case "login":
        return (
          <div className="center-container">
            <div className="glass-card login-box">
              <h2>Sign In</h2>

              <input
                type="email"
                placeholder="Email or Mobile"
              />

              <input
                type="password"
                placeholder="Password"
              />

              <button className="primary-btn">
                Continue
              </button>

              <div className="divider">
                <span>New to Izzath Store?</span>
              </div>

              <button
                className="secondary-btn"
                onClick={() => setView("store")}
              >
                Back to Shopping
              </button>
            </div>
          </div>
        );

     
      case "checkout":
        return (
          <div className="checkout-container">
            <div className="checkout-grid">

              {/* ADDRESS */}
              <div className="glass-card">
                <h3>Delivery Address</h3>

                <input
                  type="text"
                  placeholder="Full Name"
                />

                <input
                  type="text"
                  placeholder="Street / Villa Number"
                />

                <input
                  type="text"
                  placeholder="City (Dubai/Sharjah/RAK)"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                />
              </div>

              {/* PAYMENT */}
              <div className="glass-card">
                <h3>Payment Method</h3>

                <div className="payment-grid">
                  {[
                    "Tabby",
                    "Tamara",
                    "Card",
                    "COD",
                  ].map((method) => (
                    <button
                      key={method}
                      className={
                        paymentMethod === method
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setPaymentMethod(method)
                      }
                    >
                      {method}
                    </button>
                  ))}
                </div>

                {/* CART ITEMS */}
                <div className="cart-items">
                  <h3>Your Cart</h3>

                  {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                  ) : (
                    cart.map((item, index) => (
                      <div
                        key={index}
                        className="cart-item"
                      >
                        <span>{item.name}</span>

                        <div>
                          <span>
                            {item.price} AED
                          </span>

                          <button
                            className="remove-btn"
                            onClick={() =>
                              removeFromCart(index)
                            }
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* TOTAL */}
                <div className="total-box">
                  <p className="total">
                    Total: {cartTotal} AED
                  </p>

                  <button
                    className="primary-btn"
                    onClick={handleConfirmOrder}
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      /* TRACK PAGE */
      case "track":
        return (
          <div className="center-container">
            <div className="glass-card track-box">
              <h2>Track Your Order</h2>

              {orderStatus === "Success" && (
                <p className="success-msg">
                   Order Placed Successfully!
                </p>
              )}

              <input
                type="text"
                placeholder="Order ID #IZ..."
                value={trackID}
                onChange={(e) =>
                  setTrackID(e.target.value)
                }
              />

              <button className="primary-btn">
                Track Status
              </button>

              {trackID.startsWith("IZ") && (
                <div className="status-timeline">
                  <p>✅ Order Received</p>
                  <p>📦 Processing in Warehouse</p>
                  <p>🚚 Ready for Shipping</p>
                </div>
              )}
            </div>
          </div>
        );

     
      default:
        return (
          <main className="product-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="glass-card product-card"
              >
                <img
                  src={product.image}
                  alt={product.name}
                />

                <h3>{product.name}</h3>

                <p className="price">
                  {product.price} AED
                </p>

                <button
                  className="add-btn"
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </main>
        );
    }
  };

  return (
    <div className="site-wrapper">

      {/* NAVBAR */}
      <nav className="navbar">
        <h1 onClick={() => setView("store")}>
          Izzath Store
        </h1>

        <div className="nav-links">
          <button onClick={() => setView("login")}>
            Sign In
          </button>

          <button onClick={() => setView("track")}>
            Track Order
          </button>

          <button
            className="cart-pill"
            onClick={() => setView("checkout")}
          >
            🛒 {cart.length}
          </button>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      {renderView()}
    </div>
  );
}

export default App;