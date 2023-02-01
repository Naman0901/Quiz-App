<template>
  <div id="showQuiz" class="">
      <app-header></app-header>
    <h1 class="center-text m-2">Quiz Preview and Update</h1>
    <div v-for="question in questions" v-bind:key="question.id" class="container m-5">
      <label>Q</label>
      <textarea cols="60" rows="1" v-model="question.ques"></textarea>
      <br />
      <div id="options">
        <label>a</label>
        <input type="text" v-model="question.options.a" />
        <br />
        <label>b</label>
        <input type="text" v-model="question.options.b" />
        <br />
        <label>c</label>
        <input type="text" v-model="question.options.c" />
        <br />
        <label>d</label>
        <input type="text" v-model="question.options.d" />
        <br />
      </div>
      <label>Ans</label>
      <input type="text" v-model="question.answer" />
      <button class="btn btn-success" @click="updateque(question.id)">Update</button>
      <label v-if="id == question.id">Updated Successfully</label>
    </div>
  </div>
</template>

<script>
import Header from './header.vue';
export default {
    components:{
        'app-header': Header
    },
  data() {
    return {
      test_id: parseInt(sessionStorage.getItem("test_id")),
      questions: [],
      id: ""
    };
  },
  methods: {
    updateque: function(id) {
      var upque = this.questions.filter(que => que.id == id);
      console.log(upque);
      this.$http
        .put("http://localhost:3000/question/" + id, upque)
        .then(data => {
          console.log(data);
          this.id = id;
        });
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
if(this.test_id){
    this.$http
      .get("http://localhost:3000/question/" + this.test_id)
      .then(data => {
        this.questions = data.body;
      });
  }}
};
</script>

<style scoped>
#options {
  

  padding: 5px;
  margin: 2px;
}
input {
  margin-left: 2px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>