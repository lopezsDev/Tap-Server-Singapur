<div align="center">
  <img src="/api/placeholder/200/200" alt="Tap & Serve Logo" width="200"/>
  
  # 🍺 Tap & Serve Singapur 🍽️
  
  [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
  [![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black.svg)](https://nextjs.org/)
  [![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)

  <p align="center">
    <em>Una potente solución de gestión para bares y restaurantes construida con tecnologías modernas</em>
  </p>
</div>

---

## 📋 Tabla de Contenidos

- [🚀 Características](#-características)
- [⚙️ Tecnologías](#️-tecnologías)
- [📦 Instalación](#-instalación)
- [🛠️ Configuración](#️-configuración)
- [🏃‍♂️ Ejecución](#️-ejecución)
- [📱 Endpoints API](#-endpoints-api)
- [🧪 Tests](#-tests)
- [📄 Licencia](#-licencia)
- [👥 Contribución](#-contribución)
- [📞 Contacto](#-contacto)

## 🚀 Características

- ✨ Gestión integral de pedidos en tiempo real
- 📊 Dashboard administrativo con estadísticas
- 🏷️ Control de inventario y stock
- 👥 Gestión de personal y turnos
- 💰 Sistema de facturación integrado
- 🔐 Autenticación y autorización robusta
- 📱 Diseño responsivo y adaptable
- 🌐 Soporte multiidioma

## ⚙️ Tecnologías

### Backend
- **Spring Boot 3.2.0** - Framework de desarrollo
- **Java 17** - Lenguaje de programación
- **Spring Security** - Seguridad y autenticación
- **Spring Data JPA** - Persistencia de datos
- **PostgreSQL** - Base de datos
- **Maven** - Gestión de dependencias
- **Swagger** - Documentación API

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Redux Toolkit** - Gestión de estado
- **React Query** - Gestión de datos del servidor
- **Jest** - Testing

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/tap-serve-singapur.git

# Acceder al directorio
cd tap-serve-singapur

# Backend
cd backend
mvn clean install

# Frontend
cd ../frontend
npm install
```

## 🛠️ Configuración

### Variables de Entorno Backend

```properties
# application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tapserve
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Variables de Entorno Frontend

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_SOCKET_URL=ws://localhost:8080/ws
```

## 🏃‍♂️ Ejecución

```bash
# Backend
cd backend
mvn spring-boot:run

# Frontend
cd frontend
npm run dev
```

## 📱 Endpoints API

<details>
<summary>👆 Click para ver los endpoints</summary>

```markdown
# Categoria
GET /api/categories
GET /api/categories/{id}
POST /api/categories
PUT /api/categories/{id}
DELETE /api/categories/{id}

# Productos
GET /api/products
GET /api/products/{id}
POST /api/products
PUT /api/products/{id}
DELETE /api/products/{id}
```
</details>

## 🧪 Tests

```bash
# Backend
mvn test

# Frontend
npm run test
```

## 👥 Contribución

Las contribuciones son bienvenidas. Por favor, lea [CONTRIBUTING.md](CONTRIBUTING.md) para detalles sobre nuestro código de conducta y el proceso para enviarnos pull requests.

1. Fork del repositorio
2. Cree una rama para su característica (`git checkout -b feature/AmazingFeature`)
3. Commit de sus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abra un Pull Request

## 📞 Contacto

<div align="center">
  <p>¿Tienes preguntas o sugerencias? ¡No dudes en contactarme!</p>
  
  <a href="mailto:lopezs.dev@gmail.com">
    <img src="https://img.shields.io/badge/Email-lopezs.dev%40gmail.com-red?style=for-the-badge&logo=gmail" alt="Email"/>
  </a>
  
  <p>
    👨‍💻 Desarrollado con ❤️ por <strong>Samir López M</strong>
  </p>

  <p>
    <a href="https://github.com/lopezDev">
      <img src="https://img.shields.io/github/followers/tu-usuario?label=follow&style=social" alt="GitHub"/>
    </a>
  </p>
</div>

---

<div align="center">
  <sub>¿Te gusta Tap & Serve? ¡Dale una ⭐️!</sub>
</div>
