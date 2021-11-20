"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfIsAdmin = void 0;
;
// Array modelando la base de datos de usuarios
var users = [
    { id: 1, isAdmin: true },
    { id: 2, isAdmin: false }
];
// Busca al usuario por su id (que es pasado como parametro en el request)
// dentro del array "users" y valida que este sea administrador
var checkIfIsAdmin = function (err, req, res, next) {
    var userId = +req.params.userId - 1;
    var user = users[userId];
    console.log("Entre el middleware");
    if (!user.isAdmin) {
        console.log("Entre al if del middleware");
        res.status(400).json({
            error: -1,
            description: "Route " + req.originalUrl + " method " + req.method + " not authorized"
        });
    }
    next();
};
exports.checkIfIsAdmin = checkIfIsAdmin;
