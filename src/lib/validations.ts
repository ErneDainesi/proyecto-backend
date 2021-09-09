// Declaro el tipo User
interface User {
	id: number,
	isAdmin: boolean
};

// Array modelando la base de datos de usuarios
const users: Array<User> = [
	{id: 1, isAdmin: true},
	{id: 2, isAdmin: false}
];

// Busca al usuario por su id (que es pasado como parametro en el request)
// dentro del array "users" y valida que este sea administrador
export const checkIfIsAdmin = (err, req, res, next) => {
	const userId: number = +req.params.userId - 1;
	const user: User = users[userId];
	console.log("Entre el middleware");
	if (!user.isAdmin) {
		console.log("Entre al if del middleware");
		res.status(400).json({
			error: -1,
			description: `Route ${req.originalUrl} method ${req.method} not authorized`
		});
	}
};
