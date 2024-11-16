'use client';
import { ChangeEvent, useState } from 'react';
import Header from '../../components/Header';

interface Styles {
  [key: string]: React.CSSProperties;
}

const Categorias: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");

  // Función para agregar una categoría
  const addCategory = (): void => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  // Función para eliminar una categoría
  const deleteCategory = (index: number): void => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  return (
    <div style={styles.container}>
      <Header />
      <h2>Categorías</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newCategory}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value)}
          placeholder="Nueva Categoría"
          style={styles.input}
        />
        <button onClick={addCategory} style={styles.addButton}>
          Agregar
        </button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Categoría</th>
            <th style={styles.headerCell}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index} style={styles.row}>
              <td style={styles.cell}>{category}</td>
              <td style={styles.cell}>
                <button onClick={() => deleteCategory(index)} style={styles.deleteButton}>
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

const styles: Styles = {
  container: {
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
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
    flex: 1,
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

export default Categorias;
