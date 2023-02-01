<template>
<div>
    <app-header></app-header>
     <div class="my-4 mx-1" v-if="admin">
      <button class="btn btn-primary p-2" @click="add">+ New Quiz</button>
    </div>
  <div class="card w-50 m-5" v-for="quiz in quizs" v-bind:key="quiz.id">
    <div class="card-body">
      <h2 class="card-title">{{quiz.name}}</h2>
      <button class="btn btn-primary" @click="quizstart(quiz.id)" v-if="!admin">Start Quiz</button>
      <img
          src="https://www.nicepng.com/png/detail/326-3260333_graphic-edit-pencil-icon.png"
          style="width: 30px;" @click="update(quiz.id)" v-if="admin"
        />
        <img
          src="https://toppng.com/uploads/preview/delete-comments-delete-icon-black-11563177686kfv8sa8gps.png"
          style="width: 30px;" @click="delquiz(quiz.id)" v-if="admin" />

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
        quizs:[],
        admin: false,
    };
  },
  methods: {
      quizstart: function(id){
          sessionStorage.setItem("test_id",id);
          this.$router.push("/quiz")
      },
      update: function(id){
        sessionStorage.setItem("test_id", id);
        this.$router.push("/showquiz")
      },
      delquiz: function(id){
        this.$http.delete("http://localhost:3000/test/"+id).then(data => {
          this.quizs = this.quizs.filter(quiz=> quiz.id != id);
      });
      },
      add: function(){
        this.$$router.push("/crtest")
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
      });
      var user = JSON.parse(sessionStorage.getItem("user"));
      if(user.type == "admin")
        this.admin = true;
  }
};
</script>

<style>
.btn{
  border-radius: 15px;
}
</style>