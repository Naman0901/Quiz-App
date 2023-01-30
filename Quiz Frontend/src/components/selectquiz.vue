<template>
<div>
    <app-header></app-header>
  <div class="card w-50 m-5" v-for="quiz in quizs" v-bind:key="quiz.id">
    <div class="card-body">
      <h2 class="card-title">{{quiz.name}}</h2>
      <button class="btn btn-primary" @click="quizstart(quiz.id)">Start Quiz</button>
    </div>
  </div>
  </div>
</template>

<script>
import Header from './header.vue'
export default {
    components:{
        'app-header': Header,
        },
  data() {
    return {
        quizs:[]
    };
  },
  methods: {
      quizstart: function(id){
          sessionStorage.setItem("test_id",id);
          this.$router.push("/quiz")
      }
  },
  beforeCreate() {
    try {
      if (!this.$session.exists()) {
        this.$router.push("/");
      }
    } catch (err) {
      this.$router.replace({ path: "/" });
    }
  },
  created() {
    
      this.$http.get("http://localhost:3000/quiz").then(data => {
        this.quizs = data.body;
        console.log(this.quizs)
      });
  }
};
</script>

<style>
</style>