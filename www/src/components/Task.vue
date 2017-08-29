<template>
    <div>
        <div class="panel panel-default">
            <div class="task panel-heading panel-primary">
                <button @click="">Remove Task</button>
                <h3>This is what we need to do</h3>
            </div>
            <div class="panel-body">
                <ul>
                    <li>Comment</li>
                    <li>Comment</li>
                    <li>Comment</li>
                </ul>

                <comment></comment>
            </div>
        </div>
    </div>
</template>

<script>
    import Comment from './Comment'
    export default {
        name: 'task',
        components: {
            Comment
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