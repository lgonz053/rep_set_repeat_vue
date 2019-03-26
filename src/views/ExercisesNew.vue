<template>
  <div class="exercises-new">
    <h1>Create a new exercise</h1>

    <div class="font">
      <form v-on:submit.prevent="submit()">
        <div>
          Name: <input class="nameText" v-model="newExerciseName">
        </div>

        <div>
          Description: <input class="description" v-model="newExerciseDescription">
        </div>

        <div>
          Video Url (optional): <input class="videoUrl1" v-model="newExerciseUrl">
        </div>
        <button type="submit">Create</button>
      </form>
    </div>

    <div class="font">
      <h2>Edit Exercise:</h2>

      <select v-model="selectedExerciseId" v-on:change="getExercise()">
        <option v-for="exercise in exercises" v-bind:value="exercise.id">{{ exercise.name }}</option>
      </select>

      <form v-on:submit.prevent="editExercise()">
        <div class="descriptionText">
          Name: {{ exercise.name }}<br>
          Description: {{ exercise.description }}<br>
          Video Url: {{ exercise.video_url }}
        </div>
        <div>
          Name: <input class="nameText2" v-model="exercise.name">
        </div>

        <div>
          Description: <input class="description2" v-model="exercise.description">
        </div>

        <div>
          Video Url: <input class="videoUrl2" v-model="exercise.video_url">
        </div>

        <button type="submit">Edit Exercise</button>
      </form>
    </div>
  </div>
</template>

<style>
.exercises-new{
  margin-top: 35px;
}

h2 {
  color: #e6ae49 !important;
}

.font {
    color: white;
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

 .nameText {
  margin-left: 114px;
 }

 .videoUrl1 {
  margin-left: 20px;
 }

 .description {
  margin-left: 75px;
 }

 .descriptionText {
  margin-bottom: 30px;
  margin-right: 250px;
  margin-left: 250px;
 }

 .nameText2 {
  margin-left: 36px;
 }

 .videoUrl2 {
  margin-left: 14px;
 }
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
      axios.get('/api/exercises')
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
      axios.get('/api/exercises/' + this.selectedExerciseId)
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