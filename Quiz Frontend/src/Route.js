import Addto from "./components/Addtest.vue";
import Login from "./components/login.vue";
import showquiz from './components/showQuiz.vue';
import quiz from './components/quiz.vue';
import selectquiz from './components/selectquiz.vue';


export default[
    {path: '/', component: Login},
    {path: '/crtest', component: Addto},
    {path: '/showquiz', component: showquiz},
    {path: '/quiz', component: quiz},
    {path: '/select', component: selectquiz}

]

