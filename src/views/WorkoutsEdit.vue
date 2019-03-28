<template>
  <div class="workouts-edit">
      <h1>Edit Workout</h1>

      <div class="font row form-spacer">
        <form v-on:submit.prevent="submit()" class="contact-form col-4 offset-4" id="contact" role="form" novalidate="novalidate">

            <!-- MAIL SENDING UNSUCCESSFULL -->
            <h6 class="errorContent" v-for="error in errors">
                <i class="fa fa-exclamation-circle left" style="color: #e1534f;"></i>{{ error }}
            </h6>
            <!-- END MAIL SENDING UNSUCCESSFULL -->
            <div>Muscle Groups To Choose From:</div>
            <div>Legs | Chest | Back | Shoulders | Biceps | Triceps | Abs | Cardio</div>
            <div class="mt-5"></div>

            <div class="form-field-wrapper row">
                <label class="col-4" for="muscle-group">Muscle Group: </label>
                <input class="input-sm col-8 form-full" id="muscle-group" type="number" v-model="workout.muscle_group">
            </div>

            <div class="form-field-wrapper row">
                <label class="col-4" for="time-limit">Time Limit: </label>
                <input class="input-sm col-8 form-full" id="time-limit" type="number" v-model="workout.time_limit">
            </div>

            <div class="row">
              <button class="btn btn-md btn-color-b form-full col-4 offset-2" type="submit" id="form-submit" name="submit">Update</button>
              <button class="btn btn-md btn-color-b form-full col-4 offset-1" v-on:click="destroyWorkout(workout.id)">Delete</button>
            </div>
        </form>


      </div>
  </div>
</template>

<style>
  .workouts-edit {
    padding-top: 210px;
  }

  .font {
    color: white;
  }  
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
    },
    destroyWorkout: function(inputId) {
      axios.delete('/api/workouts/' + inputId)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/");
        });
    }
  }
};
</script>