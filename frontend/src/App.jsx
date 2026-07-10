import { useState } from "react";
import CustomerList from "./components/CustomerList";
import ProductList from "./components/ProductList";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import "./App.css";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleOrderCreated() {
    setRefreshKey((k) => k + 1);
  }

  return (
    <section id="center">
      <h1>Order Management</h1>

      <h2>New order</h2>
      <OrderForm onOrderCreated={handleOrderCreated} />

      <h2>Orders</h2>
      <OrderList refreshKey={refreshKey} />

      <h2>Customers</h2>
      <CustomerList />

      <h2>Products</h2>
      <ProductList />
    </section>
  );
}

export default App;
