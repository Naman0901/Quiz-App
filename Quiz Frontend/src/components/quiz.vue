<template>
  <div>
    <app-header></app-header>
    <div v-if="!submit" class="container m-5 p-5 bg-info">
      <h2>{{questions[i].ques}}</h2>
      <label>
        <input type="radio" name="variable" v-model="select" v-bind:value="questions[i].options.a"/>{{questions[i].options.a}}
      </label>
      <label>
        <input type="radio" name="variable" v-model="select" v-bind:value="questions[i].options.b"/>{{questions[i].options.b}}
      </label>
      <label>
        <input type="radio" name="variable" v-model="select" v-bind:value="questions[i].options.c"/>{{questions[i].options.c}}
      </label>
      <label>
        <input type="radio" name="variable" v-model="select" v-bind:value="questions[i].options.d"/>{{questions[i].options.d}}
      </label>
      <button class="btn btn-dark" v-if="(i+1)<questions.length" @click="next(questions[i].id)">Next</button>
      <button class="btn btn-success" v-else @click="end(questions[i].id)">Submit</button>
    </div>
    <div v-else class="card bg-success">Result: {{score}} out of {{i+1}}</div>
  </div>
</template>

<script>
import Header from "./header.vue";
export default {
  components: {
    "app-header": Header
  },
  data() {
    return {
      test_id: parseInt(sessionStorage.getItem("test_id")),
      questions: [],
      i: 0,
      submit: false,
      score: 0,
      select:''
    };
  },
  methods: {
      next: function(id){
          var curque = this.questions.filter(ques=> ques.id==id)
          if(curque[0].answer == this.select)
          {this.score++; this.i++;}
          else
          this.i++;
      },
      end: function(id){
          var curque = this.questions.filter(ques=> ques.id==id)
          if(curque[0].answer == this.select)
          {this.score++; this.submit=true}
          else
          this.submit= true;
          var flag = {test_id: this.test_id, finish: true}
          sessionStorage.setItem("test_done", JSON.stringify(flag));
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
    if(sessionStorage.getItem("test_done")){
        var done =JSON.parse(sessionStorage.getItem("test_done"));
        console.log(done);
        if(done.test_id == this.test_id)
        this.$router.push("/select");
    }
    this.$http.get("http://localhost:3000/test/" + this.test_id).then(data => {
      this.questions = data.body;
    });
  }
};
</script>

<style scoped>
label {
display: block;
}

input {
width: 30px;
margin-left: 20px;
}

button {
width: 100px;
margin-top: 20px;
}
.card{
    width: 400px;
    height: 50px ;
    margin-top: 20%;
    margin-left: 30% ;
    text-align: center;
    color: white;
    font-size: 30px;
}
</style>