import Link from 'next/link';
import { CSSProperties } from 'react';
import Header from './components/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Tarjeta de Menú */}
          <div style={styles.card}>
            <div style={styles.imagePlaceholder} />
            <div style={styles.textContent}>
              <h2 style={styles.title}>Menú</h2>
              <p style={styles.description}>Mejora, cambia o gestiona los menús</p>
              <button style={styles.button}><Link href="./paginas/Menu">Ir a la pagina</Link></button>
            </div>
          </div>
          {/* Tarjeta de Categorías */}
          <div style={styles.card}>
            <div style={styles.imagePlaceholder} />
            <div style={styles.textContent}>
              <h2 style={styles.title}>Categorías</h2>
              <p style={styles.description}>Cambia las categorías de productos dentro de tus menús</p>
              <button style={styles.button}><Link href="./paginas/Categorias">Ir a la pagina</Link></button>
            </div>
          </div>

          {/* Tarjeta de Productos */}
          <div style={styles.card}>
            <div style={styles.imagePlaceholder} />
            <div style={styles.textContent}>
              <h2 style={styles.title}>Productos</h2>
              <p style={styles.description}>Añade, cambia o gestiona los productos.</p>
              <button style={styles.button}><Link href="./paginas/Productos">Ir a la pagina</Link></button>
            </div>
          </div>

          {/* Tarjeta de Pedidos */}
          <div style={styles.card}>
            <div style={styles.imagePlaceholder} />
            <div style={styles.textContent}>
              <h2 style={styles.title}>Pedidos</h2>
              <p style={styles.description}>Consulta, realiza, modifica los pedidos de tu negocio</p>
              <button style={styles.button}><Link href="./paginas/Pedidos">Ir a la pagina</Link></button>
            </div>
          </div>

          {/* Tarjeta de Reportes */}
          <div style={styles.card}>
            <div style={styles.imagePlaceholder} />
            <div style={styles.textContent}>
              <h2 style={styles.title}>Reportes</h2>
              <p style={styles.description}>Añade, cambia o crea un reporte.</p>
              <button style={styles.button}><Link href="./paginas/Reportes">Ir a la pagina</Link></button>
            </div>
          </div>

          {/* Sección de Administrador */}
          <div style={styles.card}>
            <div style={styles.textContentCentered}>
              <h2 style={styles.title}>¿Eres administrador? Entra aquí.</h2>
              <button style={styles.button}>Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#000',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    width: '100%',
    maxWidth: '1200px',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#333',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  imagePlaceholder: {
    width: '200px',
    height: '200px',
    backgroundColor: '#222',
    borderRadius: '8px',
    marginRight: '2rem',
  },
  textContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  textContentCentered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: 0,
  },
  description: {
    fontSize: '1.2rem',
    color: '#666',
    margin: '1rem 0',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    color: '#ffffff',
    backgroundColor: '#222',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
