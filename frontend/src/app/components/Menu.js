// components/Menú.js
import React from 'react';

const Menu = () => {
  // Define las categorías en la parte superior
  const categories = ['Bocas', 'Bebidas', 'Comidas Rápida', 'Entradas', 'Pastas', 'Arroces', 'Hamburguesas'];
  const rows = Array(10).fill(''); // 10 filas vacías

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarOption}>Plataforma Menú</div>
        <div style={styles.sidebarOption}>Organizar por Categorías</div>
      </div>
      <div style={styles.grid}>
        <div style={styles.headerRow}>
          {categories.map((category, index) => (
            <div key={index} style={styles.headerCell}>
              {category} <span style={styles.dropdownIcon}>▼</span>
            </div>
          ))}
        </div>
        {rows.map((_, rowIndex) => (
          <div key={rowIndex} style={styles.row}>
            {categories.map((_, colIndex) => (
              <div key={colIndex} style={styles.cell} contentEditable />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#333', // Fondo negro para la tabla
    color: '#FFF', // Texto blanco
    fontFamily: 'Arial, sans-serif',
  },
  sidebar: {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#000', // Fondo negro para la barra lateral
    padding: '1rem',
  },
  sidebarOption: {
    marginBottom: '2rem',
    writingMode: 'vertical-rl', // Texto vertical
    textOrientation: 'mixed',
    transform: 'rotate(180deg)', // Invierte el texto para leer de abajo hacia arriba
    fontSize: '1.2rem',
    color: '#FFF',
  },
  grid: {
    flex: 1,
    overflow: 'auto',
  },
  headerRow: {
    display: 'flex',
    backgroundColor: '#555', // Fondo gris oscuro para la fila de encabezado
    borderBottom: '1px solid #444',
  },
  headerCell: {
    flex: 1,
    padding: '1rem',
    textAlign: 'center',
    fontWeight: 'bold',
    position: 'relative',
  },
  dropdownIcon: {
    fontSize: '0.8rem',
    marginLeft: '0.5rem',
  },
  row: {
    display: 'flex',
    borderBottom: '1px solid #444',
  },
  cell: {
    flex: 1,
    padding: '1rem',
    textAlign: 'center',
    borderRight: '1px solid #444',
    outline: 'none',
    backgroundColor: '#222',
    color: '#FFF',
    cursor: 'text',
  },
};

export default Menú;
