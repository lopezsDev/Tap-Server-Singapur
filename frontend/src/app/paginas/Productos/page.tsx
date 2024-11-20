"use client";
import Header from '@/app/components/Header';
import React, { ChangeEvent, useState } from 'react';

// Productos
interface Product {
  id: number;
  name: string;
  price: string;
}

const ProductosPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState<string>("");
  const [newProductPrice, setNewProductPrice] = useState<string>("");

  // Función para agregar un nuevo producto
  const addProduct = (): void => {
    if (newProductName.trim() && newProductPrice.trim()) {
      setProducts([
        ...products,
        { id: Date.now(), name: newProductName, price: newProductPrice },
      ]);
      setNewProductName("");
      setNewProductPrice("");
    }
  };

  // Función para eliminar un producto
  const deleteProduct = (id: number): void => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div>
      <Header/>
    <div style={styles.container}>

      <h1>Gestión de Productos</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={newProductName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewProductName(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Precio del producto"
          value={newProductPrice}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewProductPrice(e.target.value)}
          style={styles.input}
        />
        <button onClick={addProduct} style={styles.addButton}>Agregar</button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Producto</th>
            <th style={styles.headerCell}>Precio</th>
            <th style={styles.headerCell}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={styles.row}>
              <td style={styles.cell}>{product.name}</td>
              <td style={styles.cell}>${product.price}</td>
              <td style={styles.cell}>
                <button onClick={() => deleteProduct(product.id)} style={styles.deleteButton}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginRight: '0.5rem',
  },
  addButton: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerCell: {
    padding: '0.75rem',
    backgroundColor: '#333',
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    borderBottom: '1px solid #ddd',
  },
  cell: {
    padding: '0.75rem',
  },
  deleteButton: {
    padding: '0.25rem 0.5rem',
    fontSize: '0.9rem',
    color: '#fff',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ProductosPage;
