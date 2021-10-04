import { MongoDatabase } from "./mongodb/MongoDatabase";
import { SqliteDatabase } from "./sqlite3/SqliteDatabase";
import {
    INVALID_DB_ID,
    MONGO_DB,
    SQLITE3_DB
} from "../constants";

export class DatabaseFactory {
    private databaseId: number;

    constructor(databaseId: number) {
        this.databaseId = databaseId;
    }

    public createDatabase() {
        switch (this.databaseId) {
            case MONGO_DB:
                return new MongoDatabase();
            case SQLITE3_DB:
                return new SqliteDatabase();
            default:
                throw new Error(INVALID_DB_ID);
        }
    }
}