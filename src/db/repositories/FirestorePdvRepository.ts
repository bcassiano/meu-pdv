import * as admin from 'firebase-admin';
import { IPdvRepository, PdvRecord } from '../interfaces/IPdvRepository';

// Inicialização do Firebase Admin com fallback para evitar erros de multi-instanciação em dev
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
            // Para usar o credential.applicationDefault() você precisa ter a variável de ambiente:
            // GOOGLE_APPLICATION_CREDENTIALS="C:\caminho\para\sua\service-account-file.json"
        });
        console.log("🔥 Firebase Admin inicializado com sucesso.");
    } catch (error) {
        console.error("Erro ao inicializar Firebase Admin. Verifique suas credenciais:", error);
    }
}

const db = admin.firestore();

export class FirestorePdvRepository implements IPdvRepository {
    async saveMany(pdvs: PdvRecord[]): Promise<void> {
        if (!pdvs || pdvs.length === 0) return;

        const collectionRef = db.collection('pdvs_importados');

        // Firestore transactions and batches can handle a maximum of 500 writes
        const MAX_BATCH_SIZE = 500;

        for (let i = 0; i < pdvs.length; i += MAX_BATCH_SIZE) {
            const batch = db.batch();
            const chunk = pdvs.slice(i, i + MAX_BATCH_SIZE);

            chunk.forEach(pdv => {
                // Remove propriedades undefined que quebram o Firestore
                const sanitizedPdv = Object.fromEntries(
                    Object.entries(pdv).filter(([_, v]) => v !== undefined)
                );

                // Se tiver ID LOCAL via SAP, podemos usá-lo como ID do doc, senão o firestore cria um hash.
                const docRef = sanitizedPdv.idLocal && String(sanitizedPdv.idLocal).trim() !== ''
                    ? collectionRef.doc(String(sanitizedPdv.idLocal))
                    : collectionRef.doc();

                batch.set(docRef, sanitizedPdv, { merge: true }); // Usando merge para atualizar dados sem sobrescrever se já existir
            });

            await batch.commit();
            console.log(`✅ Lote de ${chunk.length} PDVs salvos no Firestore (${i + 1} a ${Math.min(i + MAX_BATCH_SIZE, pdvs.length)} de ${pdvs.length})`);
        }
    }

    async getAll(): Promise<PdvRecord[]> {
        const collectionRef = db.collection('pdvs_importados');
        const snapshot = await collectionRef.get();

        return snapshot.docs.map(doc => doc.data() as PdvRecord);
    }
}
