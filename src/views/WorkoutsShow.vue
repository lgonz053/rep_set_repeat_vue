<template>
  <div class="workouts-show">

    <h1>Current Workout</h1>
    
    
    <div class="font row form-spacer">
      <form v-on:submit.prevent="submit()" class="contact-form col-4 offset-4" id="contact" role="form" novalidate="novalidate">

          <!-- MAIL SENDING UNSUCCESSFULL -->
          <h6 class="errorContent" v-for="error in errors">
              <i class="fa fa-exclamation-circle left" style="color: #e1534f;"></i>{{ error }}
          </h6>
          <!-- END MAIL SENDING UNSUCCESSFULL -->

          <div class="form-field-wrapper row">
              <label class="col-4" for="exercise-name">Exercise Name:</label>
              <select class="input-sm col-8 form-full" v-model="selectedExerciseId" id="exercise-name">
                <option v-for="exercise in exercises" v-bind:value="exercise.id">{{ exercise.name }}</option>
              </select>
          </div>

          <div class="form-field-wrapper row">
              <label class="col-4" for="new-set">Set: </label>
              <input class="input-sm col-8 form-full" id="new-set" type="number" v-model="newSet">
          </div>

          <div class="form-field-wrapper row">
              <label class="col-4" for="new-reps">Reps: </label>
              <input class="input-sm col-8 form-full" id="new-reps" type="number" v-model="newReps">
          </div>

          <div class="form-field-wrapper row">
              <label class="col-4" for="new-weight">Weight: </label>
              <input class="input-sm col-8 form-full" id="new-weight" type="number" v-model="newWeight">
          </div>

          <button class="btn btn-md btn-color-b form-full" type="submit" id="form-submit" name="submit">Create</button>
      </form>

    </div>


    <table class="table table-hover table-dark mt-5">
      <thead>
        <tr>
          <th scope="col">Exercise</th>
          <th scope="col">Sets</th>
          <th scope="col">Reps</th>
          <th scope="col">Weight</th>
          <th scope="col">Volume</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="workout_set in workout.workout_sets">
          <th scope="row">{{ workout_set.exercise.name }}</th>
          <td>{{ workout_set.groups }}</td>
          <td>{{ workout_set.reps }}</td>
          <td>{{ workout_set.weight }}</td>
          <td>{{ workout_set.total_volume }}</td>
          <td class="font-color-b" v-on:click="destroySet(workout_set)" >Delete Set</td>
        </tr>
      </tbody>
    </table>


    <div class="font row">
      <div class="col-4">
        <button class="btn btn-md btn-color-b" v-on:click="hideShowDelete()">Edit Sets</button>
      </div>
      <router-link class="col-4" v-bind:to="'/workouts/' + workout.id + '/edit'">
        <button class="btn btn-md btn-color-b">Edit Workout</button>
      </router-link>
      <div class="col-4">
          <button class="btn btn-md btn-color-b" v-on:click="calculate()">Calculate Total Volume</button>
          Total Volume Today: {{ volumePerDay }}
      </div>
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

  .form-spacer {
    margin-top: 30px;
  }

  .font-color-b {
    color: #e6ae49;
  }

  input, select {
    margin-bottom: 20px;
    font-family: 'Raleway', sans-serif;
    font-size: 12px;
    border-radius: 2px;
    background: white;
    padding: 4px; 
    width: 250px;
    height: 25px;
  }

    .input1 {
      margin-left: 75px;
    }

    .input2 {
      margin-left: 65px;
    }

    .input3 {
      margin-left: 49px;
    }

  .deleteButton {
    margin-left: 20px 
  }

  .createButton {
    margin-bottom: 40px;
  }

  .form-full {
    height: 30px;
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
    destroySet: function(inputWorkOut) {
      axios.delete("/api/workout_sets/" + inputWorkOut.id)
        .then(response => {
          console.log("Success", response.data);
          var index = this.workout.workout_sets.indexOf(inputWorkOut);
          this.workout.workout_sets.splice(index, 1);
        });
    },
    hideShowDelete: function() {
      this.displayDeleteButton ? this.displayDeleteButton = false : this.displayDeleteButton = true;
    }
  }
};
</script>