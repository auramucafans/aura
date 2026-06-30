import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDPSY5CY3lPSNN6RmGGJPoCkKGp7Sk9_1k",
  authDomain: "gen-lang-client-0539077009.firebaseapp.com",
  projectId: "gen-lang-client-0539077009",
  storageBucket: "gen-lang-client-0539077009.firebasestorage.app",
  messagingSenderId: "334260771241",
  appId: "1:334260771241:web:4ae9ffe16e777451f6ccb8",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const testRef = ref(storage, 'test.txt');
uploadString(testRef, 'hello world').then(() => {
  console.log("Success");
  process.exit(0);
}).catch(e => {
  console.error("Error", e);
  process.exit(1);
});
