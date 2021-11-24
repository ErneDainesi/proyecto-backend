"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVALID_DB_ID = exports.INVALID_FILTER = exports.DB_FAILED_INSERT = exports.DB_FAILED_UPDATE = exports.DB_FAILED_DELETE = exports.DB_FAILED_GET = exports.DB_FAILED_CONNECTION = exports.SQLITE3_DB = exports.MONGO_DB = exports.MONGODB_URL = exports.PORT = void 0;
// Server
exports.PORT = process.env.PORT || '8080';
// Databases
exports.MONGODB_URL = "mongodb+srv://ernesto:erne@cluster0.mf9ug.mongodb.net/ecommerce?retryWrites=true&w=majority";
exports.MONGO_DB = 0;
exports.SQLITE3_DB = 1;
// Error messages
exports.DB_FAILED_CONNECTION = "Failed at connecting to database";
exports.DB_FAILED_GET = "Failed getting item form database";
exports.DB_FAILED_DELETE = "Failed deleting item from database";
exports.DB_FAILED_UPDATE = "Failed updating item from database";
exports.DB_FAILED_INSERT = "Failed inserting item to database";
exports.INVALID_FILTER = "Invalid filter";
exports.INVALID_DB_ID = "Invalid database id";
