<template>
    <div>
        <div class="title">
            <h1>The KANBAN</h1>
        </div>
        <div class="heading">
            <button class="btn btn-default b" @click="showLogin">LOGIN</button>
            <button class="btn btn-default b" @click="showSignup">SIGN UP</button>


            <div id="stuff">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-4"></div>
                        <div class="col-xs-4">
                            <form v-show="seen" @submit.prevent="createUser()">
                                <input class="form-control formcss" type="text" v-model="user.name" placeholder="username">
                                <input class="form-control formcss" type="password" v-model="user.password" placeholder="password">
                                <input class="form-control formcss" type="text" v-model="user.email" placeholder="email">
                                <button class="btn btn-default c" type="submit">CREATE</button>
                            </form>
                            <form v-show="unameSeen" @submit.prevent="loginUser()">
                                <input class="form-control formcss" type="text" v-model="user.email" placeholder="email">
                                <input class="form-control formcss" type="password" v-model="user.password" placeholder="password">
                                <button class="btn btn-default c" type="submit">LOGIN</button>
                            </form>
                        </div>
                        <div class="col-xs-4"></div>
                    </div>
                </div>
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
    h1 {
        color: crimson;
        font-size: 60px;
        font-family: 'Abril Fatface', cursive;
        text-shadow: 0 0 3px gray;
    }

    .b {
        color: black;
        font-size: 20px;
        font-family: 'Catamaran', sans-serif;
        margin-top: 40px;
        margin-bottom: 20px;
    }

    .c {
        color: black;
        font-size: 20px;
        font-family: 'Catamaran', sans-serif;
    }

    div {
        font-size: 1.8rem;
    }

    .formcss {
        margin-bottom: 20px;
    }
</style>