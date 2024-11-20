function Productos({ styles, newProduct, handleInputChange, addProduct, showPopup, setShowPopup }) {
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
  
        {/* Ventana emergente */}
        {showPopup && (
          <div style={styles.popupOverlay}>
            <div style={styles.popup}>
              <h3>¡Producto agregado con éxito!</h3>
              <button
                style={styles.popupButton}
                onClick={() => setShowPopup(false)}
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default Productos;
  