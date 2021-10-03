import options from "./sqlite3";
import {Knex} from 'knex';

const knex = require("knex")(options);

export const createSqliteDB = async () => {
    try {
        await knex.schema
        .dropTableIfExists('items')
        .createTable('items', (table: Knex.TableBuilder) => {
            table.increments("id").notNullable();
            table.string("name", 15);
            table.string("category");
            table.integer("stock");
            table.integer("price");
        });
        console.log("Sqlite3 database created");
    } catch (err) {
        console.error(err);
    }
};
