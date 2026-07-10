import { useEffect, useState } from "react";
import { getCustomers } from "../services/customersApi";
import { getProducts } from "../services/productsApi";
import { createOrder } from "../services/ordersApi";

export default function OrderForm({ onOrderCreated }) {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [productCount, setProductCount] = useState(1);
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCustomers().then(setCustomers).catch((e) => setError(e.message));
    getProducts().then(setProducts).catch((e) => setError(e.message));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const order = await createOrder({
        customerId: Number(customerId),
        productId: Number(productId),
        productCount: Number(productCount),
        price: Number(price),
        status: "NEW",
      });
      onOrderCreated?.(order);
      setProductCount(1);
      setPrice("");
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Customer
        <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} required>
          <option value="" disabled>Select customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.name} (available: {c.amountAvailable})</option>
          ))}
        </select>
      </label>

      <label>
        Product
        <select value={productId} onChange={(e) => setProductId(e.target.value)} required>
          <option value="" disabled>Select product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name} (stock: {p.availableItems})</option>
          ))}
        </select>
      </label>

      <label>
        Quantity
        <input
          type="number"
          min="1"
          value={productCount}
          onChange={(e) => setProductCount(e.target.value)}
          required
        />
      </label>

      <label>
        Price
        <input
          type="number"
          min="1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? "Creating..." : "Create order"}
      </button>

      {error && <p className="error">Error: {error}</p>}
    </form>
  );
}
