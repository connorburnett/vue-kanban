<template>

  <div>
    <div class="title">
      <h1>The KANBAN</h1>
    </div>
    <div class="heading">
      <button class="btn btn-default b" @click="logoutUser">Logout</button>


    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-4"></div>
        <div class="col-xs-4">
          <form @submit.prevent="createBoard()">
            <input class="form-control formcss" type="text" v-model="name" placeholder="Board Name">
            <input class="form-control formcss" type="text" v-model="description" placeholder="Board Description">
            <button class="btn btn-default c">Add Board</button>
          </form>
        </div>
        <div class="col-xs-4"></div>
      </div>
    </div>

    <div v-if="see">
      <div class="boards" v-for="board in boards">
        <span @click="getBoard(board._id)">
        <router-link class="boardcolor" :to="'/boards/'+board._id">{{board.name}}</router-link> <!--{{board.description}}-->
        </span>
        <span @click="removeBoard(board)"><button class="red btn btn-default">x</button></span>
      </div>
    </div>
  </div>
</template>

<script>
  import { store } from '../store'
  export default {
    name: 'boards',
    data() {
      return {
        user: {
          name: '',
          password: '',
          email: ''
        },
        name: '',
        description: '',
        see: true,
        seen: false,
        unameSeen: false
      }
    },
    mounted() {
      this.$store.dispatch('getBoards')
    },
    computed: {
      boards() {
        return this.$store.state.boards
      }
    },
    methods: {
      createBoard() {
        this.$store.dispatch('createBoard', {
          name: this.name,
          description: this.description
        })
      },
      removeBoard(board) {
        this.$store.dispatch('removeBoard', board)
      },
      showBoards() {
        if (this.see) {

        }
      },

      getBoard(id) {
        this.$store.dispatch('getBoard', id)
      },
      showSignup() {
        if (this.unameSeen) {
          this.showLogin()
        }
        this.seen = !this.seen
      },
      showLogin() {
        if (this.seen) {
          this.showSignup()
        }
        this.unameSeen = !this.unameSeen
      },

      createUser() {
        console.log(this.user)
        this.$store.dispatch('createUser', this.user)
      },
      loginUser() {
        this.$store.dispatch('login', this.user)
      },
      logoutUser() {
        this.$store.dispatch('logout')
      }
    },
    props: {
      flag: true //possibly use for login/create new user
    }
  }

</script>

<style scoped>
  h1 {
    color: crimson;
    font-size: 60px;
    font-family: 'Abril Fatface', cursive;
    text-shadow: 0 0 3px gray;
  }

  .b {
    color: black;
    font-size: 20px;
    font-family: 'Catamaran', sans-serif;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .c {
    color: black;
    font-size: 20px;
    font-family: 'Catamaran', sans-serif;
  }

  .boards {
    padding-top: 20px;
    font-size: 25px;
    font-family: 'Catamaran', sans-serif;
  }

  .boardcolor {
    color: crimson;
  }

  .red {
    color: red;
  }

  div {
    font-size: 1.8rem;
  }

  .formcss {
    margin-bottom: 20px;
  }
</style>