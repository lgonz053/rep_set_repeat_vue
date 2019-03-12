<template>
  <div class="workouts-edit">
      <h1>Edit Workout</h1>

      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>

      <form v-on:submit.prevent="submit()">
        <div>Muscle Groups To Choose From:</div>
        <div>Legs | Chest | Back | Shoulders | Biceps | Triceps | Abs | Cardio</div><br>

        <div>
          Muscle Group: <input v-model="workout.muscle_group">
        </div>

        <div>
          Time Limit: <input v-model="workout.time_limit">
        </div>

        <input type="submit" value="Update">
      </form>
  </div>
</template>

<style>
  
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      workout: {
              muscle_group: "",
              time_limit: ""
             },
      errors: []
    };
  },
  created: function() {
    axios.get('/api/workouts/' + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.workout = response.data;
      });
  },
  methods: {
    submit: function() {
      var params = {
                    muscle_group: this.workout.muscle_group,
                    time_limit: this.workout.time_limit
                   };

      axios.patch("/api/workouts/" + this.workout.id, params)
        .then(response => {
          this.$router.push('/workouts/' + this.workout.id);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>