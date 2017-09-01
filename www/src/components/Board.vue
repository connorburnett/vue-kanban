<template>
  <div>
    <div class="title">
      <router-link class="btncolor" to="/boards/">
        <h1>The KANBAN</h1>
      </router-link>
    </div>
    <div class="container">
      <div class="row">


        <div class="board panel panel-danger">
          <div class="panel-heading">
            <!--<button class="btn btn-default">
              <router-link class="btncolor" to="/boards/">Home</router-link>
            </button>-->
            <span>
              <h2>{{board.name}}</h2> 
              <h4>{{board.description}}</h4>
            </span>
            <form @submit.prevent="createList()">
              <input class="form-control" type="text" v-model="list.name" placeholder="List Name">
              <button class="btn btn-default">Create List</button>
            </form>
          </div>
          <div>
            <div class="col-xs-12">
              <div v-for="list in lists">
                <list :listprop="list"></list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Boards from './Boards'
  import List from './List'
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
      List
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
  .panel-heading {
    padding-bottom: 40px;
  }

  h1 {
    color: crimson;
    font-size: 60px;
    font-family: 'Abril Fatface', cursive;
    text-shadow: 0 0 3px gray;
    margin-bottom: 30px;
  }

  .default {
    margin-bottom: 20px;
  }


  h2 {
    color: black;
    font-family: 'Catamaran', sans-serif;
    font-size: 40px;
    text-shadow: 0 0 3px gray;
  }

  button {
    color: black;
    font-family: 'Catamaran', sans-serif;
    font-size: 20px;
  }

  .btncolor {
    color: black;
  }

  h4 {
    font-family: 'Catamaran', sans-serif;
    font-size: 20px;
  }
</style>