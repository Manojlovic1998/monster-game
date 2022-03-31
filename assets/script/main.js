let app = Vue.createApp({
  data() {
    return {
      // Monster and Player Data
      playerHealth: 100,
      monsterHealth: 100,
    };
  },
});

app.mount("#main");
