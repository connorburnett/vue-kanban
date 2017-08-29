<template>
    <div>

        <!--Goes in the comment template-->
        <form @submit.prevent="">
            <input type="text" placeholder="Write comment...">
            <button type="submit">Submit</button>
        </form>
        <!---->
    </div>
</template>

<script>
    export default {
        name: 'comment'
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