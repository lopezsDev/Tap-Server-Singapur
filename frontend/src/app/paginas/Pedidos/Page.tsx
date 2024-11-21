"use client";

import React, { ChangeEvent, useState } from "react";
import Header from "../../components/Header";

interface Order {
  id: number;
  product: string;
  description: string;
  quantity: number;
}

interface Table {
  id: number;
  available: boolean;
}

const Pedidos: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrder, setNewOrder] = useState<Partial<Order>>({
    product: "",
    description: "",
    quantity: 0,
  });
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [tables] = useState<Table[]>([
    { id: 1, available: true },
    { id: 2, available: false },
    { id: 3, available: true },
  ]);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const closePopup = () => {
    setShowPopup(false);
    setConfirmPopup(false);
    setPopupMessage("");
  };

  // Registrar pedido
  const registerOrder = () => {
    if (!newOrder.product || !newOrder.description || !newOrder.quantity) {
      setPopupMessage("Todos los campos son obligatorios.");
      setShowPopup(true);
      return;
    }

    const orderExists = orders.some(
      (order) => order.product === newOrder.product
    );
    if (orderExists) {
      setPopupMessage("El pedido ya existe.");
      setShowPopup(true);
      return;
    }

    setOrders([
      ...orders,
      {
        id: Date.now(),
        product: newOrder.product,
        description: newOrder.description,
        quantity: newOrder.quantity!,
      } as Order,
    ]);
    setPopupMessage("Pedido registrado con éxito.");
    setShowPopup(true);
    setNewOrder({ product: "", description: "", quantity: 0 });
  };

  // Modificar pedido
  const modifyOrder = () => {
    if (!selectedOrderId) {
      setPopupMessage("Selecciona un pedido para modificar.");
      setShowPopup(true);
      return;
    }

    const orderIndex = orders.findIndex((order) => order.id === selectedOrderId);

    if (orderIndex === -1) {
      setPopupMessage("El pedido no existe.");
      setShowPopup(true);
      return;
    }

    const updatedOrders = [...orders];
    updatedOrders[orderIndex] = {
      ...updatedOrders[orderIndex],
      ...newOrder,
    } as Order;

    setOrders(updatedOrders);
    setPopupMessage("Pedido modificado con éxito.");
    setShowPopup(true);
    setNewOrder({ product: "", description: "", quantity: 0 });
    setSelectedOrderId(null);
  };

  // Confirmar pedido
  const confirmOrder = () => {
    if (!selectedOrderId) {
      setPopupMessage("Selecciona un pedido para confirmar.");
      setShowPopup(true);
      return;
    }

    const orderExists = orders.some((order) => order.id === selectedOrderId);
    if (!orderExists) {
      setPopupMessage("El pedido no existe.");
      setShowPopup(true);
      return;
    }

    setPopupMessage("Pedido confirmado con éxito.");
    setShowPopup(true);
  };

  // Asignar mesa
  const assignTable = () => {
    if (selectedTable === null) {
      setPopupMessage("Selecciona una mesa para asignar.");
      setShowPopup(true);
      return;
    }

    const table = tables.find((table) => table.id === selectedTable);

    if (!table) {
      setPopupMessage("La mesa no existe.");
      setShowPopup(true);
      return;
    }

    if (!table.available) {
      setPopupMessage("La mesa no está disponible.");
      setShowPopup(true);
      return;
    }

    setPopupMessage("Mesa asignada con éxito.");
    setShowPopup(true);
    setSelectedTable(null);
  };

  return (
    <div>
      <Header />
      <div style={styles.pageContainer}>
        <div style={styles.sidebar}>
          {["Registrar", "Confirmar", "Modificar", "Eliminar", "Consultar", "Asignar mesa"].map(
            (option) => (
              <button
                key={option}
                onClick={() => setPopupMessage(option)}
                style={{
                  ...styles.sidebarButton,
                  backgroundColor: popupMessage === option ? "#555" : "#333",
                }}
              >
                {option}
              </button>
            )
          )}
        </div>
        <div style={styles.content}>
          <h2>Pedidos</h2>
          <form style={styles.form}>
            <label style={styles.label}>
              Producto
              <input
                type="text"
                name="product"
                value={newOrder.product || ""}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Descripción
              <input
                type="text"
                name="description"
                value={newOrder.description || ""}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Cantidad
              <input
                type="number"
                name="quantity"
                value={newOrder.quantity || ""}
                onChange={handleInputChange}
                style={styles.input}
              />
            </label>
            <button
              type="button"
              onClick={registerOrder}
              style={styles.addButton}
            >
              Registrar pedido
            </button>
          </form>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.headerCell}>Producto</th>
                <th style={styles.headerCell}>Descripción</th>
                <th style={styles.headerCell}>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={styles.row}>
                  <td style={styles.cell}>{order.product}</td>
                  <td style={styles.cell}>{order.description}</td>
                  <td style={styles.cell}>{order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>{popupMessage}</h3>
            <button onClick={closePopup} style={styles.popupButton}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    display: "flex",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    marginTop: "2rem",
  },
  sidebar: {
    width: "20%",
    backgroundColor: "#333",
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    gap: "1rem",
  },
  sidebarButton: {
    padding: "1rem",
    fontSize: "1rem",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textAlign: "left",
  },
  content: {
    flex: 1,
    padding: "2rem",
    backgroundColor: "#1E1E1E",
    borderRadius: "8px",
    marginLeft: "1rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#333",
    color: "#fff",
  },
  addButton: {
    padding: "0.75rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    textAlign: "center",
  },
  popupButton: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Pedidos;
