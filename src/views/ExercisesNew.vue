<template>
  <div class="exercises-new">
    <h1>Create a new exercise</h1>

    <form v-on:submit.prevent="submit()">
      <div>
        Name: <input v-model="newExerciseName">
      </div>

      <div>
        Description: <input v-model="newExerciseDescription">
      </div>

      <div>
        Video Url (optional): <input v-model="newExerciseUrl">
      </div>
      <input type="submit" value="Create">
    </form>

    <div>
      <h2>Edit Exercise:</h2>

      <select v-model="selectedExerciseId" v-on:change="getExercise()">
        <option v-for="exercise in exercises" v-bind:value="exercise.id">{{ exercise.name }}</option>
      </select>

      <form v-on:submit.prevent="editExercise()">
        Name: {{ exercise.name }}<br>
        Description: {{ exercise.description }}<br>
        Video Url: {{ exercise.video_url }}
        <div>
          Name: <input v-model="exercise.name">
        </div>

        <div>
          Description: <input v-model="exercise.description">
        </div>

        <div>
          Video Url: <input v-model="exercise.video_url">
        </div>

      <input type="submit" value="Edit Exercise">
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
            newExerciseName: '',
            newExerciseDescription: '',
            newExerciseUrl: '',
            exercises: {
                      id: '',
                      name: '',
                      description: '',
                      video_url: ''
                      },
            selectedExerciseId: '',
            exercise: {
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
                    name: this.newExerciseName,
                    description: this.newExerciseDescription,
                    video_url: this.newExerciseUrl
                   };

      axios.post("/api/exercises", params)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/")
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    getExercise: function() {
      axios.get('api/exercises/' + this.selectedExerciseId)
        .then(response => {
          this.exercise = response.data;
        });
    },
    editExercise: function() {
      var params = {
                    name: this.exercise.name,
                    description: this.exercise.description,
                    video_url: this.exercise.video_url
                   }
      axios.patch('api/exercises/' + this.selectedExerciseId, params)
        .then(response => {
          this.$router.push('/');
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>