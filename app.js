new Vue({
  el: '#app',
  data: {
    gameStarted : false,    
    userHealth: 100,
    monsterHealth: 100,
    logs : [],
  },
  methods: {
    //Game playing functions
    startGame : function() {
      this.userHealth = 100;
      this.monsterHealth = 100;
      this.gameStarted = true;    
      this.logs = []; 
    },
    attackToMonster : function () {
      if(this.gameStarted) {
        var attackPower =  this.getRandomAttackPowerForUser();
        this.monsterHealth -= attackPower;  
        this.addUserLog('User attacked', attackPower);      
      }
    },
    specialAttackToMonster : function () {
      if(this.gameStarted) {
        var attackPower = this.getSpecialAttackPowerForUser();
        this.monsterHealth -= attackPower;    
        this.addUserLog('User attacked with SPECIAL attack', attackPower);    
      }
    },
    attackFromMonster : function () {
      if(this.gameStarted) {
        var attackPower =  this.getRandomAttackPowerForMonster();
        this.userHealth -= attackPower;
        this.addMonsterLog('Monster attacked', attackPower);
      }
    },
    getFirstAid : function () {      
      if(this.gameStarted) {
        var firstAid = 0;
        if( (100-this.userHealth) > 20) {
          firstAid = 20;
        } else {
          firstAid = 100 - this.userHealth;                    
        }
        this.userHealth += firstAid;
        this.addUserLog('User gets first aid', firstAid); 
        this.attackFromMonster();        
      }
    },
    //Game functions
    checkIfGameFinished : function () {
        if(this.userHealth == 0 ) {
          alert('Monster wins');
          this.gameStarted = false;  
        } else if(this.monsterHealth == 0){
          alert('You win');
          this.gameStarted = false;  
        }
             
    },
    //General function
    getRandomAttackPowerForUser: function () {
      var attackPower =  this.getRandomAttackPower();
       if(attackPower > this.monsterHealth) {
         attackPower = this.monsterHealth;
       }
       return attackPower;
    },
    getSpecialAttackPowerForUser : function () {
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
    },
    addUserLog : function(message, power) {
      this.logs.push({ attackType: "player" , message: message, power: power });
    },
    addMonsterLog: function(message, power) {
      this.logs.push({ attackType: "monster" , message: message, power: power });
    }
  },
  watch: {
    userHealth : function () { 
      if(this.gameStarted) {
        console.log('user health'); 
        this.checkIfGameFinished();
      }
    },
    monsterHealth : function () { 
      if(this.gameStarted) {
        console.log('monster health');       
        this.checkIfGameFinished();
        this.attackFromMonster();
      }
    }
  }
})