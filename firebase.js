import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, getDocs, orderBy, query, addDoc, limit } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";


export let playersList = "";

async function loadFirebaseConfig(){
    try{
        const response = await fetch('https://gist.githubusercontent.com/leonsaraqini/32180c281bd4b5930a984854d7020b19/raw/matcher-firebase-config.json');

        if(!response.ok) throw new Error(`Failed to fetch config: ${response.statusText}`);

        return await response.json();

    } catch (error){
        console.error("Error loading Firebase config:", error);
    }
}

async function initializeFirebase(){
    const config = await loadFirebaseConfig();

    if(!config) return null;

    try{
        const app = initializeApp(config);

        return getFirestore(app);
    } catch (error){
        
        console.error("Error initializing Firebase:", error);

        return null;
    }
}

export async function getPlayers() {
    const db = await initializeFirebase();
    let playersList = "";

    if(!db) return;

    try{
        const q = query(collection(db, "Player"), orderBy("Time", "asc"), limit(10));
        const querySnapshot = await getDocs(q);

        let i = 1;

        querySnapshot.forEach(doc => {
            const player = doc.data();

            playersList += `${i++}. ${player.Name} ${player.Score}\n`;
        });

        return playersList;
    } catch (error) {
        console.error("Error fetching players:", error);
    } 
}

export async function addPlayer(player) { 

    const db = await initializeFirebase();
    if (!db) return;

    try {
        const playersRef = collection(db, "Player");

        const newPlayer = {
            Name: player.username,
            Score: player.score,
            Time: player.time
        };

        await addDoc(playersRef, newPlayer);

    } catch (error) {
        console.error("Error adding project:", error);
    }
}

