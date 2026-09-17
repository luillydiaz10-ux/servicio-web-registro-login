/**
 * usuarios.js
 * -----------------------------------------------------------------------
 * Este módulo simula una base de datos de usuarios utilizando un arreglo
 * en memoria. En un entorno de producción esto se reemplazaría por una
 * base de datos real (MySQL, PostgreSQL, MongoDB, etc.), pero para efectos
 * de esta evidencia se implementa de forma simple para poder probar el
 * servicio web sin depender de un motor de base de datos externo.
 * -----------------------------------------------------------------------
 */

// Arreglo que actuará como "tabla" de usuarios registrados.
// Cada usuario se guarda como: { usuario: string, contrasena: string (hash) }
const usuarios = [];

/**
 * Busca un usuario por su nombre de usuario.
 * @param {string} nombreUsuario
 * @returns {object|undefined} el usuario encontrado o undefined si no existe
 */
function buscarUsuario(nombreUsuario) {
    return usuarios.find((u) => u.usuario === nombreUsuario);
}

/**
 * Agrega un nuevo usuario al arreglo en memoria.
 * @param {string} nombreUsuario
 * @param {string} contrasenaHasheada
 */
function agregarUsuario(nombreUsuario, contrasenaHasheada) {
    usuarios.push({
        usuario: nombreUsuario,
        contrasena: contrasenaHasheada,
    });
}

// Se exportan las funciones y el arreglo para ser usados en otros archivos
module.exports = {
    usuarios,
    buscarUsuario,
    agregarUsuario,
};
