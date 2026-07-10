import { useEffect, useState } from "react";
import { getOrders } from "../services/ordersApi";
import { getCustomers } from "../services/customersApi";
import { getProducts } from "../services/productsApi";

export default function OrderList({ refreshKey }) {
  const [orders, setOrders] = useState([]);
  const [customerNames, setCustomerNames] = useState({});
  const [productNames, setProductNames] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getOrders(), getCustomers(), getProducts()])
      .then(([orders, customers, products]) => {
        setOrders(orders);
        setCustomerNames(Object.fromEntries(customers.map((c) => [c.id, c.name])));
        setProductNames(Object.fromEntries(products.map((p) => [p.id, p.name])));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Status</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o.id}>
            <td>{o.id}</td>
            <td>{customerNames[o.customerId] ?? o.customerId}</td>
            <td>{productNames[o.productId] ?? o.productId}</td>
            <td>{o.productCount}</td>
            <td>{o.price}</td>
            <td>{o.status}</td>
            <td>{o.createdAt ? new Date(o.createdAt).toLocaleString() : "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
