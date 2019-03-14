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

      <h3>Time Limit</h3>

      <select v-model="selectedHour">
        <option v-for="hour in hours" v-bind:value="hour">{{ hour }}</option>
      </select>

      <select v-model="selectedMinute" v-on:change="hoursMinutes()">
        <option v-for="minute in minutes" v-bind:value="minute">{{ minute }}</option>
      </select>

      <div>
        <h5 v-if="newHour < 2 && newMinute === .00">{{ `${newHour} hour and ${newMinute}`}}</h5>
        <h5 v-else-if="newMinute === .00">{{ `${newHour} hours and ${newMinute} minutes`}} </h5>
        <h5 v-else-if="newHour > 2 && newMinute > .00">{{ `${newHour} hours and ${newMinute} minutes`}} </h5>
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
              newHour: 0,
              newMinute: 0,
              newTimeLimit: 0,
              hours: [1, 2, 3, 4, 5, 6, 7, 8, 9],
              minutes: [.00, .15, .30, .45],
              selectedHour: 0,
              selectedMinute: 0,
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
    },
    hoursMinutes: function() {
      this.newHour += this.selectedHour 
      this.newMinute += this.selectedMinute
      this.newTimeLimit = this.selectedHour + this.selectedMinute
    }
  }
};
</script>