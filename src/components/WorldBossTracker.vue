<template>
  <div class="worldboss-tracker">

    <div v-if="bosses.length === 0" class="loading">
      <p>Lade aktuelle Timer...</p>
    </div>

    <div v-else class="boss-list">
      <div
          v-for="(boss, index) in bosses"
          :key="index"
          class="boss-card"
      >
        <h3 class="boss-name">{{ boss.name }}</h3>
        <p>Nächster Spawn in:</p>
        <strong class="boss-timer">{{ boss.timer }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const bosses = ref([]);

const fetchBosses = async () => {
  try {
    const res = await fetch("http://localhost:8000/worldboss");
    const data = await res.json();
    bosses.value = data;
  } catch (err) {
    console.error("Fehler beim Laden der Boss-Daten:", err);
  }
};


onMounted(() => {
  // Daten abrufen und live aktualisieren
  fetchBosses();
  setInterval(fetchBosses, 1000);
});
</script>

<style scoped>

.boss-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.boss-card:nth-child(1) {
  background-image: url("https://d4planner.io/images/worldbosses/ashava_small.webp");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
}

.boss-card:nth-child(2) {
  background-image: url("https://d4planner.io//images/worldbosses/avarice_small.webp");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
}

.boss-card:nth-child(3) {
  background-image: url("https://d4planner.io/images/worldbosses/wanderingDeath_small.webp");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
}

.boss-card {
  width: 300px;
  height: 300px;
  padding: 20px;
  margin: 20px;
  background: #181818;
  color: #fff;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 0 20px rgba(45, 75, 35, 0.24);
  text-align: center;
}
</style>
