import Vue from 'vue'
import Router from 'vue-router'
import Boards from 'components/Boards'
import Board from 'components/Board'
import Login from 'components/Login'
// import Comment from 'components/Comment'
// import Error from 'component/Error'
// import List from 'component/List'
// import Task from 'component/Task'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/boards',
      name: 'Boards',
      component: Boards
    },{
      path: '/boards/:id',
      name: 'Board',
      component: Board
    },{
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
