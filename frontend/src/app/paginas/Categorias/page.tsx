'use client';
import { ChangeEvent, useState } from 'react';
import Header from '../../components/Header';

interface Category {
  name: string;
  description: string;
  unit: string;
}

const Categorias: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({
    name: "",
    description: "",
    unit: "",
  });
  const [activeOption, setActiveOption] = useState<string>("Agregar");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Manejar cambios en el formulario
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  // Agregar categoría
  const addCategory = (): void => {
    if (!newCategory.name || !newCategory.description || !newCategory.unit) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (categories.some((category) => category.name === newCategory.name)) {
      alert("¡El nombre de la categoría ya existe!");
      return;
    }

    setCategories([...categories, { ...newCategory }]);
    setNewCategory({ name: "", description: "", unit: "" });
    alert("¡Categoría agregada con éxito!");
  };

  // Modificar categoría
  const modifyCategory = (): void => {
    if (!selectedCategory || !newCategory.name) {
      alert("Selecciona una categoría para modificar.");
      return;
    }

    const updatedCategories = categories.map((category) =>
      category.name === selectedCategory ? { ...newCategory } : category
    );
    setCategories(updatedCategories);
    setSelectedCategory(null);
    setNewCategory({ name: "", description: "", unit: "" });
    alert("Categoría modificada con éxito.");
  };

  // Descontinuar categoría
  const discontinueCategory = (): void => {
    if (!selectedCategory) {
      alert("Selecciona una categoría para descontinuar.");
      return;
    }

    setCategories(categories.filter((category) => category.name !== selectedCategory));
    setSelectedCategory(null);
    alert("Categoría descontinuada con éxito.");
  };

  // Renderizar contenido basado en la opción activa
  const renderContent = () => {
    if (activeOption === "Consultar") {
      return (
        <div>
          <h2>Consultar Categorías</h2>
          {categories.length === 0 ? (
            <p>No hay categorías disponibles.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.headerCell}>Nombre</th>
                  <th style={styles.headerCell}>Descripción</th>
                  <th style={styles.headerCell}>Unidad</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td style={styles.cell}>{category.name}</td>
                    <td style={styles.cell}>{category.description}</td>
                    <td style={styles.cell}>{category.unit}</td>
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
        <h2>{activeOption} Categoría</h2>
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
              name="unit"
              value={newCategory.unit}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <button
            type="button"
            onClick={
              activeOption === "Agregar"
                ? addCategory
                : activeOption === "Modificar"
                ? modifyCategory
                : discontinueCategory
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
          {["Agregar", "Consultar", "Modificar", "Descontinuar"].map(
            (option) => (
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
            )
          )}
        </div>
        <div style={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
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
  },
  addButton: {
    padding: '0.75rem',
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
  cell: {
    padding: '0.75rem',
    borderBottom: '1px solid #ddd',
  },
};

export default Categorias;
