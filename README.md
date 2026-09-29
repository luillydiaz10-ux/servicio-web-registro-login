# Servicio Web de Registro e Inicio de Sesión - Postman API

**Evidencia:** GA7-220501096-AA5-EV01 — Diseño y desarrollo de servicios web - caso // API. GA7-220501096-AA5-EV02. - Crea servicios web para disponer de métodos reutilizables en el software. 
**Componente formativo:** Construcción API
**Aprendiz:** Andrey Esteban Cano Puerta

## Descripción del caso

Se requiere un servicio web para el registro y el inicio de sesión de usuarios.
El servicio recibe un usuario y una contraseña:

- Si la autenticación es correcta, responde con un mensaje de **autenticación satisfactoria**.
- Si la autenticación es incorrecta, responde con un mensaje de **error en la autenticación**.

## Tecnologías utilizadas

- **Node.js** + **Express**: framework para construir el servicio web (API REST).
- **bcryptjs**: para encriptar (hashear) las contraseñas antes de almacenarlas.
- **cors**: para permitir el consumo del servicio desde otros orígenes (por ejemplo, la interfaz de prueba en `public/index.html`).
- **Git**: como herramienta de versionamiento del proyecto.

## Estructura del proyecto

```
proyecto/
├── src/
│   ├── server.js      # Punto de entrada del servicio web
│   ├── usuarios.js     # "Base de datos" en memoria de usuarios
│   └── rutas/
│       └── auth.js     # Endpoints de registro y login
├── public/
│   └── index.html      # Pequeña interfaz web para probar el servicio
├── package.json
└── README.md
```

## Instalación y ejecución

1. Instalar las dependencias:
   ```
   npm install
   ```
2. Iniciar el servicio:
   ```
   npm start
   ```
3. El servicio quedará disponible en `http://localhost:3000`.
4. Se puede probar desde el navegador abriendo `http://localhost:3000` (interfaz de prueba), o mediante herramientas como Postman o `curl`.

## Endpoints

### POST /api/registro

Registra un nuevo usuario.

**Body (JSON):**
```json
{
  "usuario": "andrey",
  "contrasena": "clave123"
}
```

**Respuesta exitosa (201):**
```json
{ "estado": "exito", "mensaje": "Usuario registrado correctamente." }
```

**Respuesta de error (409, usuario ya existe):**
```json
{ "estado": "error", "mensaje": "El usuario ya se encuentra registrado." }
```

### POST /api/login

Valida las credenciales de un usuario.

**Body (JSON):**
```json
{
  "usuario": "andrey",
  "contrasena": "clave123"
}
```

**Autenticación correcta (200):**
```json
{ "estado": "exito", "mensaje": "Autenticación satisfactoria." }
```

**Autenticación incorrecta (401):**
```json
{ "estado": "error", "mensaje": "Error en la autenticación." }
```

## Pruebas realizadas

- Registro de un usuario nuevo → éxito.
- Registro de un usuario ya existente → error controlado.
- Login con usuario y contraseña correctos → autenticación satisfactoria.
- Login con contraseña incorrecta → error en la autenticación.
- Login con usuario inexistente → error en la autenticación.

## Control de versiones

El proyecto se gestiona con **Git**. El historial de commits documenta el avance
del desarrollo (estructura inicial, lógica de registro, lógica de login e
interfaz de prueba). El enlace al repositorio remoto se encuentra en el archivo
`enlace_repositorio.txt`.
