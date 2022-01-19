new Vue({
  el: '#app',
  data: {
    gameStarted : false,
    userHealth: 100,
    monsterHealth: 100
  },
  methods: {
    //Game playing functions
    startGame : function() {
      this.gameStarted = true;     
    },
    attackToMonster : function () {
       var attackPower =  this.getRandomAttackPowerForUser();
       this.monsterHealth -= attackPower;
       this.attackFromMonster();
    },
    specialAttackToMonster : function () {
      var attackPower = this.getRandomAttackPowerForUser() + this.getRandomAttackPowerForUser();
      this.monsterHealth -= attackPower;
      this.attackFromMonster();
    },
    attackFromMonster : function () {
      var attackPower =  this.getRandomAttackPowerForMonster();
      this.userHealth -= attackPower;
    },
    //General function
    getRandomAttackPowerForUser: function () {
      var attackPower =  this.getRandomAttackPower();
       if(attackPower > this.monsterHealth) {
         attackPower = this.monsterHealth;
       }
       return attackPower;
    },
    getSpecialAttacPowerForUser : function () {
      var attackPower = this.getRandomAttackPowerForUser() + this.getRandomAttackPowerForUser();
      if(attackPower > this.monsterHealth) {
        attackPower = this.monsterHealth;
      }
      return attackPower;
    },
    getRandomAttackPowerForMonster: function () {
      var attackPower =  this.getRandomAttackPower();
       if(attackPower > this.userHealth) {
         attackPower = this.userHealth;
       }
       return attackPower;
    },
    getRandomAttackPower : function() {
      return Math.round((Math.random(1,10))*10);
    }
  }
})