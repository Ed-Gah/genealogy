import { addDoc, collection, db, getDocs } from "./firebaseConfig";
const createDoc = async (collectionName: string, data: any) =>
  await addDoc(collection(db, collectionName), data);
const getAllDocs = async (collectionName: string) => getDocs(collection(db, collectionName))
export { createDoc, getAllDocs };
