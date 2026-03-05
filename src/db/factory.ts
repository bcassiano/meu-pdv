import { IPdvRepository } from "./interfaces/IPdvRepository";
import { FirestorePdvRepository } from "./repositories/FirestorePdvRepository";
import { IUsuarioRepository } from "./interfaces/IUsuarioRepository";
import { FirestoreUsuarioRepository } from "./repositories/FirestoreUsuarioRepository";

export class DatabaseFactory {
    static getPdvRepository(): IPdvRepository {
        // Futuramente:
        // if (process.env.DB_TYPE === 'POSTGRES') return new PostgresPdvRepository();
        return new FirestorePdvRepository();
    }

    static getUsuarioRepository(): IUsuarioRepository {
        return new FirestoreUsuarioRepository();
    }
}
