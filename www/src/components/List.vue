<template>
    <div>
        <div class="default panel-heading">
            <h5>Requested</h5>
        </div>
        <div class="list panel panel-primary">

            <div class="panel-heading">

                <button @click="">X</button>
                <div v-for="list in board">
                    <h2>{{ list.name }}</h2>
                </div>
                <button @click="">Add Task</button>
            </div>
            <div class="panel-body">
                <task></task>
            </div>
        </div>
    </div>
</template>

<script>
    import Task from './Task'
    export default {
        name: 'list',
        data() {
            return {
                user: {
                    name: '',
                    password: '',
                    email: ''
                },
                boardId: this.$route.params.boardId,
                name: '',
                description: '',
                see: true,
                seen: false,
                unameSeen: false,
            }
        },
        components: {
            Task
        },
        computed: {
            board() {
                return this.$store.state.activeBoard
            },
            list() {
                return this.$store.state.activeList
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