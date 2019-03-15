<template>
  <div class="workouts-index">
    <h1>Workouts</h1>

    <div v-for="workout in workouts">
      <router-link style='color:black' v-bind:to="'/workouts/' + workout.id">
        <h3><div>Muscle Group: {{ workout.muscle_group }}</div></h3>
      </router-link>
        <div>Date: {{ moment((workout.created_at)).format('ll') }}</div>
        <div v-on:load="userFriendlyTime(workout.time_limit)">Time: {{ userFriendlyHour }}</div>
    </div>
  </div>
</template>

<style>
.workouts-index{
  padding: 20px;
  margin-top: 30px;
}
.workouts-index h1{
  text-decoration: underline;
}
.workouts-index h3{
  text-align: center;

}
</style>

<script>
var axios = require('axios');
var moment = require('moment');

export default {
  data: function() {
    return {
      workouts: [],
      userFriendlyHour: 0,
      userFriendlyMinute: 0
    };
  },
  created: function() {
    axios.get('/api/workouts')
      .then(response => {
        this.workouts = response.data
      }).catch(error => {
        this.$router.push("/login");    
      });
  },
  methods: {
    moment: function(date) {
      return moment(date);
    }
  },
    userFriendlyTime: function(time) {
      console.log(time);
      currentTime = parseInt(time);

      console.log(currentTime);
      minutes = currentTime * 60;
      userFriendlyMinute = (minutes % 60).round;
      userFriendlyHour = currentTime.floor;
  }
};
</script>