<template>
    <div>
        <div class="panel panel-default">
            <div class="task panel-heading panel-primary">
                <button @click="removeTask(taskprop)">Remove Task</button>
                <h3>{{taskprop.name}}</h3>
            </div>
            <div class="panel-body">
                <div v-for="comment in comments">
                    <comment :commentprop="comment"></comment>
                </div>
                <form @submit.prevent="addComment()">
                    <input type="text" v-model="comment.name" placeholder="Write comment...">
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Comment from './Comment'
    export default {
        name: 'task',
        data() {
            return {
                user: {
                    name: '',
                    password: '',
                    email: ''
                },
                comment: {
                    name: '',
                    description: '',
                    boardId: this.$route.params.boardId,
                    listId: this.taskprop.listId,
                    taskId: this.taskprop._id
                },
            }
        },
        components: {
            Comment
        },
        computed: {
            comments() {
                return this.$store.state.comments[this.taskprop._id]
            }
        },
        props: ['taskprop'],
        methods: {
            removeTask(taskprop) {
                this.$store.dispatch('removeTask', taskprop)
            },
            addComment() {
                this.$store.dispatch('createComment', this.comment)
            }
        },
        created() {
            this.$root.$store.dispatch('getCommentsByTask', this.comment)
        },
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
        color: white;
    }

    button {
        color: black;
    }
</style>