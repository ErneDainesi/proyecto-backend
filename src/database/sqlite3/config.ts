import {Knex} from 'knex'

const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: './db/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

export default config;
