<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/game">Wie hoch?!</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #5adc2f;
}

body {
  background-color: #383838;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #5adc2f;
}

nav a.router-link-exact-active {
  color: #a7d79a;
}
</style>
