<template>
    <div class="absolute mx-auto justify-center items-center bg-black bg-opacity-90 min-h-screen w-full">
        <div class="mx-auto flex justify-center items-center w-full ">
            <div class="p-5 bg-gray-300 bg-opacity-90 text-black rounded-xl">
                <div class="font-bold mb-5 grid grid-cols-3 gap-2">
                    <div class="flex flex-wrap col-start-1 col-end-7">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universitySourceName" v-model="university[0].universitySourceName" type="text" placeholder="University Name">
                            <label for="universitySourceName" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">University Name</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap col-start-1 col-span-3">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universitySourceAddress" v-model="university[0].universitySourceAddress" type="text" placeholder="University address">
                            <label for="universitySourceAddress" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">University address</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universitySourceCountry" v-model="university[0].universitySourceCountry" type="text" placeholder="Country">
                            <label for="universitySourceCountry" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Country</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap col-span-2">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universitySourceCity" v-model="university[0].universitySourceCity" type="text" placeholder="City">
                            <label for="universitySourceCity" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">City</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap col-start-1 col-span-3">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universitySourceImageLink" v-model="university[0].universitySourceImageLink" type="url" placeholder="Photo link of the university">
                            <label for="universitySourceImageLink" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Photo link of the university</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap col-end-7 col-span-3">
                        <div class="relative w-full appearance-none label-floating">
                            <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="universitySourceWebsiteLink" v-model="university[0].universitySourceWebsiteLink" type="url" placeholder="Website Link">
                            <label for="universitySourceWebsiteLink" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Website Link</label>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="overflow-x-auto">
                        <div class="align-middle inline-block w-full">
                            <div class="shadow sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-500">
                                        <tr>
                                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                            University Partner Name
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                            Localisation
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                            By
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                            Last Update
                                        </th>
                                        <th scope="col" class="relative px-4 py-3">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                        </tr>
                                    </thead>
                                    <UEPT v-for="(universityPartnerElement, index) in university[0].universitySourcerPartner"
                                        :key="index"
                                        :universityPartnerElement="universityPartnerElement"
                                        :admin="admin"
                                        @deletePartner="removePartner(index)">
                                    </UEPT>
                                </table>
                                <div class="w-full flex justify-between">
                                    <div>
                                        <button @click="callAddPartner()" class="text-white bg-blue-500 rounded-xl px-5 py-1 mt-5 mr-2">Add Partner</button>
                                    </div>
                                    <div>
                                        <button @click="close" class="text-white bg-red-500 rounded-xl px-5 py-1 mt-5 mr-2">Annuler</button>
                                    </div>
                                    <div>
                                        <button type="button" @click="callNewUniversity()" class="text-white bg-green-500 rounded-xl px-5 py-1 mt-5 mr-2">Send University</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UEPT from './UniversityEditorPartnerTbody.vue'
    import firebase from 'firebase'
    import db from '../main.js'
    import {apps, name, grade} from '../main.js'

    export default {

        components:{
            UEPT
        },

        data() {
            return {
                visible: false,
                herCreation: false,

                "university": [ 
                    {
                        "universitySourceId": "",
                        "universitySourceName": "University Name",
                        "universitySourceCountry": "France",
                        "universitySourceCity": "Paris",
                        "universitySourceAddress": "",
                        "universitySourceImageLink": "https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80",
                        "universitySourceWebsiteLink": "",
                        "universitySourceDisplay": "False",
                        "universitySourceCreator": name,
                        "universitySourceLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),   
                        "universitySourcerPartner": [
                            {
                                "universityPartnerName": "University Partner",
                                "universitySourceId": "",
                                "universityPartnerCountry": "",
                                "universityPartnerCity": "",
                                "universityPartnerAddress": "",
                                "universityPartnerWebsiteLink": "",
                                "universityPartnerCondition": "",
                                "universityPartnerDisplay": "True",
                                "universityPartnerCreator": name,
                                "universityPartnerLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),  
                                "universityPartnerSpeciality": [],
                            }
                        ], 
                    }
                ],
            }
        },

        beforeCreate(){
            firebase.auth().onAuthStateChanged((user) => {
                db.ref('users/' + user.uid).once('value').then((snapshot) => {
                    if(user) {
                        if(this.university[0].universitySourceCreator == snapshot.val().username){
                            this.herCreation = true
                        }
                    }
                })
            })
        },

        methods: {
            close(){
                this.$emit('created');
            },

            callAddPartner(){
                this.university[0].universitySourcerPartner.push(
                    {
                        "universityPartnerName": "University Partner",
                        "universitySourceId": "",
                        "universityPartnerCountry": "",
                        "universityPartnerCity": "",
                        "universityPartnerAddress": "",
                        "universityPartnerWebsiteLink": "",
                        "universityPartnerCondition": "",
                        "universityPartnerDisplay": "True",
                        "universityPartnerCreator": name,
                        "universityPartnerLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),  
                        "universityPartnerSpeciality": [],
                    }
                )
            },

            callNewUniversity(){
                console.log(this.university[0])
                this.$emit("addNewUniversity", this.university[0])
                this.$emit('created');
            },
            
            removePartner(index) {
                this.university[0].universitySourcerPartner.splice(index, 1);
            },
        }
    }

</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    
    .fade-enter, .fade-leave-to {
        opacity: 0
    }

    .slide-fade-enter-active {
        transition: all .8s ease-out;
    }

    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter-from{
        transform: translateY(20px);
        opacity: 0;
    } 
    
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }
</style>