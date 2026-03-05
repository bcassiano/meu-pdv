import * as admin from 'firebase-admin';
import { IUsuarioRepository } from '../interfaces/IUsuarioRepository';
import { Usuario } from '@/types/usuario';

// Inicialização segura do Firebase Admin
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        });
        console.log("🔥 Firebase Admin inicializado com sucesso (FirestoreUsuarioRepository).");
    } catch (error) {
        console.error("Erro ao inicializar Firebase Admin:", error);
    }
}

const db = admin.firestore();

export class FirestoreUsuarioRepository implements IUsuarioRepository {
    async saveMany(usuarios: Usuario[]): Promise<void> {
        if (!usuarios || usuarios.length === 0) return;

        const collectionRef = db.collection('usuarios');

        // BATCH limit of Firebase Firestore is 500 writes per transaction/batch
        const MAX_BATCH_SIZE = 500;

        for (let i = 0; i < usuarios.length; i += MAX_BATCH_SIZE) {
            const batch = db.batch();
            const chunk = usuarios.slice(i, i + MAX_BATCH_SIZE);

            chunk.forEach(user => {
                // Remover campos undefined limpando o objeto pro Firestore
                const sanitizedUser = Object.fromEntries(
                    Object.entries(user).filter(([_, v]) => v !== undefined)
                );

                // Criar o doc baseando-se no UID/login limpo (mockamos ID usando o login como chave forte para a API import)
                // Se preferir doc() gerado pelo firebase, trocaremos depois. Mas importações em massa geralmente exigem update-if-exists
                const loginId = sanitizedUser.login && String(sanitizedUser.login).trim() !== ''
                    ? String(sanitizedUser.login).toLowerCase()
                    : undefined;

                const docRef = loginId ? collectionRef.doc(loginId) : collectionRef.doc();

                // Se não possuir .id formalizado, insere a key real
                if (!sanitizedUser.id) {
                    sanitizedUser.id = docRef.id;
                }

                // Definir campos de auditoria básica caso ausente
                if (!sanitizedUser.createdAt) {
                    sanitizedUser.createdAt = new Date().toISOString(); // Em ISODate local ou String padronizada. Ideal seria admin.firestore.FieldValue.serverTimestamp() mas a interface Tipada usa string.
                }

                batch.set(docRef, sanitizedUser, { merge: true });
            });

            await batch.commit();
            console.log(`✅ Lote de ${chunk.length} USUÁRIOS salvos no Firestore (${i + 1} a ${Math.min(i + MAX_BATCH_SIZE, usuarios.length)} de ${usuarios.length})`);
        }
    }

    async getAll(): Promise<Usuario[]> {
        const collectionRef = db.collection('usuarios');
        const snapshot = await collectionRef.get();
        return snapshot.docs.map(doc => doc.data() as Usuario);
    }
}
