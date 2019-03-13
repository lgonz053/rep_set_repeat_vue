<template>
  <div class="workouts-new">
    <h1>New Workout</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <form v-on:submit.prevent="submit()">
      <div>Muscle Groups To Choose From:</div>
      <div>Legs | Chest | Back | Shoulders | Biceps | Triceps | Abs | Cardio</div><br>

      <div>
        Muscle Group: <input v-model="newMuscleGroup">
      </div>

      <div>
        Time Limit: <input v-model="newTimeLimit">
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
              newMuscleGroup: '',
              newTimeLimit: '',
              errors: []
    };
  },
  created: function() {},
  methods: {
    submit: function() {
      var params = {
                    muscle_group: this.newMuscleGroup,
                    time_limit: this.newTimeLimit
                   };

      axios.post("/api/workouts", params)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/")
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>