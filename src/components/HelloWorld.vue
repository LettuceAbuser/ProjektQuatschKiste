<template>
  <h1>Wilkommen in der Quatschkiste!</h1>
  <p>Hier findest du allerhand Schwachsinn, der zwar nicht wirklich viel nützt...</p>
  <p>aber die Technik dahinter ist schon verdammt cool man !</p>
  <div class="container">
    <h2>3 Komponenten</h2>
    <p>3 Komponenten, sortiert nach aufsteigender komplexität.
      <br> <br>
      Die erste Komponenete benutzt ein eigenes Backend <strong>(server: Express)</strong>,
      welches Daten einer Datenbank <strong>(CouchDB)</strong> abrufen und speichern <strong>(cors)</strong> kann. Ausserdem eine simple Logik <strong>(JavaScript)</strong>,
      die 2 zufällige Zahlen erzeugt und diese gegeneinander prüft. Das ganze wird dann noch ein bisschen animiert <strong>(JavaScript, CSS)</strong>, damits etwas spannender ist.
      <br> <br>
      Die zweite Komponente benutzt eine Technik namens "Scraping" <strong>(Puppeteer)</strong> und läuft ebenfalls über den eigenen backend Server <strong>(Express)</strong>.
      Dabei wird eine bereits exisitierende Website (<a href="https://d4planner.io/trackers/world-bosses"> https://d4planner.io/trackers/world-bosses</a>)
      geladen und diese anhand von mehreren HTML Attributen "gefiltert". Man kann dann anhand dieser gefilterten Attribute die Daten der jeweiligen Objekte auslesen und
      damit weiter arbeiten. In diesem Beispiel wird die filterung jede Sekunde aktualisiert <strong>(JavaScript)</strong>.
      Darunter befindet sich noch eine Interaktive Karte von Diablo, diese ist von der gleichen Seite einfach über ein iFrame <strong>(HTML)</strong> geklaut hehe.
      <br> <br>
      Die dritte Komponente ruft eine bereits vorhandene Datenbank auf (<a href="https://ddragon.leagueoflegends.com/cdn/14.18.1/data/en_US/champion.json">DDragon</a>)
      die im gegensatz zu komponente 1 eine komplexe JSON datei liefert. Diesen Daten werden dann per filterlogik <strong>(JavaScript)</strong> aufgeteilt in Lanes.
      Beim drücken des Buttons wird dann eine Roll Funktion <strong>(JavaScript)</strong> ausgelöst, die durch das Array der ausgewählten Lane iteriert.
      Das ist mit einer Animation verfeinert <strong>(JavaScript, CSS)</strong>
      <br> <br>
      Alle Komponenten nutzen Features von Vue <strong>(ref, computed, onMounted)</strong>. Diese sorgen dafür, das die UI reaktiv ist.
    </p>
  </div>
  <div class="container">
  <h3>Erklärung: Wie hoch?!</h3>
  <p><strong>Spielprinzip:</strong> Stell dir vor du bist in der Kneipe. Wie immer hörst du vom Tresen diesen einen Dulli der fester von sich überzeugt ist als jeder andere...
    Nichts und niemand kann etwas besser als er und in seinem suff kopf sagt er sowas wie "er könnte eine Zigarette in 30 Sekunden rauchen"
    Natürlich ist das wie alles andere was er von sich gibt nichts als Schnack, und da kommt der Warscheinlichkeits-Generator ins Spiel!
    Du gehst also hin (natürlich mit genug abstand um nicht von seiner Fahne überwältigt zu werden) und fragst in Wie hoch ist die Warscheinlichkeit das er es beweist?
    <br><br>
    Er muss also eine Zahl zwischen 1 und 100 sagen, als beispiel sagt er diesmal 10. Normalerweise funktioniert es dann so, dass ich von 3 runter zähle und wir beide dann
    eine Zahl zwischen 1-10 sagen. Wenn wir beide die gleiche Zahl sagen, dann muss er die Challenge probieren. Er ist aber natürlich viel betrunken und schafft nichtmal mehr das.
    Also zückst du dein Handy und lässt das ganze Spiel über die App auf dieser Webseite laufen.
  </p>
  </div>
</template>

<script setup>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    background: #181818;
    color: #fff;
    border-radius: 16px;
    box-shadow: 0 0 20px rgba(45, 75, 35, 0.24);
    text-align: center;
}
</style>
