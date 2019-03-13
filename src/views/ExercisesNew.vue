<template>
  <div class="exercises-new">
    <h1>Create a new exercise</h1>

    <form v-on:submit.prevent="submit()">
      <div>
        Name: <input v-model="NewExerciseName">
      </div>

      <div>
        Description: <input v-model="NewExerciseDescription">
      </div>

      <div>
        Video Url (optional): <input v-model="NewExerciseUrl">
      </div>
      <input type="submit" value="Create">
    </form>

    <div>
      <h2>Edit Exercise:</h2>

      <select v-model="selectedExerciseId" id="names">
        <option v-for="exercise in exercises">{{ exercise.name }}</option>
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
  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
            NewExerciseName: '',
            NewExerciseDescription: '',
            NewExerciseUrl: '',
            exercises: {
                      id: '',
                      name: '',
                      description: '',
                      video_url: ''
                      }
    };
  },
  created: function() {
      axios.get('api/exercises')
        .then(response => {
          this.exercises = response.data;
        });
  },
  methods: {
    submit: function() {
      var params = {
                    name: this.NewExerciseName,
                    description: this.NewExerciseDescription,
                    video_url: this.NewExerciseUrl
                   };

      axios.post("/api/exercises", params)
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