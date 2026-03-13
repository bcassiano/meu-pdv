
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });
}

const db = admin.firestore();

async function checkCollections() {
    const collections = ['itens', 'itens_catalogo', 'produtos', 'catalogo'];
    
    for (const name of collections) {
        const snapshot = await db.collection(name).limit(1).get();
        console.log(`Coleção '${name}': ${snapshot.size} itens (amostra)`);
    }
}

checkCollections().catch(console.error);
