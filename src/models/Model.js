import db from '../firebase/config.js';

class Model {
    static async create(table, data) {
        try {
            const ref = await db.collection(table).add(data);
            return {id: ref.id, ...data};
        } catch (err) {
            throw err; // erro 
        }
    }

    static async upsertByField(table, field, value, data) {
        try {
            const q = query(db.collection(table), where(field, '==', value), limit(1));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Documento encontrado, atualize-o
                const docId = querySnapshot.docs[0].id;
                const docRef = doc(db, table, docId);
                await setDoc(docRef, data, { merge: true });
                return { id: docId, ...data };
            } else {
                // Documento não encontrado, crie um novo
                const ref = await db.collection(table).add(data);
                return { id: ref.id, ...data };
            }
        } catch (err) {
            throw err; // Erro
        }
    }

    static async select(table) {
        try {
            const snapshot = await db.collection(table).get();
            return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        } catch (err) {
            throw err; // erro 
        }
    }

    static async select_id(table, id) {
        try {
            const doc = await db.collection(table).doc(id).get();
            return doc.data();
        } catch (err) {
            throw err; // erro 
        }
    }

    static async update(table, id, data) {
        try {
            await db.collection(table).doc(id).update(data);
            return {id, ...data};
        } catch (err) {
            throw err; // erro 
        }
    }

    static async delete(table, id) {
        try {
            await db.collection(table).doc(id).delete();
            return id;
        } catch (err) {
            throw err; // erro 
        }
    }
}

export default Model;