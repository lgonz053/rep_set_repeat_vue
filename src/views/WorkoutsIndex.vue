<template>
  <div class="workouts-index">
    <h1>Workouts</h1>
    <div v-for="workout in workouts">
      <ul>
          <h3><div>Muscle Group: {{ workout.muscle_group }}</div></h3>
          <div>Date: {{ moment((workout.created_at)).format('ll') }}</div>
      </ul>
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
      workouts: []
    };
  },
  created: function() {
    axios.get('/api/workouts')
      .then(response => {
        this.workouts = response.data
      }).
      catch(error => {
        this.$router.push("/login");    
      });
  },
  methods: {
    moment: function(date) {
      return moment(date);
    }
  }
};
</script>