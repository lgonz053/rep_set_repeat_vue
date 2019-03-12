<template>
  <div class="workouts-show">

    <h1>Current Workout</h1>
    
    <div>
      Exercise Name:

      <select v-model="selectedExerciseId" id="names">
        <option v-for="exercise in exercises" v-bind:value="exercise.id">{{ exercise.name }}</option>
      </select>

      <form v-on:submit.prevent="submit()">
        <div>
          Set: <input v-model="NewSet">
        </div>

        <div>
          Reps: <input v-model="NewReps">
        </div>

        <div>
          Weight: <input v-model="NewWeight">
        </div>

      <input type="submit" value="Create Set">
      </form>
    </div>

    <div v-for="workout_set in workout.workout_sets">
      {{ workout_set.id }}
      {{ workout_set.exercise.name }} |
      Set: {{ workout_set.groups }} |
      Reps: {{ workout_set.reps }} |
      Weight: {{ workout_set.weight }} |
      Total Volume: {{ workout_set.total_volume }} |
    </div>
  </div>
</template>

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
            exercises: [],
            NewSet: '',
            NewReps: '',
            NewWeight: '',
            errors: []
    };
  },
  created: function() {
    axios.get('api/exercises')
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
                    groups: this.NewSet,
                    reps: this.NewReps,
                    weight: this.NewWeight
                    }

      axios.post('api/workout_sets', params)
        .then(response => {
          // console.log('Success', response.data);
          // this.$router.push('/workouts/' + this.$route.params.id)
          this.workout.workout_sets.push(response.data);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>