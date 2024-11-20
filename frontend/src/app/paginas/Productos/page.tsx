"use client";

import Header from "@/app/components/Header";
import Productos from "@/app/components/Productos";
import React, { ChangeEvent, useState } from "react";

// Productos
interface Product {
  id: number;
  name: string;
  description: string;
  initialQuantity: number;
  price: number;
  category: string;
}

const ProductosPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    initialQuantity: 0,
    price: 0,
    category: "",
  });
  const [showPopup, setShowPopup] = useState<boolean>(false); // Estado para la ventana emergente

  // Función para manejar los cambios en los campos
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Función para agregar un nuevo producto
  const addProduct = (): void => {
    if (
      newProduct.name?.trim() &&
      newProduct.description?.trim() &&
      newProduct.initialQuantity &&
      newProduct.price &&
      newProduct.category?.trim()
    ) {
      setProducts([
        ...products,
        { id: Date.now(), ...newProduct } as Product,
      ]);
      setNewProduct({
        name: "",
        description: "",
        initialQuantity: 0,
        price: 0,
        category: "",
      });
      setShowPopup(true); // Mostrar ventana emergente
    }
  };
  return (
    <div>
      <Header />
      <div>
      <Productos
  styles={styles}
  newProduct={newProduct}
  handleInputChange={handleInputChange}
  addProduct={addProduct}
  showPopup={showPopup}
  setShowPopup={setShowPopup}
/>;</div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#222",
    minHeight: "100vh",
    color: "#fff",
  },
  container: {
    backgroundColor: "#333",
    borderRadius: "8px",
    padding: "2rem",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  title: {
    textAlign: "center",
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "0.9rem",
    fontWeight: "bold",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #444",
    backgroundColor: "#555",
    color: "#fff",
    marginTop: "0.5rem",
  },
  addButton: {
    padding: "0.75rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
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
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#333",
    padding: "2rem",
    borderRadius: "8px",
    textAlign: "center",
    color: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  },
  popupButton: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default ProductosPage;
