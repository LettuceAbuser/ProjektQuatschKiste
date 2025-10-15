<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/game">Wie hoch?!</router-link> |
    <router-link to="/tracker">Diablo IV Tracker</router-link> |
    <router-link to="/league">Champion Spinner</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

body {
  background-image: url("../public/img/BG.jpg");
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
}

nav a.router-link-exact-active {
  color: #a7d79a;
}
</style>
