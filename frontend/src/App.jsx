import { useState } from "react";
import CustomerList from "./components/CustomerList";
import ProductList from "./components/ProductList";
import OrderForm from "./components/OrderForm";
import "./App.css";

function App() {
  const [lastOrder, setLastOrder] = useState(null);

  return (
    <section id="center">
      <h1>New order</h1>
      <OrderForm onOrderCreated={setLastOrder} />
      {lastOrder && <p>Created order #{lastOrder.id} — status: {lastOrder.status}</p>}

      <h1>Customers</h1>
      <CustomerList />

      <h1>Products</h1>
      <ProductList />
    </section>
  );
}

export default App;
