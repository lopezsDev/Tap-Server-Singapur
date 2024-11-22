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
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const API_URL = "http://192.168.0.17:8080/api/products";

  useEffect(() => {
    if (activeOption === "Consultar") {
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

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  const addProduct = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setPopupMessage("Producto agregado con éxito.");
        setShowPopup(true);
        fetchProducts();
        setNewProduct({
          name: "",
          description: "",
          price: 0,
          estado: true,
          cantidadCritica: 0,
          cantidadDisponible: 0,
          categoria: "",
        });
      } else {
        setPopupMessage(`Error al agregar producto: ${response.status}`);
        setShowPopup(true);
      }
    } catch (error) {
      setPopupMessage(`Error de red: ${error}`);
      setShowPopup(true);
    }
  };

  const modifyProduct = async () => {
    if (!newProduct.id) {
      setPopupMessage("Selecciona un producto para modificar.");
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${newProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setPopupMessage("Producto modificado con éxito.");
        setShowPopup(true);
        fetchProducts();
      } else {
        setPopupMessage(`Error al modificar producto: ${response.status}`);
        setShowPopup(true);
      }
    } catch (error) {
      setPopupMessage(`Error de red: ${error}`);
      setShowPopup(true);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPopupMessage("Producto eliminado con éxito.");
        setShowPopup(true);
        fetchProducts();
      } else {
        setPopupMessage(`Error al eliminar producto: ${response.status}`);
        setShowPopup(true);
      }
    } catch (error) {
      setPopupMessage(`Error de red: ${error}`);
      setShowPopup(true);
    }
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
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Disponible</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>{product.categoria}</td>
                    <td>{product.cantidadDisponible}</td>
                    <td>
                      <button
                        style={styles.deleteButton}
                        onClick={() => deleteProduct(product.id)}
                      >
                        Eliminar
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
          <label style={styles.label}>
            Nombre
            <input
              type="text"
              name="name"
              value={newProduct.name || ""}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Descripción
            <input
              type="text"
              name="description"
              value={newProduct.description || ""}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Precio
            <input
              type="number"
              name="price"
              value={newProduct.price || ""}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Categoría
            <input
              type="text"
              name="categoria"
              value={newProduct.categoria || ""}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Cantidad Disponible
            <input
              type="number"
              name="cantidadDisponible"
              value={newProduct.cantidadDisponible || ""}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <button
            type="button"
            onClick={addProduct}
            style={styles.addButton}
          >
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
          {["Agregar", "Consultar", "Modificar", "Eliminar"].map((option) => (
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
          ))}
        </div>
        <div style={styles.content}>{renderContent()}</div>
      </div>

      {/* Ventana emergente */}
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

export default Productos;
