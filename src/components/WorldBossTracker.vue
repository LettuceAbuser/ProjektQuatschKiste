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
        <div class="boss-name">{{ boss.name }}</div>
        <div class="boss-timer">{{ boss.timer }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"

const bosses = ref([])

// Funktion zum Abrufen der Boss-Daten vom Backend
const fetchBosses = async () => {
  try {
    const response = await fetch("http://localhost:8000/worldboss")
    if (!response.ok) throw new Error("Fehler beim Abrufen der Daten")
    bosses.value = await response.json()
  } catch (err) {
    console.error("Fehler beim Laden der Bossdaten:", err)
  }
}

// Polling-Intervall
let interval

onMounted(() => {
  fetchBosses()
  interval = setInterval(fetchBosses, 2000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>

</style>
