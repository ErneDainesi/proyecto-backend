// Server
export const PORT: number = 8080;

// Databases
export const MONGODB_URL: string = "mongodb+srv://ernesto:erne@cluster0.mf9ug.mongodb.net/ecommerce?retryWrites=true&w=majority";
export const MONGO_DB: number = 0;
export const SQLITE3_DB: number = 1;

// Error messages
export const DB_FAILED_CONNECTION = "Failed at connecting to database";
export const DB_FAILED_GET = "Failed getting item form database";
export const DB_FAILED_DELETE = "Failed deleting item from database";
export const DB_FAILED_UPDATE = "Failed updating item from database";
export const DB_FAILED_INSERT = "Failed inserting item to database";
export const INVALID_FILTER = "Invalid filter";
export const INVALID_DB_ID = "Invalid database id";
