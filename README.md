# API RESTful - Sistema de Gestión de Productos y Usuarios

API RESTful desarrollada con Node.js y Express que implementa un sistema de gestión de productos y usuarios, con soporte para múltiples proveedores de base de datos mediante el patrón Repository.

## 🚀 Características Principales

- ✅ **CRUD completo** de productos y usuarios
- ✅ **Sistema de autenticación JWT** para endpoints protegidos
- ✅ **Patrón Repository** para abstracción de datos
- ✅ **Sistema de fallback automático**: MongoDB → JSON
- ✅ **Múltiples proveedores de BD**: MongoDB y JSON
- ✅ **Documentación interactiva** con Scalar (OpenAPI)
- ✅ **Validaciones** completas de datos
- ✅ **Endpoint de álbumes** desde archivo CSV

## 📋 Requisitos Previos

- Node.js >= 14.0.0
- npm >= 6.0.0
- MongoDB (opcional, solo si usas modo `mongo`)

## 📦 Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd tp2
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno (crear archivo `.env` en la raíz):
```env
# Configuración del servidor
PORT=3000
HOST=127.0.0.1

# Configuración de MongoDB (requerido solo para modo mongo)
MONGO_URI=mongodb://localhost:27017/nombre_de_base_datos

# Secret para JWT
JWT_SECRET=tu_clave_secreta_super_segura

# Proveedor de base de datos: "mongo" | "json" (por defecto: "mongo")
DB_PROVIDER=mongo
```

## 🗄️ Modos de Base de Datos

El proyecto soporta dos modos de almacenamiento de datos, configurable mediante la variable de entorno `DB_PROVIDER`:

### Modo MongoDB (`DB_PROVIDER=mongo`)

Usa MongoDB como base de datos principal. Si la conexión falla, automáticamente cambia a modo JSON como respaldo.

**Requisitos:**
- MongoDB instalado y corriendo
- Variable `MONGO_URI` configurada en `.env`

**Ventajas:**
- Base de datos robusta y escalable
- Soporte para consultas complejas
- Transacciones ACID

### Modo JSON (`DB_PROVIDER=json`)

Usa un archivo JSON local (`database/database.json`) como almacenamiento.

**Ventajas:**
- No requiere instalación de MongoDB
- Ideal para desarrollo y pruebas
- Fácil de respaldar y versionar
- Sin configuración adicional

**Nota:** El archivo `database/database.json` se crea automáticamente si no existe.

---

## 🚀 Cómo Levantar el Proyecto

### Opción 1: Modo MongoDB

1. **Asegúrate de tener MongoDB corriendo** en tu sistema.

2. **Configura las variables de entorno** en tu archivo `.env`:
```env
DB_PROVIDER=mongo
MONGO_URI=mongodb://localhost:27017/mi_base_datos
PORT=3000
HOST=127.0.0.1
JWT_SECRET=mi_clave_secreta
```

3. **Inicia el servidor**:
```bash
npm start
```

O en modo desarrollo con auto-reload:
```bash
npm run dev
```

4. **Verifica la conexión**: En la consola deberías ver:
```
✅ Mongoose connected
✅ Conexión establecida con MongoDB
El server esta andando en: http://127.0.0.1:3000 y en /api-docs esta la documentacion de la API.
Modo de base de datos: mongo
```

**⚠️ Fallback Automático:** Si MongoDB no está disponible o la conexión falla, verás:
```
❌ Error conectando a MongoDB: <mensaje de error>
⚠️  Cambiando a modo JSON como respaldo
El server esta andando en: http://127.0.0.1:3000...
Modo de base de datos: mongo
```

En este caso, el sistema automáticamente usará el repositorio JSON como respaldo, sin necesidad de reiniciar el servidor.

---

### Opción 2: Modo JSON

1. **Configura las variables de entorno** en tu archivo `.env`:
```env
DB_PROVIDER=json
PORT=3000
HOST=127.0.0.1
JWT_SECRET=mi_clave_secreta
```

**Nota:** No necesitas `MONGO_URI` cuando usas modo JSON.

2. **Inicia el servidor**:
```bash
npm start
```

O en modo desarrollo:
```bash
npm run dev
```

