/**
 * auth.js
 * -----------------------------------------------------------------------
 * Este archivo contiene las rutas (endpoints) del servicio web relacionadas
 * con la autenticación de usuarios:
 *
 *   POST /api/registro  -> Registra un nuevo usuario
 *   POST /api/login     -> Inicia sesión validando usuario y contraseña
 *
 * Caso de la evidencia:
 * "El servicio recibirá un usuario y una contraseña, si la autenticación
 *  es correcta saldrá un mensaje de autenticación satisfactoria, en caso
 *  contrario, debe devolver error en la autenticación."
 * -----------------------------------------------------------------------
 */

const express = require("express");
const bcrypt = require("bcryptjs");
const { buscarUsuario, agregarUsuario } = require("../usuarios");

// Se crea un enrutador de Express para agrupar las rutas de autenticación
const router = express.Router();

// Número de "salt rounds" utilizados por bcrypt para hashear la contraseña.
// Entre más alto, más segura pero más lenta la operación.
const SALT_ROUNDS = 10;

/**
 * POST /api/registro
 * Recibe { usuario, contrasena } en el cuerpo (body) de la petición.
 * Crea un nuevo usuario si el nombre de usuario no existe todavía.
 */
router.post("/registro", async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;

        // Validación básica: ambos campos son obligatorios
        if (!usuario || !contrasena) {
            return res.status(400).json({
                estado: "error",
                mensaje: "El usuario y la contraseña son obligatorios.",
            });
        }

        // Se valida que el usuario no exista previamente
        const usuarioExistente = buscarUsuario(usuario);
        if (usuarioExistente) {
            return res.status(409).json({
                estado: "error",
                mensaje: "El usuario ya se encuentra registrado.",
            });
        }

        // La contraseña NUNCA se guarda en texto plano: se hashea con bcrypt
        const contrasenaHasheada = await bcrypt.hash(contrasena, SALT_ROUNDS);

        // Se guarda el nuevo usuario en el arreglo (simulación de BD)
        agregarUsuario(usuario, contrasenaHasheada);

        return res.status(201).json({
            estado: "exito",
            mensaje: "Usuario registrado correctamente.",
        });
    } catch (error) {
        // Manejo de cualquier error inesperado del servidor
        console.error("Error en /api/registro:", error);
        return res.status(500).json({
            estado: "error",
            mensaje: "Ocurrió un error interno en el servidor.",
        });
    }
});

/**
 * POST /api/login
 * Recibe { usuario, contrasena } en el cuerpo (body) de la petición.
 * Valida las credenciales contra los usuarios registrados.
 *
 * - Si la autenticación es correcta -> mensaje de autenticación satisfactoria
 * - Si la autenticación falla       -> mensaje de error en la autenticación
 */
router.post("/login", async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;

        // Validación básica de los campos recibidos
        if (!usuario || !contrasena) {
            return res.status(400).json({
                estado: "error",
                mensaje: "El usuario y la contraseña son obligatorios.",
            });
        }

        // Se busca el usuario en la "base de datos" en memoria
        const usuarioEncontrado = buscarUsuario(usuario);

        // Si el usuario no existe, se retorna error de autenticación
        // (no se especifica que el usuario no existe, por seguridad)
        if (!usuarioEncontrado) {
            return res.status(401).json({
                estado: "error",
                mensaje: "Error en la autenticación.",
            });
        }

        // Se compara la contraseña recibida con el hash almacenado
        const contrasenaValida = await bcrypt.compare(
            contrasena,
            usuarioEncontrado.contrasena
        );

        if (!contrasenaValida) {
            // Contraseña incorrecta -> error en la autenticación
            return res.status(401).json({
                estado: "error",
                mensaje: "Error en la autenticación.",
            });
        }

        // Usuario y contraseña correctos -> autenticación satisfactoria
        return res.status(200).json({
            estado: "exito",
            mensaje: "Autenticación satisfactoria.",
        });
    } catch (error) {
        console.error("Error en /api/login:", error);
        return res.status(500).json({
            estado: "error",
            mensaje: "Ocurrió un error interno en el servidor.",
        });
    }
});

module.exports = router;
