import React, { ChangeEvent } from "react";

interface ProductosProps {
  styles: { [key: string]: React.CSSProperties };
  newProduct: {
    name?: string;
    description?: string;
    initialQuantity?: number;
    price?: number;
    category?: string;
  };
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addProduct: () => void;
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  popupMessage: string;
  errorPopup: boolean;
  closePopup: () => void;
}

const Productos: React.FC<ProductosProps> = ({
  styles,
  newProduct,
  handleInputChange,
  addProduct,
  showPopup,
  setShowPopup,
  popupMessage,
  errorPopup,
  closePopup,
}) => {
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
              value={newProduct.name || ""}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Descripción
            <input
              type="text"
              name="description"
              value={newProduct.description || ""}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Cantidad inicial
            <input
              type="number"
              name="initialQuantity"
              value={newProduct.initialQuantity || ""}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Precio
            <input
              type="number"
              name="price"
              value={newProduct.price || ""}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Categoría
            <input
              type="text"
              name="category"
              value={newProduct.category || ""}
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
            <button onClick={closePopup} style={styles.popupButton}>
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
            <button onClick={closePopup} style={styles.popupButton}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
