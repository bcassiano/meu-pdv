import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Inicializar Firebase
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });
}

const db = getFirestore();

async function runSanitizeUsers() {
    console.log("🚀 Iniciando Sanitização REAL de Usuários...");
    const collectionRef = db.collection('usuarios');
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
        console.log("! Nenhum usuário encontrado para limpeza.");
        return;
    }

    const emailGroups: { [email: string]: any[] } = {};

    snapshot.docs.forEach(doc => {
        const data = doc.data();
        const email = (data.email || 'sem-email').toLowerCase().trim();
        if (!emailGroups[email]) emailGroups[email] = [];
        emailGroups[email].push({ id: doc.id, ref: doc.ref, ...data });
    });

    let totalDeleted = 0;
    const BATCH_SIZE = 500;
    let batch = db.batch();
    let opCount = 0;

    for (const email in emailGroups) {
        const users = emailGroups[email];
        if (users.length > 1) {
            // Ordenar por createdAt decrescente (mais recente primeiro)
            users.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });

            // O primeiro é o vencedor, os demais são deletados
            const losers = users.slice(1);

            for (const user of losers) {
                batch.delete(user.ref);
                totalDeleted++;
                opCount++;

                if (opCount >= BATCH_SIZE) {
                    await batch.commit();
                    console.log(`- Batch de ${opCount} exclusões processado...`);
                    batch = db.batch();
                    opCount = 0;
                }
            }
        }
    }

    if (opCount > 0) {
        await batch.commit();
        console.log(`- Último batch de ${opCount} exclusões processado.`);
    }

    console.log("--------------------------------");
    console.log(`✅ Limpeza concluída com sucesso!`);
    console.log(`📊 Total de duplicatas removidas: ${totalDeleted}`);
}

runSanitizeUsers().catch(console.error);
