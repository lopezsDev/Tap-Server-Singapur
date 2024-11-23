"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Header from "../../components/Header";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  estado: boolean;
  cantidadCritica: number;
  cantidadDisponible: number;
  categoria: string;
}

const Productos: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    estado: true,
    cantidadCritica: 0,
    cantidadDisponible: 0,
    categoria: "",
  });
  const [activeOption, setActiveOption] = useState<string>("Agregar");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [withdrawQuantity, setWithdrawQuantity] = useState<number>(0);
  const [withdrawReason, setWithdrawReason] = useState<string>("");

  const API_URL = "http://192.168.0.17:8080/api/products";

  useEffect(() => {
    if (["Consultar", "Salidas de Inventario"].includes(activeOption)) {
      fetchProducts();
    }
  }, [activeOption]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setPopupMessage(`Error al obtener productos: ${response.status}`);
        setShowPopup(true);
      }
    } catch (error) {
      setPopupMessage(`Error de red: ${error}`);
      setShowPopup(true);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleWithdrawInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "withdrawQuantity") {
      setWithdrawQuantity(Number(value));
    } else if (name === "withdrawReason") {
      setWithdrawReason(value);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  const renderContent = () => {
    if (activeOption === "Consultar") {
      return (
        <div>
          <h2>Consultar Productos</h2>
          {products.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Nombre</th>
                  <th style={styles.tableHeader}>Descripción</th>
                  <th style={styles.tableHeader}>Precio</th>
                  <th style={styles.tableHeader}>Categoría</th>
                  <th style={styles.tableHeader}>Disponible</th>
                  <th style={styles.tableHeader}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td style={styles.tableCell}>{product.name}</td>
                    <td style={styles.tableCell}>{product.description}</td>
                    <td style={styles.tableCell}>${product.price}</td>
                    <td style={styles.tableCell}>{product.categoria}</td>
                    <td style={styles.tableCell}>{product.cantidadDisponible}</td>
                    <td style={styles.tableCell}>
                      <button
                        style={styles.modifyButton}
                        onClick={() => {
                          setSelectedProductId(product.id);
                          setActiveOption("Modificar");
                        }}
                      >
                        Modificar
                      </button>
                      <button
                        style={styles.deleteButton}
                        onClick={() => console.log("Eliminar producto")}
                      >
                        Descontinuar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
    }

    return (
      <div>
        <h2>{activeOption} Producto</h2>
        <form style={styles.form}>
          <label style={styles.label}>Nombre</label>
          <input
            type="text"
            name="name"
            value={newProduct.name || ""}
            onChange={handleInputChange}
            style={styles.input}
          />
          <label style={styles.label}>Descripción</label>
          <input
            type="text"
            name="description"
            value={newProduct.description || ""}
            onChange={handleInputChange}
            style={styles.input}
          />
          <label style={styles.label}>Precio</label>
          <input
            type="number"
            name="price"
            value={newProduct.price || ""}
            onChange={handleInputChange}
            style={styles.input}
          />
          <label style={styles.label}>Categoría</label>
          <input
            type="text"
            name="categoria"
            value={newProduct.categoria || ""}
            onChange={handleInputChange}
            style={styles.input}
          />
          <label style={styles.label}>Cantidad Disponible</label>
          <input
            type="number"
            name="cantidadDisponible"
            value={newProduct.cantidadDisponible || ""}
            onChange={handleInputChange}
            style={styles.input}
          />
          <button type="button" onClick={() => console.log("Agregar producto")} style={styles.addButton}>
            {activeOption}
          </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div style={styles.pageContainer}>
        <div style={styles.sidebar}>
          {["Agregar", "Consultar", "Modificar", "Descontinuar", "Cálculo de Inventario", "Salidas de Inventario"].map(
            (option) => (
              <button
                key={option}
                onClick={() => setActiveOption(option)}
                style={{
                  ...styles.sidebarButton,
                  backgroundColor: activeOption === option ? "#555" : "#333",
                }}
              >
                {option}
              </button>
            )
          )}
        </div>
        <div style={styles.content}>{renderContent()}</div>

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
    color: "#fff",
  },
  sidebar: {
    width: "20%",
    backgroundColor: "#333",
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    gap: "1rem",
    borderRadius: "8px",
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
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  tableHeader: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "0.75rem",
    borderBottom: "2px solid #555",
  },
  tableCell: {
    padding: "0.75rem",
    borderBottom: "1px solid #555",
  },
  modifyButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem 1rem",
    marginRight: "0.5rem",
    borderRadius: "4px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
  },

};

export default Productos;
