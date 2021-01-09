<template>
    <div class="bg-black bg-opacity-30 h-screen text-white absolute inset-x-0 top-0 flex flex-col">

        <h1 class="font-bold text-center mt-20 ms:mt-24 text-4xl ms:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Asia Exchange Finder</h1>

        <div class="mt-12 md:mt-12 mx-auto flex justify-center items-center w-full">
            <form @submit.prevent="signupRequest" id="signup-form" class="bg-gray-500 bg-opacity-50 p-10 rounded-2xl">
                <div class="grid grid-cols-1 gap-6">
                    <div class="grid grid-cols-1 gap-1 col-start-1 col-end-7">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" v-model="email" class="text-black">
                    </div>
                    <div class="grid grid-cols-1 gap-1 col-start-1 col-end-6">
                        <label for="pseudo">Pseudo</label>
                        <input type="pseudo" id="pseudo" v-model="pseudo" class="text-black">
                    </div>
                    <div class="grid grid-cols-1 gap-1 col-start-6">
                        <label for="password">Password</label>
                        <input type="password" id="password" v-model="password" class="text-black">
                    </div>
                    <div class="col-start-1 col-end-7">
                        <div v-if="errorMessage !== ''" class="mb-2" role="alert">
                            {{ errorMessage }}
                        </div>
                        <div v-if="successMessage !== ''" class="mb-2" role="alert">
                            {{ successMessage }}
                        </div>
                        <button v-bind:disabled="xhrRequest" v-bind:class="{disabled: xhrRequest}" class="Button container">
                            <span v-if="! xhrRequest">Sign Up</span>
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
            <p>You have an account ? <router-link to="/admin" class="font-bold text-red-500">Login</router-link></p>
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
                pseudo: "",
                email: "",
                password: "",
                xhrRequest: false,
                errorMessage: "",
                successMessage: "",
            }
        }, 
        methods: {
            signupRequest() {

                this.xhrRequest = true;
                this.errorMessage = "";
                this.successMessage = "";

                app
                    .auth()
                    .createUserWithEmailAndPassword(this.email, this.password).then(
                    (authUser) => {
                        console.log(authUser.user.uid)
                        db.ref(`users/${authUser.user.uid}`).set({
                            pseudo:this.pseudo,
                            email:this.email,
                        }),
                        this.successMessage = "Register Successfully.";
                        this.xhrRequest = false;
                    },
                    ( error ) => {
                        this.errorMessage = errorResponse.error.message;
                        this.xhrRequest = false;
                    }
                );
            }
        }
    }
</script>

<style>
    ._loader {
        position:relative;
        top:6px;
        left:10px;
    }
</style>