<template>

    <div>

        <div class="col-xs-4">
            <div class="list panel panel-primary">

                <div class="panel-heading">
                    <button @click="removeList(listprop)">X</button>
                    <h5>{{listprop.name}}<br></h5>
                    <form @submit.prevent="createTask()">
                        <input type="text" v-model="task.name" placeholder="What are you doing today?">
                        <button>Add Task</button>
                    </form>
                </div>
                <div class="panel-body">
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
        border: 1px solid black;
        margin-bottom: 20px;
    }

    .list {
        border: 1px solid black;
        height: 80vh;
    }

    h2 {
        color: black;
    }

    button {
        color: black;
    }

    input {
        color: black;
    }
</style>