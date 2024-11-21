import { useState } from "react";

function Productos({ styles }) {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    initialQuantity: "",
    price: "",
    category: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Función para agregar un nuevo producto con validación
  const addProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.initialQuantity || !newProduct.price || !newProduct.category) {
      setPopupMessage("Por favor, completa todos los campos.");
      setErrorPopup(true);
      return;
    }

    if (products.some((product) => product.name === newProduct.name)) {
      setPopupMessage("¡El nombre del producto ya existe, verifica el nombre del producto ingresado!");
      setErrorPopup(true);
      return;
    }

    setProducts([
      ...products,
      {
        id: Date.now(),
        ...newProduct,
        initialQuantity: parseInt(newProduct.initialQuantity),
        price: parseFloat(newProduct.price),
      },
    ]);
    setNewProduct({
      name: "",
      description: "",
      initialQuantity: "",
      price: "",
      category: "",
    });
    setPopupMessage("¡Producto agregado con éxito!");
    setShowPopup(true);
  };

  // Función para consultar productos
  const consultarProductos = () => {
    console.log("Productos:", products);
  };

  // Función para modificar un producto (ejemplo básico)
  const modificarProducto = (id, updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, ...updatedProduct } : product
    );
    setProducts(updatedProducts);
  };

  // Función para registrar salidas de inventario
  const registrarSalida = (id, cantidad) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, initialQuantity: product.initialQuantity - cantidad }
        : product
    );
    setProducts(updatedProducts);
  };

  // Función para calcular inventario total
  const calcularInventario = () => {
    const total = products.reduce(
      (sum, product) => sum + product.initialQuantity * product.price,
      0
    );
    console.log("Inventario total:", total);
  };

  return (
    <div style={styles.container}>
      <div style={styles.Container}>
        <h2 style={styles.title}>Agregar Producto</h2>
        <form style={styles.form}>
          <label style={styles.label}>
            Nombre
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Descripción
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Cantidad inicial
            <input
              type="number"
              name="initialQuantity"
              value={newProduct.initialQuantity}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Precio
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Categoría
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <button type="button" onClick={addProduct} style={styles.addButton}>
            Agregar producto
          </button>
        </form>
      </div>

      {/* Ventana emergente de éxito */}
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>{popupMessage}</h3>
            <button
              style={styles.popupButton}
              onClick={() => setShowPopup(false)}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* Ventana emergente de error */}
      {errorPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>{popupMessage}</h3>
            <button
              style={styles.popupButton}
              onClick={() => setErrorPopup(false)}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* Funciones adicionales */}
      <div style={styles.additionalActions}>
        <button onClick={consultarProductos} style={styles.actionButton}>
          Consultar Productos
        </button>
        <button onClick={() => modificarProducto(1, { name: "Nuevo Nombre" })} style={styles.actionButton}>
          Modificar Producto
        </button>
        <button onClick={() => registrarSalida(1, 5)} style={styles.actionButton}>
          Salidas de Inventario
        </button>
        <button onClick={calcularInventario} style={styles.actionButton}>
          Cálculo de Inventario
        </button>
      </div>
    </div>
  );
}

export default Productos;
