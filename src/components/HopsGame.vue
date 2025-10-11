<template>
  <div class="hops-game">
    <h1>Sag doch wie hoch?!</h1>

    <div class="inputs">
      <input v-model="gamename" type="text" placeholder="Wer nimmt hops?"/>
      <input v-model="name" type="text" placeholder="Wer wird hops genommen?"/>
      <input v-model.number="chance" type="number" placeholder="Wie hoch"/>
    </div>

    <button @click="rollDice"
            :disabled="rolling || !gamename || !name || !chance">
      {{ rolling ? "Bummeldi Bummeldi Bumm" : "Und ab!" }}
    </button>

    <div class="dice-box" v-if="showDice">
      <p class="dice">{{ numberA }}</p>
      <p class="dice">{{ numberB }}</p>
    </div>

    <p class="result">{{ resultText }}</p>

    <h2>History</h2>
    <div class="history">
      <p v-for="entry in history" :key="entry._id">
        {{ entry.name }} wurde von {{ entry.gamename }} hops genommen
        ({{ entry.chance }}er Wahrscheinlichkeit) – {{ formatDate(entry.timestamp) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import axios from "axios";

// --- State --- DAS KOMMT VON DER KI, erzeugt reaktive container die bei änderung automatisch DOM aktualisieren
const gamename = ref("");
const name = ref("");
const chance = ref(null);
const resultText = ref("");
const history = ref([]);
const rolling = ref(false);
const numberA = ref(null);
const numberB = ref(null);
const showDice = ref(false);

// Schummel prävention
const rollDice = async () => {
  if (!chance.value || chance.value < 2) {
    alert("Bitte eine Zahl größer als 1 eingeben!");
    return;
  }
// KOMMT VON KI --> sorgt dafür das sich der Text im Button je nach Zustand ändern kann (Zeile 13 Template)
  showDice.value = true;
  rolling.value = true;

  // Würfel animieren
  const interval = setInterval(() => {
    numberA.value = Math.floor(Math.random() * chance.value) + 1;
    numberB.value = Math.floor(Math.random() * chance.value) + 1;
  }, 100);

  // Nach 1,5 Sekunden stoppen
  setTimeout(async () => {
    clearInterval(interval);
    numberA.value = Math.floor(Math.random() * chance.value) + 1;
    numberB.value = Math.floor(Math.random() * chance.value) + 1;
    rolling.value = false;

    const isHit = numberA.value === numberB.value;

    if (isHit) {
      resultText.value = `${name.value.toUpperCase()} wurde von ${gamename.value.toUpperCase()} hops genommen! (${chance.value}er Wahrscheinlichkeit)`;

      const entry = {
        gamename: gamename.value,
        name: name.value,
        chance: chance.value,
        timestamp: Date.now(),
      };

      await saveToServer(entry);
      history.value.push(entry);
    } else {
      resultText.value = "Schwein gehabt!";
    }

    // Eingabefelder leeren
    gamename.value = "";
    name.value = "";
  }, 1500);
};

// Route für speichern in CouchDB
const saveToServer = async (entry) => {
  try {
    await axios.post("http://localhost:8000/save", entry);
  } catch (err) {
    console.error("Fehler beim Speichern:", err);
  }
};

// Hopshistory von CouchDB laden und in Array (history) hinzufügen
const loadHistory = async () => {
  try {
    const res = await axios.get("http://localhost:8000/history");
    history.value = res.data;
    console.log(res.data);
  } catch (err) {
    console.error("Fehler beim Laden der History:", err);
  }
};

// Deutsche Datumsformat
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("DE");
};

// Beim Laden direket Hopshistory aufrufen
onMounted(loadHistory);
</script>

<style scoped>
.hops-game {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #181818;
  color: #fff;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(45, 75, 35, 0.24);
  text-align: center;
  font-family: "Inter", sans-serif;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 1rem;
}

button {
  background: #4d813c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

button:hover:not(:disabled) {
  background: #5adc2f;
}

button:disabled {
  background: #666;
  cursor: not-allowed;
}

.dice-box {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 20px 0;
}

.dice {
  font-size: 2rem;
  font-weight: bold;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #222;
  color: #5adc2f;
  border-radius: 10px;
  box-shadow: 0 0 10px #444;
}

.result {
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.2rem;
}

.history {
  margin-top: 20px;
  text-align: left;
  background: #222;
  padding: 10px;
  border-radius: 10px;
  max-height: 250px;
  overflow-y: auto;
}
</style>
