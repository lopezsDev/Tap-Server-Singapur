// Header.js
'use client';
import Link from 'next/link';
import { useState } from 'react';
import imgSinga from '../img/Singapur.png';

const Header = () => {
  const [visibleMenu, setVisibleMenu] = useState(null);

  const handleMouseEnter = (menu) => setVisibleMenu(menu);
  const handleMouseLeave = () => setVisibleMenu(null);

  return (
    <header style={{ ...styles.header, backgroundImage: imgSinga }}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>
          <Link href="localhost:3000">Tap & Serve Singapur</Link>
        </h1>
      </div>
      <nav style={styles.nav}>
        <ul style={styles.menu}>
          <li
            onMouseEnter={() => handleMouseEnter('menu')}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="../../paginas/Menu">🍴 Menu</Link>
            {visibleMenu === 'menu' && (
              <ul
                style={styles.dropdown}
                onMouseEnter={() => handleMouseEnter('menu')}
                onMouseLeave={handleMouseLeave}
              >
                <li>
                  <Link href="../../paginas/Menu">Plataforma Menu</Link>
                </li>
                <li>
                  <Link href="/menu">Organizar por categorías</Link>
                </li>
              </ul>
            )}
          </li>
          <li
            onMouseEnter={() => handleMouseEnter('categorias')}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="../../paginas/Categorias">🍃 Categorías</Link>
            {visibleMenu === 'categorias' && (
              <ul
                style={styles.dropdown}
                onMouseEnter={() => handleMouseEnter('categorias')}
                onMouseLeave={handleMouseLeave}
              >
                <li><Link href="../../paginas/Categorias">Agregar</Link></li>
                <li><Link href="../../paginas/Categorias">Consultar</Link></li>
                <li><Link href="../../paginas/Categorias">Modificar</Link></li>
                <li><Link href="../../paginas/Categorias">Descontinuar</Link></li>
              </ul>
            )}
          </li>
          <li
            onMouseEnter={() => handleMouseEnter('productos')}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="../../paginas/Productos">🍸 Productos</Link>
            {visibleMenu === 'productos' && (
              <ul
                style={styles.dropdown}
                onMouseEnter={() => handleMouseEnter('productos')}
                onMouseLeave={handleMouseLeave}
              >
                <li><Link href="../../paginas/productos">Agregar</Link></li>
                <li><Link href="../../paginas/productos">Consultar</Link></li>
                <li><Link href="../../paginas/productos">Modificar</Link></li>
                <li><Link href="../../paginas/productos">Descontinuar</Link></li>
                <li><Link href="../../paginas/productos">Salidas de inventario</Link></li>
                <li><Link href="../../paginas/productos">Calculo de inventario</Link></li>
              </ul>
            )}
          </li>
          <li
            onMouseEnter={() => handleMouseEnter('pedidos')}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="../../paginas/Pedidos">📦 Pedidos</Link>
            {visibleMenu === 'pedidos' && (
              <ul
                style={styles.dropdown}
                onMouseEnter={() => handleMouseEnter('pedidos')}
                onMouseLeave={handleMouseLeave}
              >
                <li><Link href="../../paginas/pedidos">Registrar</Link></li>
                <li><Link href="../../paginas/pedidos">Confirmar</Link></li>
                <li><Link href="../../paginas/pedidos">Modificar</Link></li>
                <li><Link href="../../paginas/pedidos">Eliminar</Link></li>
                <li><Link href="../../paginas/pedidos">Consultar</Link></li>
                <li><Link href="../../paginas/pedidos">Asignar Mesa</Link></li>
              </ul>
            )}
          </li>
          <li
            onMouseEnter={() => handleMouseEnter('reportes')}
            onMouseLeave={handleMouseLeave}
          >
            📊 Reportes
            {visibleMenu === 'reportes' && (
              <ul
                style={styles.dropdown}
                onMouseEnter={() => handleMouseEnter('reportes')}
                onMouseLeave={handleMouseLeave}
              >
                <li><Link href="../../paginas/reportes">Reporte Pedido</Link></li>
                <li><Link href="../../paginas/reportes">Reporte Ventas</Link></li>
                <li><Link href="../../paginas/reportes">Reporte inventario</Link></li>
                <li><Link href="../../paginas/reportes">Cierre inventario</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    position: 'relative',
    textAlign: 'center',
    height: '300px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'relative',
    padding: '2rem 0',
    backgroundColor: 'rgba(0, 0, 0, 1)', // Da opacidad al fondo
  },
  title: {
    color: '#FFFFFF',
    fontSize: '2rem',
    fontWeight: 'bold',
    zIndex: 1,
  },
  nav: {
    backgroundColor: '#222',
    padding: '0.5rem',
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-around',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    color: '#FFF',
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#333',
    listStyleType: 'none',
    padding: '0.5rem',
    marginTop: '0.5rem',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    borderRadius: '4px',
  },
};

export default Header;
