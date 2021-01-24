<template>
    <tbody class="bg-white divide-y divide-gray-200">
        <tr>
            <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                        {{university.universitySourceName}}
                        </div>
                    </div>
                </div>
            </td>
            <td class="px-4 py-2 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{university.universitySourceCity}}</div>
                <div class="text-sm text-gray-500">{{university.universitySourceCountry}}</div>
            </td>
            <td class="px-4 py-2 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-500">
                {{university.universitySourceDisplay}}
                </span>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {{university.universitySourceCreator}}
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {{university.universitySourceLastUpdate}}
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-center text-sm font-medium">
                <button v-if="!openingUniversityForm" @click="openUniversityForm" class="font-bold text-indigo-600 hover:text-indigo-800">Edit</button>
                <button v-if="openingUniversityForm" @click="openUniversityForm" class="font-bold text-indigo-600 hover:text-indigo-800">Close</button>
            </td>
        </tr>
        <transition-group name="slide-fade">
            <tr v-if="openingUniversityForm">
                <td colspan="6">
                    <div>
                        <form class="p-5 bg-gray-400 bg-opacity-70 text-black">

                            <div class="font-bold mb-5 grid grid-cols-3 gap-2">
                                <div class="flex flex-wrap col-start-1 col-end-7">
                                    <div class="relative w-full appearance-none label-floating">
                                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="universitySourceName" v-model="university.universitySourceName" type="text" placeholder="University Name">
                                        <label for="universitySourceName" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">University Name</label>
                                    </div>
                                </div>
                                <div class="flex flex-wrap col-start-1 col-span-3">
                                    <div class="relative w-full appearance-none label-floating">
                                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="universitySourceAddress" v-model="university.universitySourceAddress" type="text" placeholder="Address">
                                        <label for="universitySourceAddress" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Address</label>
                                    </div>
                                </div>
                                <div class="flex flex-wrap">
                                    <div class="relative w-full appearance-none label-floating">
                                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="universitySourceCountry" v-model="university.universitySourceCountry" type="text" placeholder="Country">
                                        <label for="universitySourceCountry" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Country</label>
                                    </div>
                                </div>
                                <div class="flex flex-wrap col-span-2">
                                    <div class="relative w-full appearance-none label-floating">
                                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="universitySourceCity" v-model="university.universitySourceCity" type="text" placeholder="City">
                                        <label for="universitySourceCity" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">City</label>
                                    </div>
                                </div>
                                <div class="flex flex-wrap col-start-1 col-span-3">
                                    <div class="relative w-full appearance-none label-floating">
                                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="universitySourceImageLink" v-model="university.universitySourceImageLink" type="url" placeholder="Image Link">
                                        <label for="universitySourceImageLink" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Image Link</label>
                                    </div>
                                </div>
                                <div class="flex flex-wrap col-end-7 col-span-3">
                                    <div class="relative w-full appearance-none label-floating">
                                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="universitySourceWebsiteLink" v-model="university.universitySourceWebsiteLink" type="url" placeholder="Website Link">
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
                                                        Display
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
                                                <UEPT v-for="(universityPartnerElement, index) in university.universitySourcerPartner"
                                                    :key="index"
                                                    :universityPartnerElement="universityPartnerElement"
                                                    :admin="admin"
                                                    @myEvent="removePartner(index)">
                                                </UEPT>
                                            </table>
                                            <div class="w-full flex justify-between">
                                                <button v-if="(herCreation && (university.universitySourceDisplay != 'True')) || admin" type="button" @click="callDeleteUniversity()" class="text-white bg-red-500 rounded-xl px-5 py-1 mt-5 mr-2">Delete University</button>
                                                <div v-if="admin" class="flex flex-wrap col-start-1 col-span-3 mt-5">
                                                    <div class="relative w-full appearance-none label-floating">
                                                        <select v-model="university.universitySourceDisplay" class="p-2 rounded bg-gray-200 border border-gray-200">
                                                            <option>True</option>
                                                            <option>False</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button type="button" @click="callAddPartner()" class="text-white bg-blue-500 rounded-xl px-5 py-1 mt-5 mr-2">Add Partner</button>
                                                    <button type="button" @click="callSendData()" class="text-white bg-green-500 rounded-xl px-5 py-1 mt-5 mr-2">Send Modify</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </td>
            </tr>
        </transition-group>
    </tbody>
</template>

<script>
    import UEPT from './UniversityEditorPartnerTbody.vue'
    import firebase from 'firebase'
    import db from '../main.js'
    import {apps, name, grade, defaultAnalytics} from '../main.js'

    export default {

        components:{
            UEPT
        },

        university: 'university',
        admin: 'admin',
        herCreation: 'herCreation',
        props: ['university', 'admin', 'herCreation'],

        data() {
            return {
                openingUniversityForm: false,
            }
        },

        methods: {

            callDeleteUniversity(){
                console.log("callDeleteUniversity")
                this.openingUniversityForm = !this.openingUniversityForm

                setTimeout(()=>{
                    this.$emit("deleteUniversity")
                },1000)
            },

            callAddPartner(){
                console.log("callAddPartner into UET")
                this.$emit("addPartner")
            },

            callSendData(){
                this.$emit("sendData")
            },

            openUniversityForm: function() {
                this.openingUniversityForm = !this.openingUniversityForm
            },

            addPartner() {
                this.university.universitySourcerPartner.push(
                    {
                        "universityPartnerName": "University Partner",
                                "universitySourceId": "",
                        "universityPartnerCountry": "",
                        "universityPartnerCity": "",
                        "universityPartnerAddress": "",
                        "universityPartnerWebsiteLink": "",
                        "universityPartnerCondition": "",
                        "universityPartnerSpeciality": [
                            {
                                "specialityName": ""
                            }
                        ],
                    }
                )
            },
            
            removePartner(index) {
                this.university.universitySourcerPartner.splice(index, 1);
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
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter-from, .slide-fade-leave-to {
        transform: translateY(20px);
        opacity: 0;
    }
</style>