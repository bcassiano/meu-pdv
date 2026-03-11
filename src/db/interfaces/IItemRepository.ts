import { ItemNormalizado } from '../../lib/importadores/normalizar-itens';

export interface IItemRepository {
    saveMany(itens: ItemNormalizado[]): Promise<void>;
    getAll(): Promise<ItemNormalizado[]>;
}
