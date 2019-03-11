<template>
  <div class="workouts">
    <h1>{{ workouts }}</h1>
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