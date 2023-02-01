<template>
  <div id="question" class="bg-info container p-5">
    <label for>Question {{counter}}</label><br>
    <textarea name id cols="60" rows="1" v-model="ques"></textarea>

    <div class="container p-4">
      <label>A</label>
      <input type="text" class="input" v-model="options.a" />
      <input type="radio" name="ans" v-bind:value="options.a" v-model="answer" />
      <label>B</label>
      <input type="text" v-model="options.b" />
      <input type="radio" name="ans" v-bind:value="options.b" v-model="answer" />
      <br />
      <br />
      <label>C</label>
      <input type="text" v-model="options.c" />
      <input type="radio" name="ans" v-bind:value="options.c" v-model="answer" />
      <label>D</label>
      <input type="text" v-model="options.d" />
      <input type="radio" name="ans" v-bind:value="options.d" v-model="answer" />
    </div>

    <button class="btn btn-success" @click="addquestion">Submit</button>
    <div class="m-5">
    <button class="btn btn-success m-5" @click="Finish">Finish</button>
</div>
  </div>
</template>

<script>
import addtest from './Addtest.vue'
export default { 
  data() {
    return {
      counter: 1,
      ques: "",
      options: { a: "", b: "", c: "", d: "" },
      answer: "",
    };
  },
  methods:{
      addquestion: function(event){
          event.preventDefault();
          var question = {
              ques: this.ques,
              answer: this.answer,
              options: this.options,
              test_id: parseInt(sessionStorage.getItem("test_id"))
          }
          console.log(question);
          this.$http.post('http://localhost:3000/question',question).then(data=>{
              if(data.body!=null)
              this.counter++;
          })
      },
      Finish: function(){
          this.$router.replace({path: '/showquiz'});
      }
  }
};
</script>

<style>
</style>