3. **Verifica el modo**: En la consola deberías ver:
```
⚠️  DB_PROVIDER está configurado como "json", omitiendo conexión a MongoDB
📄 Usando modo JSON (DB_PROVIDER=json)
El server esta andando en: http://127.0.0.1:3000...
Modo de base de datos: json
```

4. **Estructura del archivo JSON**: El archivo `database/database.json` se creará automáticamente con esta estructura:
```json
{
  "productos": [],
  "usuarios": []
}
```

---

### Resumen de Comandos

| Modo | Variable de Entorno | Comando | Base de Datos |
|------|---------------------|---------|---------------|
| MongoDB | `DB_PROVIDER=mongo` | `npm start` | MongoDB (con fallback a JSON) |
| JSON | `DB_PROVIDER=json` | `npm start` | `database/database.json` |

---

## 📁 Estructura del Proyecto

```
tp2/
├── src/
│   ├── auth/                    # Utilidades de autenticación JWT
│   ├── config/                  # Configuración (config.js, openapi.js)
│   ├── controllers/             # Controladores de la API
│   ├── databases/               # Conexiones y repositorios base
│   │   ├── mongo.cnx.js        # Conexión a MongoDB
│   │   └── json.repository.js  # Repositorio base JSON
│   ├── middlewares/             # Middlewares (auth, errores)
│   ├── models/                  # Modelos de Mongoose
│   ├── repository/              # Repositorios (patrón Repository)
│   │   ├── producto.repository.js           # Repositorio MongoDB productos
│   │   ├── producto.json.repository.js      # Repositorio JSON productos
│   │   ├── producto.repository.factory.js   # Factory selector
│   │   ├── usuario.repository.js            # Repositorio MongoDB usuarios
│   │   ├── usuario.json.repository.js       # Repositorio JSON usuarios
│   │   └── usuario.repository.factory.js    # Factory selector
│   ├── routes/                  # Rutas de Express
│   ├── services/                # Lógica de negocio
│   └── server.js                # Configuración del servidor Express
├── database/
│   ├── albums_15.csv           # Archivo CSV de álbumes
│   └── database.json           # Base de datos JSON (se crea automáticamente)
├── tests/
│   └── test.endpoints.http     # Archivo para probar endpoints con REST Client
├── app.js                       # Punto de entrada de la aplicación
├── package.json
└── README.md
```

---

## 🔌 Endpoints Disponibles

### Autenticación
- `POST /api/usuarios` - Crear nuevo usuario
- `POST /api/auth/login` - Iniciar sesión (obtener token JWT)

### Productos
- `GET /api/v1/productos` - Listar todos los productos
- `GET /api/v1/productos/:id` - Obtener producto por ID
- `POST /api/v1/productos` - Crear producto (público)
- `PUT /api/v1/productos/:id` - Actualizar producto (requiere JWT)
- `DELETE /api/v1/productos/:id` - Eliminar producto (requiere JWT)

### Usuarios
- `GET /api/usuarios` - Listar todos los usuarios
- `GET /api/usuarios/:id` - Obtener usuario por ID
- `POST /api/usuarios` - Crear nuevo usuario
- `PUT /api/usuarios/:id/edad` - Incrementar edad del usuario

### Álbumes
- `GET /api/v1/albums/csv` - Obtener álbumes desde archivo CSV

### Documentación
- `GET /api-docs` - Documentación interactiva de la API (Scalar)
- `GET /openapi.json` - Especificación OpenAPI en formato JSON

---

## 🔐 Autenticación

Para acceder a endpoints protegidos, necesitas:

1. **Crear un usuario** (si no existe):
```bash
POST /api/usuarios
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "mail": "juan@example.com",
  "contrasena": "password123",
  "edad": 30
}
```

2. **Obtener token JWT** mediante login:
```bash
POST /api/auth/login
{
  "mail": "juan@example.com",
  "contrasena": "password123"
}
```

3. **Usar el token** en requests protegidos:
```
Authorization: Bearer <tu_token_jwt>
```

---

## 📚 Documentación Interactiva

Una vez que el servidor esté corriendo, accede a la documentación interactiva en:

**http://127.0.0.1:3000/api-docs**

Aquí podrás:
- Ver todos los endpoints disponibles
- Probar los endpoints directamente desde el navegador
- Ver ejemplos de requests y responses
- Entender los esquemas de datos

---

## 🏗️ Arquitectura: Patrón Repository

