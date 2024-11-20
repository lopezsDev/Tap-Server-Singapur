"use client";

import React, { ChangeEvent, useState } from "react";

interface Order {
  id: number;
  item: string;
  quantity: number;
}

const PedidosPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrderItem, setNewOrderItem] = useState<string>("");
  const [newOrderQuantity, setNewOrderQuantity] = useState<number | "">("");

  // Función para agregar un nuevo pedido
  const addOrder = (): void => {
    if (newOrderItem.trim() && newOrderQuantity) {
      setOrders([
        ...orders,
        { id: Date.now(), item: newOrderItem, quantity: Number(newOrderQuantity) },
      ]);
      setNewOrderItem("");
      setNewOrderQuantity("");
    }
  };

  // Función para eliminar un pedido
  const deleteOrder = (id: number): void => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1>Gestión de Pedidos</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Artículo"
          value={newOrderItem}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewOrderItem(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={newOrderQuantity}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewOrderQuantity(e.target.value ? parseInt(e.target.value) : "")
          }
          style={styles.input}
        />
        <button onClick={addOrder} style={styles.addButton}>
          Agregar
        </button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Artículo</th>
            <th style={styles.headerCell}>Cantidad</th>
            <th style={styles.headerCell}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={styles.row}>
              <td style={styles.cell}>{order.item}</td>
              <td style={styles.cell}>{order.quantity}</td>
              <td style={styles.cell}>
                <button
                  onClick={() => deleteOrder(order.id)}
                  style={styles.deleteButton}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginRight: "0.5rem",
  },
  addButton: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  headerCell: {
    padding: "0.75rem",
    backgroundColor: "#333",
    color: "#fff",
    fontWeight: "bold",
  },
  row: {
    borderBottom: "1px solid #ddd",
  },
  cell: {
    padding: "0.75rem",
  },
  deleteButton: {
    padding: "0.25rem 0.5rem",
    fontSize: "0.9rem",
    color: "#fff",
    backgroundColor: "#dc3545",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default PedidosPage;
