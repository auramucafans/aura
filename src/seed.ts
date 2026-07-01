import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, writeBatch } from 'firebase/firestore';

// Read from current firebase-applet-config.json if possible, or just pass projectId
import fs from 'fs';
const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));

const app = initializeApp(config);
const db = getFirestore(app);

async function seed() {
  console.log("Deleting existing profiles...");
  const snap = await getDocs(collection(db, 'profiles'));
  const batch = writeBatch(db);
  snap.docs.forEach(d => {
    batch.delete(d.ref);
  });
  await batch.commit();
  console.log("Profiles deleted.");
}
seed().catch(console.error);
