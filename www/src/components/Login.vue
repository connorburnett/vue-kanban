<template>
    <div>
        <div class="heading">
            <button @click="showLogin">Login</button>
            <button @click="showSignup">Signup</button>


            <div id="stuff">
                <form v-show="seen" @submit.prevent="createUser()">
                    <input type="text" v-model="user.name" placeholder="username">
                    <input type="password" v-model="user.password" placeholder="password">
                    <input type="text" v-model="user.email" placeholder="email">
                    <button type="submit">CREATE</button>
                </form>
                <form v-show="unameSeen" @submit.prevent="loginUser()">
                    <input type="text" v-model="user.email" placeholder="email">
                    <input type="password" v-model="user.password" placeholder="password">
                    <button type="submit">LOGIN</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { store } from '../store'
    export default {
        name: 'boards',
        data() {
            return {
                user: {
                    name: '',
                    password: '',
                    email: ''
                },
                name: '',
                description: '',
                see: true,
                seen: false,
                unameSeen: false
            }
        },
        mounted() {
        },
        computed: {
        },
        methods: {
            showSignup() {
                if (this.unameSeen) {
                    this.showLogin()
                }
                this.seen = !this.seen
            },
            showLogin() {
                if (this.seen) {
                    this.showSignup()
                }
                this.unameSeen = !this.unameSeen
            },

            createUser() {
                console.log(this.user)
                this.$store.dispatch('createUser', this.user)
            },
            loginUser() {
                this.$store.dispatch('login', this.user)
            },
        },
        // props: {
        //     flag: true //possibly use for login/create new user
        // }
    }
</script>

<style scoped>
    .red {
        color: red;
    }

    div {
        font-size: 1.8rem;
    }
</style>