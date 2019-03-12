<template>
  <div class="workouts-show">

    <h1>Current Workout</h1>
    
    <div>
      Exercise Name:

      <select v-model="selectedExerciseId" id="names">
        <option v-for="exercise in exercises" v-bind:value="exercise.id">{{ exercise.name }}</option>
      </select>
    </div>
    </div>
  </div>
</template>

<script>
var axios = require('axios');
export default {
  data: function() {
    return {
            workout_sets: [
              {
               workout_id: "",
               exercise_id: "",
               groups: "",
               reps: "",
               weight: "",
               total_volume: "",
               exercise:
                   {
                     id: "",
                     name: "",
                     description: "",
                     video_url: "",
                     body_parts: [
                       {
                         id: "",
                         name: "",
                         muscle_group: ""
                     }
                   ]
                 }
              }
            ],
        selectedExerciseId: '',
        exercises: []
    };
  },
  created: function() {
    axios.get('api/exercises')
      .then(response => {
        this.exercises = response.data;
      });
  },
  methods: {}
};
</script>