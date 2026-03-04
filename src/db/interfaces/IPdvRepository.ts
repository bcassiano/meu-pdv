export interface PdvRecord {
    idLocal: string;
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
    cidadeUf: string;
    endereco: string;
    ativo: boolean;
    // ... we can map other fields as needed
    [key: string]: any;
}

export interface IPdvRepository {
    /**
     * Salva uma lista de PDVs no banco de dados.
     * @param pdvs Array contendo os registros validados dos PDVs.
     */
    saveMany(pdvs: PdvRecord[]): Promise<void>;

    /**
     * Recupera todos os PDVs do banco de dados.
     */
    getAll(): Promise<PdvRecord[]>;
}
