<template>
  <div class="exercises-new">
    <h1>Create a new exercise</h1>

    <div class="font row form-spacer">
      <form v-on:submit.prevent="submit()" class="contact-form col-4 offset-4" id="contact" role="form" novalidate="novalidate">

          <!-- MAIL SENDING UNSUCCESSFULL -->
          <h6 class="errorContent" v-for="error in errors">
              <i class="fa fa-exclamation-circle left" style="color: #e1534f;"></i>{{ error }}
          </h6>
          <!-- END MAIL SENDING UNSUCCESSFULL -->
          <div class="mt-5"></div>

          <div class="form-field-wrapper row">
              <label class="col-4" for="new-exercise-name">Exercise Name: </label>
              <input class="input-sm col-8 form-full" id="new-exercise-name" type="text" v-model="newExerciseName">
          </div>

          <div class="form-field-wrapper row">
              <label class="col-4" for="new-description">Description: </label>
              <textarea class="input-sm col-8 form-full" id="new-description" type="number" v-model="newExerciseDescription">
              </textarea>
          </div>

          <div class="form-field-wrapper row">
              <label class="col-4" for="new-video-url">Video Url (optional): </label>
              <input class="input-sm col-8 form-full" id="new-video-url" v-model="newExerciseUrl">
          </div>

          <div class="row">
            <button class="btn btn-md btn-color-b form-full col-6 offset-3" type="submit" id="form-submit" name="submit">Create</button>
          </div>
      </form>


    </div>


      <h1 class="mt-5">Edit Exercise</h1>

      <div class="font row form-spacer mt-5 pb-5">
        <form v-on:submit.prevent="editExercise()" class="contact-form col-4 offset-4" id="contact" role="form" novalidate="novalidate">

            <div class="form-field-wrapper row">
              <label class="col-4">Pick Exercise to Edit: </label>
              <select class="input-sm col-8 form-full" v-model="selectedExerciseId" v-on:change="getExercise()">
                <option v-for="exercise in exercises" v-bind:value="exercise.id">{{ exercise.name }}</option>
              </select>
            </div>

            <div class="form-field-wrapper row">
                <label class="col-4" for="edit-exercise-name">Exercise Name: </label>
                <input class="input-sm col-8 form-full" id="edit-exercise-name" type="text" v-model="exercise.name">
            </div>

            <div class="form-field-wrapper row">
                <label class="col-4" for="edit-description">Description: </label>
                <textarea class="input-sm col-8 form-full" id="edit-description" v-model="exercise.description">
                </textarea>
            </div>

            <div class="form-field-wrapper row">
                <label class="col-4" for="edit-video-url">Video Url (optional): </label>
                <input class="input-sm col-8 form-full" id="edit-video-url" type="text" v-model="exercise.video_url">
            </div>

            <div class="row">
              <button class="btn btn-md btn-color-b form-full col-6 offset-3" type="submit" id="form-submit" name="submit">Edit Exercise</button>
            </div>
        </form>

      <!-- <select v-model="selectedExerciseId" v-on:change="getExercise()">
        <option v-for="exercise in exercises" v-bind:value="exercise.id">{{ exercise.name }}</option>
      </select>

      <form v-on:submit.prevent="editExercise()">

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
      </form> -->
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