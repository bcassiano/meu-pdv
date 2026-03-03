import ptBR from './pt.json';

type Translations = typeof ptBR;
type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export function useTranslation() {
    const t = (key: NestedKeyOf<Translations>): string => {
        const keys = key.split('.');
        let value: any = ptBR;
        for (const k of keys) {
            if (value[k] === undefined) return key; // Fallback para a chave se não encontrar
            value = value[k];
        }
        return value as string;
    };

    return { t };
}
