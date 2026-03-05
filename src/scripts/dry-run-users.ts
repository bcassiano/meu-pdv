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

async function dryRunSanitizeUsers() {
    console.log("🔍 Iniciando Simulação de Sanitização de Usuários...");
    const collectionRef = db.collection('usuarios');
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
        console.log("! Nenhum usuário encontrado na base.");
        return;
    }

    console.log(`- Analisando ${snapshot.size} usuários...`);

    const emailGroups: { [email: string]: any[] } = {};

    snapshot.docs.forEach(doc => {
        const data = doc.data();
        const email = (data.email || 'sem-email').toLowerCase().trim();
        if (!emailGroups[email]) emailGroups[email] = [];
        emailGroups[email].push({ id: doc.id, ...data });
    });

    let totalDuplicatesFound = 0;
    const toDelete: string[] = [];

    console.log("\n--- RESULTADOS DA SIMULAÇÃO ---\n");

    for (const email in emailGroups) {
        const users = emailGroups[email];
        if (users.length > 1) {
            totalDuplicatesFound += (users.length - 1);

            // Ordenar por createdAt decrescente (mais recente primeiro)
            users.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });

            const winner = users[0];
            const losers = users.slice(1);

            console.log(`📧 E-mail: ${email}`);
            console.log(`   ✅ MANTER: ID ${winner.id} (Criado em: ${winner.createdAt || 'N/A'})`);

            losers.forEach(user => {
                console.log(`   ❌ DELETAR: ID ${user.id} (Criado em: ${user.createdAt || 'N/A'})`);
                toDelete.push(user.id);
            });
            console.log("");
        }
    }

    console.log("--------------------------------");
    console.log(`📊 Total de usuários analisados: ${snapshot.size}`);
    console.log(`📊 Total de duplicatas indentificadas: ${totalDuplicatesFound}`);
    console.log(`🚀 Script finalizado (Simulação apenas - nenhuma alteração feita no banco).`);
}

dryRunSanitizeUsers().catch(console.error);
