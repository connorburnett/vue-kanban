<template>

    <div>

        <div class="col-xs-4">
            <div class="list panel panel-primary">

                <div class="panel-heading">
                    <h5>{{listprop.name}}<br></h5>
                    <button @click="removeList(listprop)">X</button>
                    <button @click="">Add Task</button>
                </div>
                <div class="panel-body">
                </div>
            </div>
        </div>
        <!-- <list></list> -->

    </div>

</template>

<script>
    export default {
        name: 'lists',
        computed: {
            lists() {
                return this.$store.state.lists
            }
        },
        props: ['listprop'],
        methods: {
            removeList(listprop) {
                console.log(listprop)
                this.$store.dispatch('removeList', listprop)
            },
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