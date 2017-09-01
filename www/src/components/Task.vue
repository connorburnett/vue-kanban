<template>
    <div>
        <div class="panel panel-default">
            <div class="task panel-heading panel-primary">
                <h3>
                    <span>
                        <button class="btn btn-default red" @click="removeTask(taskprop)">x</button>
                        {{taskprop.name}}
                    </span>
                </h3>
            </div>
            <div>
                <div v-for="comment in comments">
                    <comment :commentprop="comment"></comment>
                </div>
                <form @submit.prevent="addComment()">
                    <input class="form-control" type="text" v-model="comment.name" placeholder="Write comment...">
                    <button class="btn btn-default" type="submit">Submit</button>
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
        margin-bottom: 20px;
    }

    h2 {
        color: white;
    }

    button {
        color: black;
    }

    .red {
        color: red;
    }

    h3 {
        font-size: 15px;
        color: black;
    }
</style>