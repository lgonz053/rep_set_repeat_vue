<template>
  <div class="workouts-index">
    
    <section id="about" class="pt pt-sm-80">
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        <div class="col-md-8 offset-md-2"></div>
                        <h2>
                            <span class="color">WorkOuts.</span>
                        </h2>
                    </div>
                </div>
            </div>
        </section>

    <!-- Work Section -->
    <section class="ptb ptb-sm-80">
        <div class="container">
            <!-- work Filter -->
            <div class="row">
                <ul class="col container-filter categories-filter">
                    <li><a class="categories active" v-on:click="recentWorkouts()">Recent Workouts</a></li>
                    <li><a class="categories" v-on:click="allWorkouts()">All Workouts</a></li>
                    <li><a class="categories" v-on:click="sortByBodyPart('Legs')">Legs</a></li>
                    <li><a class="categories" v-on:click="sortByBodyPart('Chest')">Chest</a></li>
                    <li><a class="categories" v-on:click="sortByBodyPart('Back')">Back</a></li>
                    <li><a class="categories" v-on:click="sortByBodyPart('Shoulders')">Shoulders</a></li>
                    <li><a class="categories" v-on:click="sortByBodyPart('Biceps')">Biceps</a></li>
                    <li><a class="categories" v-on:click="sortByBodyPart('Triceps')">Triceps</a></li>
                    <li><a class="categories" v-on:click="sortByBodyPart('Abs')">Abs</a></li>
                    <li><a class="categories" v-on:click="sortByBodyPart('Cardio')">Cardio</a></li>
                </ul>
            </div>
            <!-- End work Filter -->
            <div class="row container-grid nf-col-3">

                <div class="nf-item branding coffee spacing" v-for="workout in workouts">
                    <div class="item-box">
                        <router-link v-bind:to="'/workouts/' + workout.id">
                            <img alt="1" src="img/plate.jpg" class="item-container">
                            <div class="item-mask">
                                <div class="item-caption">
                                    <h5 class="white">{{ workout.muscle_group }}</h5>
                                    <p class="white">Date: {{ moment((workout.created_at)).format('ll') }}</p>
                                    <p class="white">Workout Length: {{ workout.formatted.time_limit }}</p>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
              </div>
        </div>

    </section>
    <!-- End Work Section -->
  </div>
</template>

<style>
.workouts-index{
  padding: 20px;
  min-height: 1560px;
  background-color: #404040;
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
        
        response.data.length < 12 ? loopTimes = response.data.length : loopTimes = 12;

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
            let loopTimes;
        
            response.data.length < 12 ? loopTimes = response.data.length : loopTimes = 12;

            for(var i = 0; i < loopTimes; i++) {
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