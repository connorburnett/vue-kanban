<template>
    <div>

        <!--Goes in the comment template-->
        <span>
            {{commentprop.name}}
            <button @click="removeComment(commentprop)">X</button>
        </span>
        <!---->
    </div>
</template>

<script>
    export default {
        name: 'comment',
        data() {
            return {
                comment: {
                    name: '',
                    description: '',
                    boardId: this.$route.params.boardId,
                    listId: this.commentprop.listId,
                    taskId: this.commentprop.taskId,
                    commentId: this.commentprop._id,
                },
            }
        },
        components: {
        },
        computed: {
            comments() {
                return this.$store.state.comments
            }
        },
        props: ['commentprop'],
        methods: {
            removeComment(commentprop) {
                this.$store.dispatch('removeComment', commentprop)
            }
        }
    }

</script>

<style>
    .default {
        border: 1px solid black;
        margin-bottom: 20px;
    }

    h2 {
        color: white;
    }

    button {
        color: black;
    }
</style>