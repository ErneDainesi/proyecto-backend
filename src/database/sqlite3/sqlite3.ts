import config from "./config";
import {knex, Knex} from 'knex';
import IProduct from "../../schemas/sqlite3/productsSchema";

export class SqliteDatabase {
    private knexInstance: Knex;
    private productsTable: string;

    public constructor() {
        this.productsTable = "items";
        this.knexInstance = knex(config);
    }

    public async createProductsTable() {
        try {
            await this.knexInstance.schema
            .dropTableIfExists(this.productsTable)
            .createTable(this.productsTable, (table: Knex.TableBuilder) => {
                table.increments("id").notNullable();
                table.string("name", 15);
                table.string("category");
                table.integer("stock");
                table.integer("price");
            });
        } catch (err) {
            console.error(err);
        }
    }

    public async getProduct(id: number) {
        try {
            const product = await this.knexInstance.from(this.productsTable).where({id: id}).select();
            return product;
        } catch (err) {
            console.error(err);
        }
    }

    public async insertProduct(product: IProduct) {
        try {
            await this.knexInstance.insert(product);
        } catch (err) {
            console.error(err);
        }
    }

    public async updateProduct(id: number, newValue: object) {
        try {
            await this.knexInstance.from(this.productsTable).where({id: id}).update({...newValue})
        } catch (err) {
            console.error(err);
        }
    }
    public async deleteProduct(id: number) {
        try {
            await this.knexInstance.from(this.productsTable).where({id: id}).del();
        } catch (err) {
            console.error(err);
        }
    }
}
