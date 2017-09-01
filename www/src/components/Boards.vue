<template>

  <div class="all">
    <div class="stuff">
      <div class="title">
        <h1>The KANBAN</h1>
      </div>
      <div class="heading">
        <button class="btn btn-default b" @click="logoutUser">Logout</button>


      </div>

      <form @submit.prevent="createBoard()">
        <input class="formcss" type="text" v-model="name" placeholder="Board Name">
        <p>
          <input class="formcss" type="text" v-model="description" placeholder="Board Description">
        </p>
        <button class="btn btn-default c">Add Board</button>
      </form>


      <div v-if="see">
        <div class="boards" v-for="board in boards">
          <span @click="getBoard(board._id)">
        <router-link class="boardcolor" :to="'/boards/'+board._id">{{board.name}}</router-link> <!--{{board.description}}-->
        </span>
          <span @click="removeBoard(board)"><button class="red btn btn-default">x</button></span>
        </div>
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
    color: white;
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
    color: white;
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

  .all {
    background: url('https://wallpapercave.com/wp/j8eMFrM.jpg') no-repeat center center fixed;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    /* <------ */
    background-repeat: no-repeat;
    background-position: center center;
    height: 100vh;
    margin-top: -5vh;
    padding-top: 5vh;
  }

  .stuff {
    width: 60rem;
    -moz-border-radius: 5rem;
    -webkit-border-radius: 5rem;
    border-radius: 5rem;
    background: black;
    opacity: 0.8;
    margin: auto;
    margin-top: 15rem;
    margin-bottom: 10rem;
    padding-top: 12rem;
    padding-bottom: 10vh;
  }
</style>