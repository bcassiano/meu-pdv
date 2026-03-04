import admin from 'firebase-admin';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Carregar variáveis de ambiente do .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Inicializar Firebase Admin diretamente
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = getFirestore();

async function migratePdvs() {
    console.log("🚀 Iniciando migração de PDVs...");
    const collectionRef = db.collection('pdvs_importados');
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
        console.log("- Nenhum registro encontrado para migrar.");
        return;
    }

    console.log(`- Encontrados ${snapshot.size} registros. Analisando...`);

    const BATCH_SIZE = 500;
    let batch = db.batch();
    let count = 0;
    let migratedCount = 0;

    for (const doc of snapshot.docs) {
        const data = doc.data();
        const keys = Object.keys(data);

        // Verifica se o documento possui chaves legadas (com espaços ou em caixa alta)
        const hasLegacyKeys = keys.some(k =>
            k.includes(" ") ||
            k === k.toUpperCase() && k !== "CNPJ" && k !== "ID"
        );

        if (hasLegacyKeys) {
            const newData: any = {
                idLocal: data.idLocal || data["ID LOCAL"] || data["ID LOCAL "] || "",
                nomeFantasia: data.nomeFantasia || data["DESCRIÇÃO LOCAL"] || data["DESCRICAO LOCAL"] || "",
                razaoSocial: data.razaoSocial || data["RAZÃO SOCIAL LOCAL"] || data["RAZAO SOCIAL LOCAL"] || "",
                cnpj: data.cnpj || data["CNPJ"] || "",
                cidadeUf: data.cidadeUf || (data.CIDADE ? `${data.CIDADE} / ${data.ESTADO || ""}` : ""),
                ativo: data.ativo !== undefined ? data.ativo : (data["ATIVO LOCAL"] !== "NÃO"),
                updatedAt: FieldValue.serverTimestamp(),
                isMigrated: true
            };

            // Criar um novo objeto apenas com as chaves limpas
            // Se quisermos DELETAR as chaves antigas, o .set(doc.ref, newData) sem merge fará isso.
            // Aqui vamos usar .set() para substituir o documento inteiro pelo novo formato limpo.
            batch.set(doc.ref, newData);
            migratedCount++;
        }

        count++;

        if (count % BATCH_SIZE === 0) {
            await batch.commit();
            batch = db.batch();
            console.log(`- Progresso: ${count}/${snapshot.size} processados...`);
        }
    }

    if (migratedCount % BATCH_SIZE !== 0) {
        await batch.commit();
    }

    console.log(`✅ Migração concluída!`);
    console.log(`- Total de registros analisados: ${count}`);
    console.log(`- Total de registros atualizados para novo formato: ${migratedCount}`);
}

migratePdvs().catch(console.error);
