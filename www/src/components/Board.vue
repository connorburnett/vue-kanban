<template>
  <div class="container">
    <boards></boards>

    <div class="row">


      <div class="board panel panel-primary">
        <div class="panel-heading">
          <button @click="">Back to Home</button>
          <h2>Board Name</h2>
          <button @click="">Create List</button>
        </div>
        <div class="panel-body">
          <div class="col-xs-4">
            <list></list>
          </div>

          <div class="col-xs-4">
            <div class="default panel-heading">
              <h5>In Progress</h5>
            </div>
            <div class="list panel panel-primary">
              <div class="panel-heading">
                <button @click="">Add Task</button>
                <h2>LIST 1</h2>
                <button @click="">Remove List</button>
              </div>
              <div class="panel-body">

              </div>
            </div>
          </div>

          <div class="col-xs-4">
            <div class="default panel-heading">
              <h5>Done</h5>
            </div>
            <div class="list panel panel-primary">
              <div class="panel-heading">
                <button @click="">Add Task</button>
                <h2>LIST 1</h2>
                <button @click="">Remove List</button>
              </div>
              <div class="panel-body">


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
    mounted() {
      this.$root.$store.dispatch('getBoard', this.$route.params.id)
    },
    components: {
      Boards,
      List
    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      }
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