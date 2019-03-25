<template>
  <div class="workouts-index">
    <h1>Workouts</h1>

    <div>
      <button v-on:click="recentWorkouts()">Recent Workouts</button>
      <button v-on:click="allWorkouts()">All Workouts</button>
      <button v-on:click="sortByBodyPart('Legs')">Legs</button>
      <button v-on:click="sortByBodyPart('Chest')">Chest</button>
      <button v-on:click="sortByBodyPart('Back')">Back</button>
      <button v-on:click="sortByBodyPart('Shoulders')">Shoulders</button>
      <button v-on:click="sortByBodyPart('Biceps')">Biceps</button>
      <button v-on:click="sortByBodyPart('Triceps')">Triceps</button>
      <button v-on:click="sortByBodyPart('Abs')">Abs</button>
      <button v-on:click="sortByBodyPart('Cardio')">Cardio</button>
    </div>

    <div v-for="workout in workouts">
      <router-link style='color:black' v-bind:to="'/workouts/' + workout.id">
        <h3><div>Muscle: {{ workout.muscle_group }}</div></h3>
      </router-link>
        <div>Date: {{ moment((workout.created_at)).format('ll') }}</div>
        <div>Workout Length: {{ workout.formatted.time_limit }}</div>
    </div>
  </div>
</template>

<style>
.workouts-index{
  padding: 20px;
  margin-top: 30px;
}
.workouts-index h1{
  text-decoration: underline;
}
.workouts-index h3{
  text-align: center;

}
</style>

<script>
var axios = require('axios');
var moment = require('moment');

export default {
  data: function() {
    return {
      workouts: []
    };
  },
  created: function() {
    axios.get('/api/workouts')
      .then(response => {
        let loopTimes;
        
        response.data.length < 10 ? loopTimes = response.data.length : loopTimes = 10;

        for(var i = 0; i < loopTimes; i++) {
          this.workouts.push(response.data[i]);
        }
      }).catch(error => {
        this.$router.push("/login");    
      });
  },
  methods: {
    moment: function(date) {
      return moment(date);
    },
    recentWorkouts: function() {
      axios.get('/api/workouts')
        .then(response => {
            var currentWorkouts = [];

            for(var i = 0; i < 10; i++) {
              var currentWorkout = response.data[i];
                currentWorkouts.push(currentWorkout);
            } 
            this.workouts = currentWorkouts
        });
    },
    allWorkouts: function() {
      console.log('All Workouts')
      axios.get('/api/workouts')
        .then(response => {
          this.workouts = response.data;
        });
    },
    sortByBodyPart: function(muscleGroupWanted) {
      axios.get('/api/workouts')
      .then(response => {
        var muscleGroups = [];

        for(var i = 0; i < response.data.length; i++) {
          var currentWorkout = response.data[i];

          if(currentWorkout.muscle_group === muscleGroupWanted) {
            muscleGroups.push(currentWorkout);
          }
          
          this.workouts = muscleGroups
        }
      });
    }
  }
};
</script>