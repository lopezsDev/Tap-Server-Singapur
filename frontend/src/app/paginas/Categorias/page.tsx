'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Header from '../../components/Header';

interface Category {
  id?: number;
  name: string;
  description: string;
  unidadMedida: string;
}

const Categorias: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({
    name: "",
    description: "",
    unidadMedida: "",
  });
  const [activeOption, setActiveOption] = useState<string>("Agregar");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const API_URL = 'http://192.168.0.17:8080/api/categories';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
        showAlert('success', 'Categorías cargadas correctamente.');
      } else {
        showAlert('error', 'Error al obtener categorías.');
      }
    } catch (error) {
      showAlert('error', 'No se pudo conectar con el servidor.');
      console.error("Error de red:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleCategorySelect = (categoryId: number) => {
    const selectedCategory = categories.find((category) => category.id === categoryId);
    if (selectedCategory) {
      setSelectedCategoryId(categoryId);
      setNewCategory({
        name: selectedCategory.name,
        description: selectedCategory.description,
        unidadMedida: selectedCategory.unidadMedida,
      });
      setActiveOption("Modificar");
    }
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const addCategory = async (): Promise<void> => {
    if (!newCategory.name || !newCategory.description || !newCategory.unidadMedida) {
      showAlert('error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        fetchCategories();
        setNewCategory({ name: "", description: "", unidadMedida: "" });
        showAlert('success', '¡Categoría agregada con éxito!');
      } else {
        const errorData = await response.json();
        console.error("Detalles del error:", errorData);
        showAlert('error', 'Error al agregar la categoría.');
      }
    } catch (error) {
      showAlert('error', 'Error de red. Verifica la conexión con el servidor.');
      console.error("Error de red:", error);
    }
  };

  const modifyCategory = async (): Promise<void> => {
    if (!selectedCategoryId) {
      showAlert('error', 'Selecciona una categoría para modificar.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${selectedCategoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        fetchCategories();
        setSelectedCategoryId(null);
        setNewCategory({ name: "", description: "", unidadMedida: "" });
        showAlert('success', 'Categoría modificada con éxito.');
      } else {
        showAlert('error', 'Error al modificar la categoría.');
      }
    } catch (error) {
      showAlert('error', 'Error de red. Verifica la conexión con el servidor.');
      console.error("Error de red:", error);
    }
  };

  const discontinueCategory = async (): Promise<void> => {
    if (!selectedCategoryId) {
      showAlert('error', 'Selecciona una categoría para descontinuar.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${selectedCategoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCategories();
        setSelectedCategoryId(null);
        showAlert('success', 'Categoría descontinuada con éxito.');
      } else {
        showAlert('error', 'Error al descontinuar la categoría.');
      }
    } catch (error) {
      showAlert('error', 'Error de red. Verifica la conexión con el servidor.');
      console.error("Error de red:", error);
    }
  };

  const renderContent = () => {
    if (activeOption === "Consultar") {
      return (
        <div>
          <h2 style={styles.title}>Consultar Categorías</h2>
          {categories.length === 0 ? (
            <p>No hay categorías disponibles.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.headerCell}>Nombre</th>
                  <th style={styles.headerCell}>Descripción</th>
                  <th style={styles.headerCell}>Unidad de Medida</th>
                  <th style={styles.headerCell}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td style={styles.cell}>{category.name}</td>
                    <td style={styles.cell}>{category.description}</td>
                    <td style={styles.cell}>{category.unidadMedida}</td>
                    <td style={styles.cell}>
                      <button
                        style={styles.modifyButton}
                        onClick={() => handleCategorySelect(category.id!)}
                      >
                        Modificar
                      </button>
                      <button
                        style={styles.deleteButton}
                        onClick={() => {
                          setSelectedCategoryId(category.id!);
                          discontinueCategory();
                        }}
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
        <h2 style={styles.title}>Categoría</h2>
        <form style={styles.form}>
          <label style={styles.label}>
            Nombre
            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Descripción
            <input
              type="text"
              name="description"
              value={newCategory.description}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Unidad de Medida
            <input
              type="text"
              name="unidadMedida"
              value={newCategory.unidadMedida}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <button
            type="button"
            onClick={activeOption === "Agregar" ? addCategory : modifyCategory}
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
      {alert && (
        <div
          style={{
            backgroundColor: alert.type === 'success' ? 'green' : 'red',
            color: 'white',
            padding: '1rem',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          {alert.message}
        </div>
      )}
      <div style={styles.pageContainer}>
        <div style={styles.sidebar}>
          {["Agregar", "Consultar", "Modificar", "Descontinuar"].map((option) => (
            <button
              key={option}
              onClick={() => setActiveOption(option)}
              style={{
                ...styles.sidebarButton,
                backgroundColor: activeOption === option ? "#555" : "#111",
              }}
            >
              {option}
            </button>
          ))}
        </div>
        <div style={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  // Estilos originales
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
  cell: {
    padding: '0.75rem',
    borderBottom: '1px solid #ddd',
  },
  modifyButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '0.5rem',
  },
  pageContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: '2rem',
  },
  sidebar: {
    width: '20%',
    backgroundColor: '#333',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    gap: '1rem',
  },
  sidebarButton: {
    padding: '1rem',
    fontSize: '1rem',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'left',
  },
  content: {
    flex: 1,
    padding: '2rem',
    backgroundColor: '#1E1E1E',
    borderRadius: '8px',
    marginLeft: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    display: 'block',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginBottom: '1rem',
    color:'#202124',
  },
  addButton: {
    padding: '0.75rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    margin: '1rem 0',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
    borderBottom: '2px solid #007bff',
    paddingBottom: '0.5rem',
    width: 'fit-content',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

};

export default Categorias;
