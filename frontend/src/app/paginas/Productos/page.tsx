"use client";

import React, { ChangeEvent, useState } from "react";
import Header from "../../components/Header";

interface Product {
  id: number;
  name: string;
  description: string;
  initialQuantity: number;
  price: number;
  category: string;
  stock: number;
}

const Productos: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    initialQuantity: 0,
    price: 0,
    category: "",
  });
  const [activeOption, setActiveOption] = useState<string>("Agregar");
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  // Función para agregar un producto
  const addProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.initialQuantity ||
      !newProduct.price ||
      !newProduct.category
    ) {
      setPopupMessage("Todos los campos son obligatorios.");
      setShowPopup(true);
      return;
    }

    const productExists = products.some(
      (product) => product.name === newProduct.name
    );
    if (productExists) {
      setPopupMessage("El producto ya existe.");
      setShowPopup(true);
      return;
    }

    setProducts([
      ...products,
      {
        id: Date.now(),
        ...newProduct,
        stock: newProduct.initialQuantity || 0,
      } as Product,
    ]);
    setPopupMessage("Producto agregado con éxito.");
    setShowPopup(true);
    setNewProduct({
      name: "",
      description: "",
      initialQuantity: 0,
      price: 0,
      category: "",
    });
  };

  // Función para modificar un producto
  const modifyProduct = () => {
    if (!newProduct.name) {
      setPopupMessage("Debes ingresar un nombre para modificar.");
      setShowPopup(true);
      return;
    }

    const productIndex = products.findIndex(
      (product) => product.name === newProduct.name
    );

    if (productIndex === -1) {
      setPopupMessage("El producto no existe.");
      setShowPopup(true);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      ...newProduct,
    } as Product;

    setProducts(updatedProducts);
    setPopupMessage("Producto modificado con éxito.");
    setShowPopup(true);
  };

  // Función para cálculo de inventario
  const calculateInventory = () => {
    const totalInventory = products.reduce(
      (total, product) => total + product.stock * product.price,
      0
    );
    setPopupMessage(`El valor total del inventario es: $${totalInventory.toFixed(2)}`);
    setShowPopup(true);
  };

  // Función para salidas de inventario
  const removeFromInventory = () => {
    if (!newProduct.name || !newProduct.initialQuantity) {
      setPopupMessage("Debes ingresar el nombre del producto y la cantidad.");
      setShowPopup(true);
      return;
    }

    const productIndex = products.findIndex(
      (product) => product.name === newProduct.name
    );

    if (productIndex === -1) {
      setPopupMessage("El producto no existe.");
      setShowPopup(true);
      return;
    }

    const updatedProducts = [...products];
    const product = updatedProducts[productIndex];

    if (product.stock < newProduct.initialQuantity!) {
      setPopupMessage("La cantidad solicitada excede el stock disponible.");
      setShowPopup(true);
      return;
    }

    product.stock -= newProduct.initialQuantity!;
    setProducts(updatedProducts);
    setPopupMessage("Salida de inventario registrada con éxito.");
    setShowPopup(true);
  };

  // Renderizado dinámico según la opción activa
  const renderContent = () => {
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
          {["Agregar", "Modificar", "Salidas de inventario"].includes(activeOption) && (
            <>
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
                Cantidad
                <input
                  type="number"
                  name="initialQuantity"
                  value={newProduct.initialQuantity || ""}
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
                  name="category"
                  value={newProduct.category || ""}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </label>
            </>
          )}
          <button
            type="button"
            onClick={
              activeOption === "Agregar"
                ? addProduct
                : activeOption === "Modificar"
                ? modifyProduct
                : activeOption === "Cálculo de inventario"
                ? calculateInventory
                : removeFromInventory
            }
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
          {[
            "Agregar",
            "Consultar",
            "Modificar",
            "Descontinuar",
            "Salidas de inventario",
            "Cálculo de inventario",
          ].map((option) => (
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
