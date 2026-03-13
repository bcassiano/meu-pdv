import * as admin from 'firebase-admin';
import { IProfileRepository } from '../interfaces/IProfileRepository';
import { Profile } from '@/types/profile';

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        });
    } catch (error) {
        console.error("Erro ao inicializar Firebase Admin:", error);
    }
}

const db = admin.firestore();

export class FirestoreProfileRepository implements IProfileRepository {
    private collection = 'perfis';

    async getAll(): Promise<Profile[]> {
        const snapshot = await db.collection(this.collection).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Profile));
    }

    async save(profile: Profile): Promise<void> {
        const { id, ...data } = profile;
        await db.collection(this.collection).doc(id).set({
            ...data,
            updatedAt: new Date().toISOString()
        }, { merge: true });
    }

    async delete(id: string): Promise<void> {
        await db.collection(this.collection).doc(id).delete();
    }

    async saveMany(profiles: Profile[]): Promise<void> {
        const batch = db.batch();
        profiles.forEach(profile => {
            const { id, ...data } = profile;
            const docRef = db.collection(this.collection).doc(id);
            batch.set(docRef, {
                ...data,
                updatedAt: new Date().toISOString()
            }, { merge: true });
        });
        await batch.commit();
    }
}
