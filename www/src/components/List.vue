<template>

    <div>

        <div class="col-xs-3">
            <div class="list panel panel-danger">

                <div class="panel-heading">
                    <h5>
                        <span>
                            <button class="btn btn-default red" @click="removeList(listprop)">x</button>
                            {{listprop.name}}
                        </span>
                    </h5>
                    <form @submit.prevent="createTask()">
                        <input class="fillout form-control" type="text" v-model="task.name" placeholder="What are you doing today?">
                        <button class="btn btn-default">Add Task</button>
                    </form>
                </div>
                <div>
                    <div v-for="task in tasks">
                        <task :taskprop="task"></task>
                    </div>
                </div>
            </div>
        </div>
        <!-- <list></list> -->

    </div>

</template>

<script>
    import Task from './Task'
    export default {
        props: ['listprop'],
        data() {
            return {
                user: {
                    name: '',
                    password: '',
                    email: ''
                },
                task: {
                    name: '',
                    description: '',
                    boardId: this.$route.params.boardId,
                    listId: this.listprop._id
                },
            }
        },
        computed: {
            tasks() {
                return this.$store.state.tasks[this.listprop._id]
            }
        },
        components: {
            Task
        },
        name: 'list',
        mounted() {
            this.$root.$store.dispatch('getTasksByList', this.task)
        },
        methods: {
            removeList(listprop) {
                console.log(listprop)
                this.$store.dispatch('removeList', listprop)
            },
            createTask() {
                this.$store.dispatch('createTask', this.task)
            }
        }
    }

</script>


<style>
    .default {
        margin-bottom: 20px;
    }

    h2 {
        color: black;
    }

    h5 {
        font-size: 20px;
        color: black;
        font-weight: bold;
    }

    button {
        color: black;
        font-family: 'Catamaran', sans-serif;
        font-size: 15px;
    }

    .btn {
        font-size: 15px;
    }

    input {
        color: black;
    }

    .red {
        color: red;
    }

    .fillout {
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>