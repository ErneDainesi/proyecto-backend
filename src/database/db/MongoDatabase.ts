import mongoose from 'mongoose';
import logger from '../../logger/winston';
import {
	DB_FAILED_CONNECTION,
} from '../../constants';
import {config} from "dotenv";

export class MongoDatabase {
	private static _instance: MongoDatabase;

	async connect() {
		try {
      if (this.isConnectedToDatabase()) {
        return;
      }
			config(); // enviroment variables config
			const uri: string = process.env.ATLAS_URI as string;
			await mongoose.connect(uri, {});
			logger.info("Connection to mongo database was established");
		} catch (err) {
			logger.error(`[${DB_FAILED_CONNECTION}] | ${err}`);
		}
	}

	public static get Instance() {
		if (!this._instance) {
			this._instance = new this();
			return this._instance;
		}
		return this._instance;
	}

  private isConnectedToDatabase() {
    const connectionReadyState = mongoose.connection.readyState;
    return connectionReadyState === 1 || connectionReadyState === 2;
  }
}

