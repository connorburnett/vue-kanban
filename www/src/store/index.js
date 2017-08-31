import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
// import $ from 'jquery'
import router from '../router'

let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  withCredentials: true
})
vue.use(vuex)

var store = new vuex.Store({
  state: {
    user: {},
    boards: [{ name: '' }],
    activeBoard: {},
    error: {},
    lists: [],
    tasks: {},
    comments: {}
  },
  mutations: {
    setBoards(state, data) {
      state.boards = data
    },
    handleError(state, err) {
      state.error = err
    },
    createUser(state, data) {
      state.user = data
    },
    setUser(state, data) {
      state.user = data
    },
    logoutUser(state, data) {
      state.user = {}
    },
    setActiveBoard(state, data) {
      //console.log(data)
      state.activeBoard = data
    },

    //list mutations

    setLists(state, data) {
      state.lists = data
    },

    //task mutations

    setTasks(state, list) {
      vue.set(state.tasks, list._id, list.tasks)

      // for (var i = 0; i < data.length; i++) {
      //   var task = data[i]
      //   console.log(data)
      //   state.tasks[task.listId].push(task)
      // }
      // console.log(state.tasks)
    },

    //comment mutations

    setComments(state, task) {
      vue.set(state.comments, task._id, task.comments)
    }

  },
  actions: {
    //when writing your auth routes (login, logout, register) be sure to use auth instead of api for the posts

    //Board Actions

    getBoards({ commit, dispatch }) {
      api('userboards')
        .then(res => {
          commit('setBoards', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    getBoard({ commit, dispatch }, id) {
      api('boards/' + id)
        .then(res => {
          commit('setActiveBoard', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    createBoard({ commit, dispatch }, board) {
      api.post('boards/', board)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    removeBoard({ commit, dispatch }, board) {
      api.delete('boards/' + board._id)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    handleError({ commit, dispatch }, err) {
      commit('handleError', err)
    },

    //List Actions

    getListsByBoard({ commit, dispatch }, boardId) {
      api('boards/' + boardId + '/lists')
        .then(res => {
          commit('setLists', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    createList({ commit, dispatch }, list) {
      api.post('lists', list)
        .then(res => {
          dispatch('getListsByBoard', list.boardId)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    removeList({ commit, dispatch }, list) {
      api.delete('/lists/' + list._id)
        .then(res => {
          console.log(res)
          dispatch('getListsByBoard', list.boardId)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    // Task Actions

    getTasksByList({ commit, dispatch }, task) {
      api('boards/' + task.boardId + '/lists/' + task.listId + '/tasks')
        .then(res => {
          commit('setTasks', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    createTask({ commit, dispatch }, task) {
      api.post('tasks', task)
        .then(res => {
          dispatch('getTasksByList', task)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    removeTask({ commit, dispatch }, task) {
      api.delete('/tasks/' + task._id)
        .then(res => {
          console.log(res)
          dispatch('getTasksByList', task)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    handleError({ commit, dispatch }, err) {
      commit('handleError', err)
    },

    // Comment Actions

    getCommentsByTask({ commit, dispatch }, comment) {
      api('boards/' + comment.boardId + '/lists/' + comment.listId + '/tasks/' + comment.taskId + '/comments')
        .then(res => {
          commit('setComments', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    
    createComment({ commit, dispatch }, comment) {
      api.post('comments', comment)
        .then(res => {
          dispatch('getCommentsByTask', comment)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    removeComment({ commit, dispatch }, comment) {
      api.delete('/comments/' + comment._id)
        .then(res => {
          console.log(res)
          dispatch('getCommentsByTask', comment)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    //User Actions

    createUser({ commit, dispatch }, user) {
      auth.post("register", user).then(res => {
        if (res.data.data) {
          return router.push('/boards')
        }
        commit('createUser', res)
      })
    },
    login({ commit, dispatch }, user) {
      auth.post("login", user).then(res => {
        console.log(res)
        if (res.data.data) {
          return router.push('/boards')
        } else if (res.data.error) {
          alert('Invalid Username or Password')
        }

        commit('setUser', res)
      })
        .catch(err => {
          commit('handleError', err)
        })
    },
    logout({ commit, dispatch }) {
      auth.delete("logout").then(res => {
        if (!res.data.data) {
          return router.push('/login')
        }
        commit('logoutUser', res)
      })
        .catch(err => {
          commit('handleError', err)
        })
    },
    authenticate({ commit, dispatch }) {
      auth('authenticate').then(res => {
        console.log(res)
        if (!res.data.data) {
          return router.push('/login')
        }
        commit('setUser', res.data.data)
        router.push('/boards')
      })
        .catch(err => {
          //commit('handleError', err)
          router.push('/login')
        })
    }
  }

})


export default store
