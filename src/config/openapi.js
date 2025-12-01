export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'API RESTful - FINAL GinoTubaro',
    version: '1.0.0',
    description: 'Documentación completa de la API RESTful. Incluye endpoints para productos, usuarios, autenticación y álbumes.',
    contact: {
      name: 'Gino Tubaro',
    },
  },
  servers: [
    {
      url: 'http://127.0.0.1:3000',
      description: 'Servidor de desarrollo local',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token JWT obtenido mediante el endpoint /api/auth/login',
      },
    },
    schemas: {
      Producto: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'ID único del producto (MongoDB ObjectId)',
            example: '692e218a586b408ab6a82008',
          },
          producto: {
            type: 'string',
            description: 'Nombre del producto',
            example: 'Impresora 3D BambuLab A1',
          },
          stockAmount: {
            type: 'integer',
            description: 'Cantidad de stock disponible',
            minimum: 0,
            example: 25,
          },
          fechaIngreso: {
            type: 'string',
            format: 'date',
            description: 'Fecha de ingreso del producto (formato YYYY-MM-DD)',
            example: '2025-01-15',
          },
        },
        required: ['producto', 'stockAmount'],
      },
      ProductoCreate: {
        type: 'object',
        properties: {
          producto: {
            type: 'string',
            description: 'Nombre del producto (requerido)',
            example: 'Impresora 3D BambuLab A1',
          },
          stockAmount: {
            type: 'integer',
            description: 'Cantidad de stock disponible (requerido, mínimo 0)',
            minimum: 0,
            example: 25,
          },
          fechaIngreso: {
            type: 'string',
            format: 'date',
            description: 'Fecha de ingreso del producto (opcional, formato YYYY-MM-DD)',
            example: '2025-01-15',
          },
        },
        required: ['producto', 'stockAmount'],
      },
      ProductoUpdate: {
        type: 'object',
        properties: {
          producto: {
            type: 'string',
            description: 'Nombre del producto',
            example: 'Laptop Dell XPS 15 Actualizada',
          },
          stockAmount: {
            type: 'integer',
            description: 'Cantidad de stock disponible (mínimo 0, incremento mínimo 1)',
            minimum: 0,
            example: 15,
          },
        },
      },
      ProductoStockIncrement: {
        type: 'object',
        properties: {
          incremento: {
            type: 'integer',
            description: 'Cantidad a incrementar en el stock (mínimo 1)',
            minimum: 1,
            example: 5,
          },
        },
        required: ['incremento'],
      },
      Usuario: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'ID único del usuario (MongoDB ObjectId)',
            example: '692e11f4a235f436ee7b9609',
          },
          nombre: {
            type: 'string',
            description: 'Nombre del usuario',
            example: 'Juan',
          },
          apellido: {
            type: 'string',
            description: 'Apellido del usuario',
            example: 'Pérez',
          },
          mail: {
            type: 'string',
            format: 'email',
            description: 'Email del usuario (único)',
            example: 'juan.perez@example.com',
          },
          edad: {
            type: 'integer',
            description: 'Edad del usuario',
            minimum: 0,
            example: 25,
          },
        },
      },
      UsuarioCreate: {
        type: 'object',
        properties: {
          nombre: {
            type: 'string',
            description: 'Nombre del usuario (requerido)',
            example: 'Juan',
          },
          apellido: {
            type: 'string',
            description: 'Apellido del usuario (requerido)',
            example: 'Pérez',
          },
          mail: {
            type: 'string',
            format: 'email',
            description: 'Email del usuario (requerido, único)',
            example: 'juan.perez@example.com',
          },
          contrasena: {
            type: 'string',
            description: 'Contraseña del usuario (requerido)',
            example: 'miPassword123',
          },
          edad: {
            type: 'integer',
            description: 'Edad del usuario (requerido, mínimo 0)',
            minimum: 0,
            example: 25,
          },
        },
        required: ['nombre', 'apellido', 'mail', 'contrasena', 'edad'],
      },
      LoginRequest: {
        type: 'object',
        properties: {
          mail: {
            type: 'string',
            format: 'email',
            description: 'Email del usuario',
            example: 'juan.perez@example.com',
          },
          contrasena: {
            type: 'string',
            description: 'Contraseña del usuario',
            example: 'miPassword123',
          },
        },
        required: ['mail', 'contrasena'],
      },
      LoginResponse: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            description: 'Token JWT para autenticación',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
          usuario: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'ID del usuario',
              },
              nombre: {
                type: 'string',
                description: 'Nombre del usuario',
              },
              mail: {
                type: 'string',
                description: 'Email del usuario',
              },
            },
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'integer',
            description: 'Código de estado HTTP',
            example: 400,
          },
          error: {
            type: 'string',
            description: 'Mensaje de error',
            example: 'El campo producto no puede estar vacío',
          },
        },
      },
      SuccessMessage: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Mensaje de éxito',
            example: 'Producto eliminado correctamente',
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'Productos',
      description: 'Endpoints para gestión de productos',
    },
    {
      name: 'Usuarios',
      description: 'Endpoints para gestión de usuarios',
    },
    {
      name: 'Autenticación',
      description: 'Endpoints para autenticación y login',
    },
    {
      name: 'Álbumes',
      description: 'Endpoints para obtener álbumes desde CSV',
    },
  ],
  paths: {
    '/api/v1/productos': {
      post: {
        tags: ['Productos'],
        summary: 'Crear un nuevo producto',
        description: 'Crea un nuevo producto en el sistema. No requiere autenticación.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductoCreate',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Producto creado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Producto',
                },
              },
            },
          },
          '400': {
            description: 'Error de validación',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      get: {
        tags: ['Productos'],
        summary: 'Listar todos los productos',
        description: 'Obtiene una lista de todos los productos disponibles. No requiere autenticación.',
        responses: {
          '200': {
            description: 'Lista de productos obtenida exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Producto',
                  },
                },
              },
            },
          },
          '500': {
            description: 'Error del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/productos/{id}': {
      get: {
        tags: ['Productos'],
        summary: 'Obtener un producto por ID',
        description: 'Obtiene los detalles de un producto específico por su ID. No requiere autenticación.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID del producto (MongoDB ObjectId)',
            schema: {
              type: 'string',
            },
            example: '692e218a586b408ab6a82008',
          },
        ],
        responses: {
          '200': {
            description: 'Producto encontrado',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Producto',
                },
              },
            },
          },
          '400': {
            description: 'ID de producto inválido',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'Producto no encontrado',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Productos'],
        summary: 'Actualizar un producto',
        description: 'Actualiza un producto existente. Requiere autenticación JWT. El stockAmount debe incrementarse en al menos 1.',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID del producto (MongoDB ObjectId)',
            schema: {
              type: 'string',
            },
            example: '692e218a586b408ab6a82008',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductoUpdate',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Producto actualizado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Producto',
                },
              },
            },
          },
          '400': {
            description: 'Error de validación o ID inválido',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '401': {
            description: 'No autorizado - Token JWT requerido',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'Producto no encontrado',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Productos'],
        summary: 'Eliminar un producto',
        description: 'Elimina un producto del sistema. Requiere autenticación JWT.',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID del producto (MongoDB ObjectId)',
            schema: {
              type: 'string',
            },
            example: '692e218a586b408ab6a82008',
          },
        ],
        responses: {
          '200': {
            description: 'Producto eliminado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SuccessMessage',
                },
              },
            },
          },
          '400': {
            description: 'ID de producto inválido',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '401': {
            description: 'No autorizado - Token JWT requerido',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'Producto no encontrado',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/productos/{id}/stock': {
      patch: {
        tags: ['Productos'],
        summary: 'Incrementar stock de un producto',
        description: 'Incrementa el stock del producto en la cantidad indicada. Requiere autenticación JWT. El incremento mínimo es 1.',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID del producto (MongoDB ObjectId)',
            schema: {
              type: 'string',
            },
            example: '692e218a586b408ab6a82008',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductoStockIncrement',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Stock incrementado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Producto',
                },
              },
            },
          },
          '400': {
            description: 'Error de validación o ID inválido',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '401': {
            description: 'No autorizado - Token JWT requerido',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'Producto no encontrado',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Autenticación'],
        summary: 'Iniciar sesión',
        description: 'Autentica un usuario y devuelve un token JWT para usar en endpoints protegidos.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login exitoso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginResponse',
                },
              },
            },
          },
          '401': {
            description: 'Credenciales inválidas',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/usuarios': {
      post: {
        tags: ['Usuarios'],
        summary: 'Crear un nuevo usuario',
        description: 'Crea un nuevo usuario en el sistema. No requiere autenticación.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UsuarioCreate',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Usuario creado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Usuario',
                },
              },
            },
          },
          '400': {
            description: 'Error de validación o email duplicado',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      get: {
        tags: ['Usuarios'],
        summary: 'Listar todos los usuarios',
        description: 'Obtiene una lista de todos los usuarios registrados. No requiere autenticación.',
        responses: {
          '200': {
            description: 'Lista de usuarios obtenida exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Usuario',
                  },
                },
              },
            },
          },
          '500': {
            description: 'Error del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/usuarios/{id}': {
      get: {
        tags: ['Usuarios'],
        summary: 'Obtener un usuario por ID',
        description: 'Obtiene los detalles de un usuario específico por su ID. No requiere autenticación.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID del usuario (MongoDB ObjectId)',
            schema: {
              type: 'string',
            },
            example: '692e11f4a235f436ee7b9609',
          },
        ],
        responses: {
          '200': {
            description: 'Usuario encontrado',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Usuario',
                },
              },
            },
          },
          '404': {
            description: 'Usuario no encontrado',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/albums/csv': {
      get: {
        tags: ['Álbumes'],
        summary: 'Obtener álbumes en formato CSV',
        description: 'Obtiene los álbumes desde un archivo CSV y los devuelve como descarga. No requiere autenticación.',
        responses: {
          '200': {
            description: 'Archivo CSV descargado exitosamente',
            content: {
              'text/csv': {
                schema: {
                  type: 'string',
                  format: 'binary',
                },
              },
            },
            headers: {
              'Content-Disposition': {
                schema: {
                  type: 'string',
                  example: 'attachment; filename="albums_15.csv"',
                },
              },
            },
          },
          '500': {
            description: 'Error del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
  },
};

