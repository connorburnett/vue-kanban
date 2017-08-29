<template>
    <div>
        <div class="default panel-heading">
            <h5>Requested</h5>
        </div>
        <div class="list panel panel-primary">

            <div class="panel-heading">
                <button @click="">Add Task</button>
                <h2>LIST 1</h2>
                <button @click="">Remove List</button>
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
        name: 'List',
        components: {
            Task
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
        color: white;
    }

    button {
        color: black;
    }
</style>