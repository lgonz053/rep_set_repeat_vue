<template>
  <div class="workouts">
    <h1>Workouts</h1>
    <h5>{{workouts}}</h5>
    <!-- <div>
      <li v-for=""></li>
    </div> -->
  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');

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
      });
  },
  methods: {}
};
</script>

<!-- var student_id = localStorage.getItem("student_id");
   if (student_id) {
     this.$router.push("/students/" + student_id);
   } else {
     this.$router.push("/login");
   } -->