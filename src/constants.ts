// Server
export const PORT: string = process.env.PORT || '8080';
export const COOKIE_MAX_AGE: number = 60000;

// Error messages
export const DB_FAILED_CONNECTION: string = "Failed at connecting to database";
export const DB_FAILED_GET: string = "Failed getting item form database";
export const DB_FAILED_DELETE: string = "Failed deleting item from database";
export const DB_FAILED_UPDATE: string = "Failed updating item from database";
export const DB_FAILED_INSERT: string = "Failed inserting item to database";
export const INVALID_FILTER: string = "Invalid filter";
export const INVALID_DB_ID: string = "Invalid database id";