El proyecto implementa el **patrón Repository** para abstraer la lógica de acceso a datos:

### Estructura

```
Services (Lógica de Negocio)
    ↓
Factory (Selecciona el repositorio según DB_PROVIDER)
    ↓
Repositories (Abstracción de datos)
    ↓
Data Sources (MongoDB o JSON)
```

### Ventajas

1. **Desacoplamiento**: Los servicios no conocen el origen de datos
2. **Flexibilidad**: Fácil cambiar entre MongoDB y JSON
3. **Testabilidad**: Fácil mockear repositorios para tests
4. **Mantenibilidad**: Cambios en la BD no afectan la lógica de negocio

### Factory Pattern

Los factories (`producto.repository.factory.js` y `usuario.repository.factory.js`) seleccionan automáticamente el repositorio correcto:

- Si `DB_PROVIDER=json` → Usa repositorio JSON
- Si `DB_PROVIDER=mongo` y MongoDB está conectado → Usa repositorio MongoDB
- Si `DB_PROVIDER=mongo` y MongoDB falla → Usa repositorio JSON (fallback automático)

---

## 🔄 Sistema de Fallback Automático

El sistema incluye un mecanismo de fallback inteligente:

1. **Configuración inicial**: Si `DB_PROVIDER=mongo`, intenta conectar a MongoDB
2. **Conexión exitosa**: Usa MongoDB normalmente
3. **Conexión fallida**: 
   - Muestra mensaje de error en consola
   - Cambia automáticamente a modo JSON
   - El servidor continúa funcionando sin interrupciones

**Ejemplo de salida en consola cuando MongoDB falla:**
```
❌ Error conectando a MongoDB: connect ECONNREFUSED 127.0.0.1:27017
⚠️  Cambiando a modo JSON como respaldo
El server esta andando en: http://127.0.0.1:3000...
Modo de base de datos: mongo
```

---

## 🧪 Pruebas

El proyecto incluye un archivo `tests/test.endpoints.http` con ejemplos de todas las peticiones. Puedes usarlo con extensiones como **REST Client** de VS Code.

### Ejemplo de uso:

1. Abre `tests/test.endpoints.http` en VS Code
2. Instala la extensión "REST Client"
3. Haz clic en "Send Request" sobre cada petición

**Nota:** Recuerda actualizar las variables `@token` y `@productoId` con valores reales después de crear un usuario y un producto.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **Mongoose** - ODM para MongoDB
- **JWT (jsonwebtoken)** - Autenticación
- **bcryptjs** - Hash de contraseñas
- **@scalar/express-api-reference** - Documentación interactiva
- **OpenAPI** - Especificación de API

---

## 📝 Notas Importantes

1. **Archivo `database.json`**: Este archivo se crea automáticamente cuando usas modo JSON. Está en `.gitignore` para evitar subir datos sensibles al repositorio.

2. **IDs**: 
   - MongoDB usa ObjectIds (24 caracteres hexadecimales)
   - JSON usa IDs generados con crypto (24 caracteres hexadecimales)
   - Ambos formatos son compatibles entre sí

3. **Validaciones**: Las validaciones de ObjectId solo se aplican cuando se usa MongoDB. En modo JSON, cualquier string válido es aceptado como ID.

4. **Contraseñas**: Las contraseñas se almacenan hasheadas con bcrypt (10 salt rounds).

---

## 📄 Licencia

AGPL-version-3.0

---

## 👤 Autor

Gino Tubaro

---

## 🆘 Troubleshooting

### Error: "MongoDB connection failed"
**Solución:** 
- Verifica que MongoDB esté corriendo: `mongod`
- Revisa la URI en `.env`: `MONGO_URI=mongodb://localhost:27017/db_name`
- El sistema automáticamente usará JSON como fallback

### Error: "Cannot find module"
**Solución:**
```bash
npm install
```

### Puerto 3000 ya en uso
**Solución:** Cambia el puerto en `.env`:
```env
PORT=3001
```

### Problemas con tokens JWT
**Solución:** 
- Verifica que `JWT_SECRET` esté configurado en `.env`
- Asegúrate de usar el formato correcto: `Authorization: Bearer <token>`

---

## 📞 Soporte

Para más información o soporte, consulta la documentación interactiva en `/api-docs` o revisa el código fuente.

