<template>
    <div class="justify-center items-center py-10 m-10 bg-gray-100 bg-opacity-50">
        <h1 class="text-white text-center mb-5 text-3xl font-bold">Sign Up Form</h1>
        <div class="mx-auto flex justify-center items-center w-full">
            <form @submit.prevent="signupRequest" id="signup-form">
                <div class="grid grid-cols-1 gap-2">
                    <div class="flex flex-wrap mb-2 col-start-1 col-end-7">
                        <div class="relative w-full appearance-none">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full text-black bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="email" v-model="email" type="email" placeholder="Email Address">
                        </div>
                    </div>
                    <div class="flex flex-wrap mb-2 col-start-1 col-end-7">
                        <div class="relative w-full appearance-none">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full text-black bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="username" v-model="username" type="text" placeholder="Username">
                        </div>
                    </div>
                    <div class="flex flex-wrap mb-2 col-span-3">
                        <div class="relative w-full appearance-none">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full text-black bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="password" v-model="password" type="password" placeholder="Password">
                        </div>
                    </div>
                    <div class="flex flex-wrap mb-2 col-span-3">
                        <div class="relative w-full appearance-none">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full text-black bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="password" v-model="passwordConfirm" type="password" placeholder="Password Confirm">
                        </div>
                    </div>
                    <div class="col-start-1 col-end-7">
                        <div v-if="errorMessage !== ''" class="mb-2 font-semibold text-red-700" role="alert">
                            {{ errorMessage }}
                        </div>
                        <div v-if="successMessage !== ''" class="mb-2 text-green-700" role="alert">
                            {{ successMessage }}
                        </div>
                        <button v-bind:disabled="xhrRequest" v-bind:class="{disabled: xhrRequest}" class="Button bg-blue-500 container">
                            <span v-if="!xhrRequest">Sign Up</span>
                            <span v-if="xhrRequest">Please Wait...</span>
                        </button>
                        <div v-if="xhrRequest" class="" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-sm-12 text-center form-group mt-2">
            <p>Do you have an account? <router-link to="/login" class="font-bold text-blue-700">Login</router-link></p>
        </div>
    </div>
</template>

<script>
    import {apps} from '../main.js'
    import db from '../main.js'

    export default {
        data() {
            return {
                username: "",
                email: "",
                password: "",
                passwordConfirm: "",
                grade: "Member",
                created: new Date().toISOString().slice(0, 10),
                xhrRequest: false,
                errorMessage: "",
                successMessage: "",
            }
        }, 
        methods: {
            close(){
                this.$emit('created');
            },

            signupRequest() {

                this.xhrRequest = true;
                this.errorMessage = "";
                this.successMessage = "";

                if(this.password == this.passwordConfirm && this.username != "") {
                    apps.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                            (authUser) => {
                                db.ref(`users/${authUser.user.uid}`).set({
                                    username:this.username,
                                    grade:this.grade,
                                    created:this.created
                                }),
                                authUser.user.sendEmailVerification();
                                this.$toast.info(`A verification email has been sent.`, {position:"top", duration: 3000, max:1});
                                this.disablexhrRequest();
                                this.close();
                            }
                    ).catch(
                        (error) => {
                            this.$toast.error(error.message, {position:"top", duration: 1000, max:1});
                            this.xhrRequest = false;
                        }
                    );
                } else if (this.username == "") {
                    this.xhrRequest = false;
                    this.$toast.error(`Username is missing`, {position:"top", duration: 5000, max:1});
                } else if (this.password != this.passwordConfirm) {
                    this.xhrRequest = false;
                    this.$toast.error(`Passwords don't match`, {position:"top", duration: 5000, max:1});
                }
            },

            disablexhrRequest(){
                this.xhrRequest = !this.xhrRequest
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