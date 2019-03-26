<template>
  <div class="workouts-show">

    <h1>Current Workout</h1>
    
    <div class="font">
      Exercise Name:

      <select v-model="selectedExerciseId" id="names">
        <option v-for="exercise in exercises" v-bind:value="exercise.id">{{ exercise.name }}</option>
      </select>

      <form v-on:submit.prevent="submit()">
        <div>
          Set: <input v-model="newSet">
        </div>

        <div>
          Reps: <input v-model="newReps">
        </div>

        <div>
          Weight: <input v-model="newWeight">
        </div>

      <input type="submit" value="Create Set">
      </form>
    </div>

    <button v-on:click="hideShowDelete()">Edit Sets</button>

    <div v-for="workout_set in workout.workout_sets">
      <span v-if="displayDeleteButton">
        <button type="click" v-on:click="destroySet(workout_set.id)">Delete Set</button>
      </span>
      <div class="font">
        {{ workout_set.exercise.name }} |
        Set: {{ workout_set.groups }} |
        Reps: {{ workout_set.reps }} |
        Weight: {{ workout_set.weight }} |
        Volume: {{ workout_set.total_volume }} |
      </div>
    </div>

    <div class="font">
      <button v-on:click="calculate()">Calculate Total Volume</button>
      Total Volume Today: {{ volumePerDay }}
    </div>

    <div>
      <router-link v-bind:to="'/workouts/' + workout.id + '/edit'">
        <button>Edit Workout</button>
      </router-link>
    </div>
  </div>
</template>

<style>
  .workouts-show{
    padding: 100px;
  }

  .font {
    color: white;
  }
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
            workout: [
                         {
                          id: '',
                          user_id: '',
                          muscle_group: '',
                          time_limit: '',
                          created_at: '',
                          workout_sets: [
                                          {
                                           id: '',
                                           workout_id: '',
                                           exercise_id: '',
                                           groups: '',
                                           reps: '',
                                           weight: '',
                                           total_volume: '',
                                           exercise: {
                                                     id: '',
                                                     name: '',
                                                     description: '',
                                                     video_url: ''
                                                     }
                                            }
                                        ] 
                         }
                      ],
            selectedExerciseId: '',
            selectedWorkoutSetId: '',
            exercises: [],
            newSet: '',
            newReps: '',
            newWeight: '',
            total_volume: '',
            volumePerDay: 0,
            displayDeleteButton: false,
            titleFilter: '',
            errors: []
    };
  },
  created: function() {
    axios.get('/api/exercises')
      .then(response => {
        this.exercises = response.data;
      });

      axios.get('/api/workouts/' + this.$route.params.id)
        .then(response => {
          this.workout = response.data
      });
  },
  methods: {
    submit: function() {
      var params = {
                    workout_id: this.$route.params.id,
                    exercise_id: this.selectedExerciseId,
                    groups: this.newSet,
                    reps: this.newReps,
                    weight: this.newWeight
                    }

      axios.post('/api/workout_sets', params)
        .then(response => {
          this.workout.workout_sets.push(response.data);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    calculate: function() {
      var workoutSet = this.workout.workout_sets;
      this.volumePerDay = 0;

      for(var i = 0; i < workoutSet.length; i++) {
        var currentSet = workoutSet[i];
        this.volumePerDay += currentSet['total_volume'];
      }
    },
    destroySet: function(inputId) {
      axios.delete("/api/workout_sets/" + inputId)
        .then(response => {
          console.log("Success", response.data);
          this.$router.go("/workouts/" + this.$route.params.id);
        });
    },
    hideShowDelete: function() {
      this.displayDeleteButton ? this.displayDeleteButton = false : this.displayDeleteButton = true;
    }
  }
};
</script>