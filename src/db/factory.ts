import { IPdvRepository } from "./interfaces/IPdvRepository";
import { FirestorePdvRepository } from "./repositories/FirestorePdvRepository";

export class DatabaseFactory {
    static getPdvRepository(): IPdvRepository {
        // Futuramente:
        // if (process.env.DB_TYPE === 'POSTGRES') return new PostgresPdvRepository();

        return new FirestorePdvRepository();
    }
}
