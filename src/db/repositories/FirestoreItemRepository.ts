import * as admin from 'firebase-admin';
import { IItemRepository } from '../interfaces/IItemRepository';
import { ItemNormalizado } from '../../lib/importadores/normalizar-itens';

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        });
        console.log("🔥 Firebase Admin inicializado (Itens).");
    } catch (error) {
        console.error("Erro ao inicializar Firebase Admin:", error);
    }
}

const db = admin.firestore();

export class FirestoreItemRepository implements IItemRepository {
    private collection = 'itens_catalogo';

    async saveMany(itens: ItemNormalizado[]): Promise<void> {
        if (!itens.length) return;

        const collectionRef = db.collection(this.collection);
        const BATCH_SIZE = 500;

        for (let i = 0; i < itens.length; i += BATCH_SIZE) {
            const batch = db.batch();
            const chunk = itens.slice(i, i + BATCH_SIZE);

            chunk.forEach(item => {
                const docRef = collectionRef.doc(item.idNormalizado);
                batch.set(docRef, {
                    ...item,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            });

            await batch.commit();
            console.log(`✅ Lote de ${chunk.length} itens salvo.`);
        }
    }

    async getAll(): Promise<ItemNormalizado[]> {
        const snapshot = await db.collection(this.collection).get();
        return snapshot.docs.map(doc => doc.data() as ItemNormalizado);
    }
}
