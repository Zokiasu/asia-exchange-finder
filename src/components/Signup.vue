<template>
    <div class="absolute mx-auto justify-center items-center bg-black bg-opacity-70 h-screen w-full">
        <div class="mt-1 md:mt-12 mx-auto flex justify-center items-center w-full">
            <div @submit.prevent="signupRequest" id="signup-form" class="bg-white p-10 rounded-2xl">
                <div class="grid grid-cols-1 gap-6">
                    <div class="flex flex-wrap mb-2 col-start-1 col-end-7">
                        <div class="relative w-full appearance-none">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full text-black bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="email" v-model="email" type="email" placeholder="Email Address">
                        </div>
                    </div>
                    <div class="flex flex-wrap mb-2 col-span-3">
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
                    <div class="col-start-1 col-end-7">
                        <div v-if="errorMessage !== ''" class="mb-2 text-red-500" role="alert">
                            {{ errorMessage }}
                        </div>
                        <div v-if="successMessage !== ''" class="mb-2 text-green-500" role="alert">
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
            </div>
            <button @click="close" class="font-bold bg-red-500 text-white -mt-72 ml-1 px-2 rounded-full">X</button>
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

                apps
                    .auth()
                    .createUserWithEmailAndPassword(this.email, this.password).then(
                        (authUser) => {
                            db.ref(`users/${authUser.user.uid}`).set({
                                username:this.username,
                                grade:this.grade,
                                created:this.created
                            }),
                            authUser.user.sendEmailVerification();
                            this.successMessage = "A verification email has been sent.";
                            this.disablexhrRequest();
                            this.close();
                        }
                    ).catch(
                        (error) => {
                            this.errorMessage = error.message;
                            this.xhrRequest = false;
                        }
                    );
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