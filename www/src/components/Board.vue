<template>
  <div class="container">

    <div class="row">


      <div class="board panel panel-primary">
        <div class="panel-heading">
          <button type="btn btn-primary">
            <router-link to="/boards/">Home</router-link>
          </button>
          <span>
              <h2>{{board.name}}</h2> 
              <h5>{{board.description}}</h5>
            </span>
          <form @submit.prevent="createList()">
            <input type="text" v-model="list.name" placeholder="List Name">
            <button>Create List</button>
          </form>
        </div>
        <div class="panel-body">
          <div class="col-xs-12">
            <div v-for="list in lists">
              <lists :listprop="list"></lists>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Boards from './Boards'
  import Lists from './Lists'
  export default {
    name: 'board',
    data() {
      return {
        user: {
          name: '',
          password: '',
          email: ''
        },
        list: {
          name: '',
          description: '',
          boardId: this.$route.params.boardId
        },
        see: true,
        seen: false,
        unameSeen: false
      }
    },
    mounted() {
      this.$root.$store.dispatch('getListsByBoard', this.$route.params.boardId)
    },
    components: {
      Boards,
      Lists
    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      },
      boards() {
        return this.$store.state.boards
      },
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      createList() {
        this.$store.dispatch('createList', this.list)
      },
    }
  }

</script>

<style scoped>
  .board {
    height: 102vh;
  }

  .default {
    border: 1px solid black;
    margin-bottom: 20px;
  }

  .list {
    border: 1px solid black;
    height: 80vh;
  }

  h2 {
    color: white;
  }

  button {
    color: black;
  }
</style>