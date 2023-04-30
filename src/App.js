import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error(error));
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleDelete = (productId) => {
    fetch(`http://localhost:8000/products/${productId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, data]);
        event.target.reset();
      })
      .catch((err) => console.log(err))
  };

  return (
    <>
    <h1>CITY SUPERMARKET</h1>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="productname" placeholder="Product Name" required />
        <input type="number" name="price" placeholder="Price" required />
        <input type="text" name="description" placeholder="Description" required />
        <input type="number" name="quantity" placeholder="Quantity" required />
        <input type="text" name="img" placeholder="Image URL" required />
        <button type="submit">Add Product</button>
      </form>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <div className="product-image">
              <img src={product.img} alt={product.productname} />
            </div>
            <div className="product-info">
              <h2>{product.productname}</h2>
              <p>{product.description}</p>
              <div className="product-footer">
                <div className="product-price">${product.price}</div>
                <div className="product-quantity">{product.quantity} in stock</div>
                <button onClick={() => handleAddToCart(product)}>Add to cart</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Cart ({cart.length})</h2>
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-image">
                <img src={item.img} alt={item.productname} />
              </div>
              <div className="cart-item-info">
                <div className="cart-item-name">{item.productname}</div>
                <div className="cart-item-price">${item.price}</div>
                <button onClick={() => setCart(cart.filter((_, i) => i !== index))}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ProductList;