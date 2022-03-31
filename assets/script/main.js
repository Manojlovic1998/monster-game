// Generates random value
let getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

let app = Vue.createApp({
  data() {
    return {
      // Monster and Player Data
      playerHealth: 100,
      monsterHealth: 100,
    };
  },
  computed: {
    monsterBarStyle() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      return { width: this.playerHealth + "%" };
    },
  },
  methods: {
    // Atack Action
    attackMonster() {
      // Random num is multiplied by (maxNum - minNum)
      // Take a floor value of the above expression to round the expression result
      // add the minimum again
      const attackValue = getRandomValue(12, 6);
      // Reduce the monsters' health by the attack value
      this.monsterHealth -= attackValue;
      // Monster attacks back
      this.attackPlayer();
    },
    attackPlayer() {
      // Random num is multiplied by (maxNum - minNum)
      // Take a floor value of the above expression to round the expression result
      // add the minimum again
      const attackValue = getRandomValue(15, 8);
      // Reduce players' health by the attack value
      this.playerHealth -= attackValue;
    },
  },
});

app.mount("#main");
