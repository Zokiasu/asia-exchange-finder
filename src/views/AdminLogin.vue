<template>
    <div class="bg-black bg-opacity-30 h-screen text-white absolute inset-x-0 top-0 flex flex-col">

        <h1 class="font-bold text-center mt-20 ms:mt-24 text-4xl ms:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Asia Exchange Finder</h1>

        <div class="mt-12 md:mt-12 mx-auto flex justify-center items-center w-full">
            <form @submit.prevent="loginRequest" id="login-form" class="bg-gray-500 bg-opacity-50 p-10 rounded-2xl">
                <div class="grid grid-cols-1 gap-6">
                    <div class="grid grid-cols-1 gap-1">
                        <label class="place-self-center ms:text-2xl" for="email">Email Address</label>
                        <input type="email" v-model="email" id="email" class="text-black">
                    </div>
                    <div class="grid grid-cols-1 gap-1 mb-2">
                        <label class="place-self-center ms:text-2xl" for="password">Password</label>
                        <input type="password" v-model="password" id="password" class="text-black">
                    </div>
                    <div class="grid grid-cols-1 gap-1">
                        <div v-if="errorMessage !== ''" class="mb-2" role="alert">
                            {{ errorMessage }}
                        </div>
                        <div v-if="successMessage !== ''" class="mb-2" role="alert">
                            {{ successMessage }}
                        </div>
                        <button v-bind:disabled="xhrRequest" v-bind:class="{disabled: xhrRequest}" class="Button container">
                            <span v-if="! xhrRequest">Login</span>
                            <span v-if="xhrRequest">Please Wait...</span>
                        </button>
                        <div v-if="xhrRequest" class="" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-sm-12 text-center form-group mt-5">
            <p>Don't have an account ? <router-link to="/signup" class="font-bold text-red-500">Sign Up</router-link></p>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import {app} from '../main.js'
    import db from '../main.js'

    export default {
        data() {
            return {
                email: "",
                password: "",
                xhrRequest: false,
                errorMessage: "",
                successMessage: "",
            }
        },
        methods: {
            loginRequest() {
                
                this.xhrRequest = true;
                this.errorMessage = "";
                this.successMessage = "";

                app.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    (authUser) => {
                        this.$router.replace('/Dashboard')
                        this.xhrRequest = false;
                    }, 
                    ( error ) => {
                        this.errorMessage = error.message;
                        this.xhrRequest = false;
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .loader {
        position:relative;
        top:6px;
        left:10px;
    }
</style>