<template>
  <div>
    <div class="heading">
      <button @click="showLogin">Login</button>
      <button @click="showSignup">Signup</button>
      <button @click="logoutUser">Logout</button>


      <div id="stuff">
        <form v-show="seen" @submit.prevent="createUser()">
          <input type="text" v-model="user.name" placeholder="username">
          <input type="password" v-model="user.password" placeholder="password">
          <input type="text" v-model="user.email" placeholder="email">
          <button type="submit">CREATE</button>
        </form>
        <form v-show="unameSeen" @submit.prevent="loginUser()">
          <input type="text" v-model="user.email" placeholder="email">
          <input type="password" v-model="user.password" placeholder="password">
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
    <form @submit.prevent="createBoard()">
      <input type="text" v-model="name" placeholder="Board Name">
      <input type="text" v-model="description" placeholder="Board Description">
      <button>Add Board</button>
    </form>
    <ul v-if="see">
      <li v-for="board in boards">
        <router-link :to="'/boards/'+board._id">{{board.name}} {{board.description}}</router-link> <span @click="removeBoard(board)"><button class="red">x</button></span>
      </li>
    </ul>
    <!--<board></board>-->
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
          name: this.name + ': ',
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
.red {
  color: red;
}

div {
  font-size: 1.8rem;
}
</style>