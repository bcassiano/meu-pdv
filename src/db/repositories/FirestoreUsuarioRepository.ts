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

        // 1. Deduplicação interna: Garante que na lista enviada não existam e-mails repetidos
        const uniqueIncomingMap = new Map<string, Usuario>();
        usuarios.forEach(u => {
            const emailKey = u.email?.toLowerCase().trim();
            if (emailKey && !uniqueIncomingMap.has(emailKey)) {
                uniqueIncomingMap.set(emailKey, u);
            }
        });
        const safeUsuarios = Array.from(uniqueIncomingMap.values());

        // 2. Trava de Segurança: Busca e-mails que já constam no banco para evitar novas duplicatas
        // Nota: Em bases massivas, o ideal seria consultar por lotes de e-mails específicos.
        const snapshot = await collectionRef.select('email').get();
        const existingEmails = new Set(
            snapshot.docs.map(doc => doc.data().email?.toLowerCase().trim()).filter(Boolean)
        );

        // 3. Filtra apenas os usuários que são realmente novos
        const toSave = safeUsuarios.filter(u => {
            const email = u.email?.toLowerCase().trim();
            return email && !existingEmails.has(email);
        });

        if (toSave.length === 0) {
            console.log("⚠️ saveMany: Bloqueio de duplicidade ativado - todos os registros já existem.");
            return;
        }

        const MAX_BATCH_SIZE = 500;

        for (let i = 0; i < toSave.length; i += MAX_BATCH_SIZE) {
            const batch = db.batch();
            const chunk = toSave.slice(i, i + MAX_BATCH_SIZE);

            chunk.forEach(user => {
                const sanitizedUser = Object.fromEntries(
                    Object.entries(user).filter(([_, v]) => v !== undefined)
                );

                const loginId = sanitizedUser.login && String(sanitizedUser.login).trim() !== ''
                    ? String(sanitizedUser.login).toLowerCase()
                    : undefined;

                const docRef = loginId ? collectionRef.doc(loginId) : collectionRef.doc();

                if (!sanitizedUser.id) {
                    sanitizedUser.id = docRef.id;
                }

                if (!sanitizedUser.createdAt) {
                    sanitizedUser.createdAt = new Date().toISOString();
                }

                batch.set(docRef, sanitizedUser, { merge: true });
            });

            await batch.commit();
            console.log(`✅ Lote de ${chunk.length} NOVOS usuários salvos no Firestore.`);
        }
    }

    async update(id: string, data: Partial<Usuario>): Promise<void> {
        if (!id) throw new Error("ID do usuário ausente.");

        const docRef = db.collection('usuarios').doc(id);

        // Remove undefined fields
        const sanitizedData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );

        // Somente aplicar o .update() se realmente tiver algo
        if (Object.keys(sanitizedData).length > 0) {
            await docRef.update(sanitizedData);
        }
    }

    async getAll(): Promise<Usuario[]> {
        const collectionRef = db.collection('usuarios');
        const snapshot = await collectionRef.get();
        return snapshot.docs.map(doc => doc.data() as Usuario);
    }
}
