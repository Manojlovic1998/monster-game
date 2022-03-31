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
      currentRound: 0,
      winner: null,
    };
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    specialButtonStatus() {
      if (this.currentRound === 0) {
        return true;
      }
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Monster lost
        this.winner = "player";
      }
    },
  },
  methods: {
    // Atack Action
    attackMonster() {
      this.currentRound++;
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
    specialAttack() {
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;

      // Monster attacks back
      this.attackPlayer();
      this.currentRound++;
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
        // Monster attacks back
      } else {
        this.playerHealth += healValue;
        // Monster attacks back
      }
      this.attackPlayer();
    },
    closeMessage() {
      this.winner = null;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
    },
    surrender() {
      this.winner = "monster";
    },
  },
});

app.mount("#main");
