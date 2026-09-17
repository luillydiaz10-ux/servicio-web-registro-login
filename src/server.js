/**
 * server.js
 * -----------------------------------------------------------------------
 * Punto de entrada del servicio web (API REST) para el registro e inicio
 * de sesión de usuarios.
 *
 * Evidencia: GA7-220501096-AA5-EV01
 * Componente formativo: Construcción API
 * -----------------------------------------------------------------------
 */

const express = require("express");
const cors = require("cors");
const authRoutes = require("./rutas/auth");

// Se crea la aplicación de Express
const app = express();

// Puerto en el que se ejecutará el servicio (por defecto 3000)
const PUERTO = process.env.PORT || 3000;

// Middleware para permitir peticiones desde otros orígenes (por ejemplo,
// una página web de prueba abierta directamente en el navegador)
app.use(cors());

// Middleware para interpretar el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Se sirve la carpeta "public" para poder probar el servicio desde
// una pequeña interfaz web (index.html)
app.use(express.static("public"));

// Todas las rutas relacionadas con autenticación quedan agrupadas
// bajo el prefijo /api (ej: /api/registro, /api/login)
app.use("/api", authRoutes);

// Ruta raíz de comprobación, útil para verificar que el servicio está activo
app.get("/", (req, res) => {
    res.send(
        "Servicio web de Registro e Inicio de Sesión funcionando correctamente."
    );
});

// Middleware para manejar rutas que no existen (404)
app.use((req, res) => {
    res.status(404).json({
        estado: "error",
        mensaje: "Ruta no encontrada.",
    });
});

// Se inicia el servidor y queda escuchando peticiones en el puerto definido
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
