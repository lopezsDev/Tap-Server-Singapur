'use client';
import Link from 'next/link';
import { useState } from 'react';
import imgSinga from '../img/Singapur.png';

const Header = () => {
  const [visibleMenu, setVisibleMenu] = useState(null);

  const handleMouseEnter = (menu) => setVisibleMenu(menu);
  const handleMouseLeave = () => setVisibleMenu(null);

  return (
    <header>
      <div style={{ ...styles.header, backgroundImage: `url(${imgSinga.src})` }}>
        <div style={styles.overlay}>
          <h1 style={styles.title}>
            <Link href="/">Tap & Serve Singapur</Link>
          </h1>
        </div>
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
                <li><Link href="../../paginas/Menu">Plataforma Menu</Link></li>
                <li><Link href="/menu">Organizar por categorías</Link></li>
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
                <li><Link href="../../paginas/Productos">Agregar</Link></li>
                <li><Link href="../../paginas/Productos">Consultar</Link></li>
                <li><Link href="../../paginas/Productos">Modificar</Link></li>
                <li><Link href="../../paginas/Productos">Descontinuar</Link></li>
                <li><Link href="../../paginas/Productos">Salidas de inventario</Link></li>
                <li><Link href="../../paginas/Productos">Calculo de inventario</Link></li>
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
                <li><Link href="../../paginas/Pedidos">Registrar</Link></li>
                <li><Link href="../../paginas/Pedidos">Confirmar</Link></li>
                <li><Link href="../../paginas/Pedidos">Modificar</Link></li>
                <li><Link href="../../paginas/Pedidos">Eliminar</Link></li>
                <li><Link href="../../paginas/Pedidos">Consultar</Link></li>
                <li><Link href="../../paginas/Pedidos">Asignar Mesa</Link></li>
              </ul>
            )}
          </li>
          <li
            onMouseEnter={() => handleMouseEnter('reportes')}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="../../paginas/Reportes">📊 Reportes</Link>
            {visibleMenu === 'reportes' && (
              <ul
                style={styles.dropdown}
                onMouseEnter={() => handleMouseEnter('reportes')}
                onMouseLeave={handleMouseLeave}
              >
                <li><Link href="../../paginas/Reportes">Reporte Pedido</Link></li>
                <li><Link href="../../paginas/Reportes">Reporte Ventas</Link></li>
                <li><Link href="../../paginas/Reportes">Reporte inventario</Link></li>
                <li><Link href="../../paginas/Reportes">Cierre inventario</Link></li>
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
    height: '300px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
  },
  nav: {
    backgroundColor: '#222',
    padding: '0.5rem',
    position: 'relative',
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-around',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    color: '#FFF',
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
