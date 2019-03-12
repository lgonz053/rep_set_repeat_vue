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

    <div>{{workout_sets}}</div>
  </div>
</template>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
            workout_sets:
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
                          }, 
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

      axios.get('/api/workout_sets/' + this.$route.params.id)
        .then(response => {
          this.workout_sets = response.data
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
          console.log('Success', response.data);
          this.route.push('/workouts' + this.$route.params.id)
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>