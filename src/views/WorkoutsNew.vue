<template>
  <div class="workouts-new">
    <h1>New Workout</h1>

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
              <input class="input-sm col-8 form-full" id="muscle-group" type="number" v-model="newMuscleGroup">
          </div>

          <div class="form-field-wrapper row">
              <label class="col-4" for="new-hour">Hour: </label>
              <select class="input-sm col-8 form-full" id="new-hour" type="number" v-model="selectedHour">
                <option v-for="hour in hours" v-bind:value="hour">{{ hour }} Hours</option>
              </select>
          </div>

          <div class="form-field-wrapper row">
              <label class="col-4" for="new-minute">Minutes: </label>

              <select class="input-sm col-8 form-full" id="new-minute" type="number" v-model="selectedMinute" v-on:change="hoursMinutes()">
                <option v-bind:value="0">00 Minutes</option>
                <option v-bind:value="0.25">15 Minutes</option>
                <option v-bind:value="0.5">30 Minutes</option>
                <option v-bind:value="0.75">45 Minutes</option>
              </select>
          </div>

          <div class="row">
            <button class="btn btn-md btn-color-b form-full col-6 offset-4" type="submit" id="form-submit" name="submit">Create New Workout</button>
          </div>
      </form>


    </div>
  </div>
</template>

<style>
  .workouts-new {
    padding-top: 190px;
  }

  h1, h3 {
    color: #e6ae49 !important;
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
              newMuscleGroup: '',
              newHour: 0,
              newMinute: 0,
              newTimeLimit: 0,
              hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
              minutes: [.00, .15, .30, .45],
              selectedHour: 0,
              selectedMinute: 0,
              errors: []
    };
  },
  created: function() {},
  methods: {
    submit: function() {
      console.log(parseInt(this.selectedMinute))
      var params = {
                    muscle_group: this.newMuscleGroup,
                    time_limit: parseFloat(this.selectedHour) + parseFloat(this.selectedMinute)
                   };

      axios.post("/api/workouts", params)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/")
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    hoursMinutes: function() {
      this.newHour = 0
      this.newMinute = 0
      this.newTimeLimit = 0

      this.newHour += this.selectedHour 
      this.newMinute += this.selectedMinute
      this.newTimeLimit = this.selectedHour + this.selectedMinute
    }
  }
};
</script>