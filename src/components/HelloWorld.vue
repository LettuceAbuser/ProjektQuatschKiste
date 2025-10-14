<template>
  <h1>Wilkommen in der Quatschkiste !</h1>
  <p>Hier findest du allerhand Schwachsinn, der zwar nicht wirklich viel nützt...</p>
  <p>aber die Technik dahinter ist schon verdammt cool man !</p>
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

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
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
