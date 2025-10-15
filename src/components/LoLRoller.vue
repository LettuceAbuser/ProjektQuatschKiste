<template>
  <div class="champ-randomizer">
    <h2>LoL Champion Randomizer</h2>

    <div v-if="loading">Champions werden geladen...</div>

    <div v-else>
      <label>Lane wählen:</label>
      <select v-model="selectedLane">
        <option v-for="lane in lanes" :key="lane" :value="lane">{{ lane }}</option>
      </select>

      <div class="controls">
        <button @click="startSpin" :disabled="rolling">Würfeln!</button>
      </div>

      <div class="list-wrapper">
        <div
            v-for="(champ, idx) in championsForLane"
            :key="champ.id"
            :class="['champ-card', { active: idx === currentIndex, chosen: idx === finalIndex && stopped }]"
            :style="{ backgroundImage: `url(${champ.icon})` }"
        >
          <span class="champ-name">{{ champ.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const lanes = ref(["Top", "Jungle", "Mid", "ADC", "Support"]);
const selectedLane = ref("Support");
const champions = ref({});
const loading = ref(true);

const rolling = ref(false);
const currentIndex = ref(-1);
const finalIndex = ref(-1);
const stopped = ref(false);

let spinTimeout = null;

const championsForLane = computed(() => champions.value[selectedLane.value] || []);

const VERSION = "15.17.1";
const BASE_URL = `https://ddragon.leagueoflegends.com/cdn/${VERSION}/`;

// Lane-Filter (basierend auf Champion-Tags)
const laneMap = {
  Top: ["Fighter", "Tank"],
  Jungle: ["Jungle", "Assassin", "Fighter"],
  Mid: ["Mage", "Assassin"],
  ADC: ["Marksman"],
  Support: ["Support"]
};

onMounted(async () => {
  try {
    const res = await fetch(`${BASE_URL}data/en_US/champion.json`);
    const data = await res.json();
    const champArray = Object.values(data.data);

    const laneGroups = { Top: [], Jungle: [], Mid: [], ADC: [], Support: [] };

    champArray.forEach(c => {
      const icon = `${BASE_URL}img/champion/${c.image.full}`;

      for (const lane in laneMap) {
        if (laneMap[lane].some(tag => c.tags.includes(tag))) {
          laneGroups[lane].push({
            id: c.id,
            name: c.name,
            title: c.title,
            icon,
          });
        }
      }
    });

    champions.value = laneGroups;
  } catch (err) {
    console.error("Fehler beim Laden:", err);
  } finally {
    loading.value = false;
  }
});

const startSpin = () => {
  if (rolling.value || championsForLane.value.length === 0) return;

  rolling.value = true;
  stopped.value = false;
  finalIndex.value = -1;

  let steps = Math.floor(Math.random() * 80) + 40;
  let delay = 10;
  let index = 0;
  currentIndex.value = index;

  const spin = () => {
    index = (index + 1) % championsForLane.value.length;
    currentIndex.value = index;

    steps--;
    if (steps > 0) {
      delay += 1;
      spinTimeout = setTimeout(spin, delay);
    } else {
      finalIndex.value = index;
      stopped.value = true;
      rolling.value = false;
      spinTimeout = null;
    }
  };

  spinTimeout = setTimeout(spin, delay);
};

onUnmounted(() => {
  if (spinTimeout) clearTimeout(spinTimeout);
});
</script>

<style scoped>
button {
  background: #4d813c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
  margin-top: 1rem;
}
select{
  padding: 0.5rem;
}
label{
  font-weight: bold;
}
.list-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
}
.champ-card {
  width: 120px;
  height: 120px;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 6px black;
  transition: transform 0.1s;
}
.champ-card.active {
  transform: scale(1.05);
}
.champ-card.chosen {
  transform: scale(1.1);
  box-shadow: 0 0 20px 5px limegreen;
}
</style>
