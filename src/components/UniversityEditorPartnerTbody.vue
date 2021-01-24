<template>
    <tbody class="bg-gray-300 divide-y divide-gray-200">
        <tr>
            <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{universityPartnerElement.universityPartnerName}}</div>
                    </div>
                </div>
            </td>
            <td class="px-4 py-2 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{universityPartnerElement.universityPartnerCity}}</div>
                <div class="text-sm text-gray-500">{{universityPartnerElement.universityPartnerCountry}}</div>
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{{universityPartnerElement.universityPartnerDisplay}}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{{universityPartnerElement.universityPartnerCreator}}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{{universityPartnerElement.universityPartnerLastUpdate}}</td>
            <td class="px-4 py-2 whitespace-nowrap text-center text-sm font-medium">
                <button v-if="!visible" @click="setVisible" class="font-bold text-indigo-600 hover:text-indigo-900">Edit</button>
                <button v-if="visible" @click="setVisible" class="font-bold text-indigo-600 hover:text-indigo-900">Close</button>
            </td>
        </tr>
        <transition-group name="slide-fade">
            <tr v-if="visible">
                <td colspan="6">
                    <div>
                        <form class="p-5 bg-gray-400 bg-opacity-70 text-black">
                            <div class="font-bold mb-5 grid grid-cols-3 gap-2">
                                <div class="flex flex-wrap col-start-1 col-end-7">
                                    <div class="relative w-full appearance-none label-floating">
                                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                            id="universityPartnerName" v-model="universityPartnerElement.universityPartnerName" type="text" placeholder="University Name">
                                        <label for="universityPartnerName" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">University Name</label>
                                    </div>
                                </div>
                                <div class="flex flex-wrap col-start-1 col-end-7">
                                    <div class="relative w-full appearance-none label-floating">
                                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="universityPartnerAddress" v-model="universityPartnerElement.universityPartnerAddress" type="text" placeholder="Address">
                                        <label for="universityPartnerAddress" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Address</label>
                                    </div>
                                </div>
                                <div class="flex flex-wrap">
                                    <div class="relative w-full appearance-none label-floating">
                                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="universityPartnerCountry" v-model="universityPartnerElement.universityPartnerCountry" type="text" placeholder="Country">
                                        <label for="universityPartnerCountry" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Country</label>
                                    </div>
                                </div>
                                <div class="flex flex-wrap">
                                    <div class="relative w-full appearance-none label-floating">
                                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="universityPartnerCity" v-model="universityPartnerElement.universityPartnerCity" type="text" placeholder="City">
                                        <label for="universityPartnerCity" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">City</label>
                                    </div>
                                </div>
                                <div class="flex flex-wrap col-end-7 col-span-4">
                                    <div class="relative w-full appearance-none label-floating">
                                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="universityPartnerWebsiteLink" v-model="universityPartnerElement.universityPartnerWebsiteLink" type="url" placeholder="Website Link">
                                        <label for="universityPartnerWebsiteLink" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Website Link</label>
                                    </div>
                                </div>
                                <div class="relative w-full appearance-none label-floating mb-2 col-start-1 col-end-7">
                                    <div class="" v-for="(speciality,k) in universityPartnerElement.universityPartnerSpeciality" :key="k">
                                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                        type="text" v-model="speciality.specialityName" id="specialityName" placeholder="Speciality">
                                        <label class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text" for="speciality">Speciality</label>
                                        <span class="">
                                            <button type="button" class="text-green-500 text-sm mr-2" @click="addSpeciality(k, universityPartnerElement, b)" v-show="k == universityPartnerElement.universityPartnerSpeciality.length-1">Add Speciality</button>
                                            <span class="mr-2" v-show="k == universityPartnerElement.universityPartnerSpeciality.length-1 && universityPartnerElement.universityPartnerSpeciality.length > 1">|</span>
                                            <button type="button" class="text-red-500 text-sm" @click="removeSpeciality(k, universityPartnerElement, b)" v-show="k || ( !k && universityPartnerElement.universityPartnerSpeciality.length > 1)">Remove Speciality</button>
                                        </span>
                                    </div>
                                </div>
                                <div class="flex flex-wrap col-start-1 col-end-7">
                                    <div class="relative w-full appearance-none label-floating col-start-1 col-end-7">
                                        <textarea class="autoexpand tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                            v-model="universityPartnerElement.universityPartnerCondition" @input="resize($event)" placeholder="Condition..."></textarea>
                                        <label class="absolute tracking-wide py-2 px-4 opacity-0 leading-tight block top-0 left-0 cursor-text" for="Condition">Condition...</label>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full flex justify-between">
                                <button @click="deleteP()" class="text-red-600">Delete</button>
                                <div class="flex flex-wrap col-start-1 col-span-3 mt-5">
                                    <div class="relative w-full appearance-none label-floating">
                                        <select v-model="universityPartnerElement.universityPartnerDisplay" class="p-2 rounded bg-gray-200 border border-gray-200">
                                            <option>True</option>
                                            <option>False</option>
                                        </select>
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
    import {apps, name, grade, defaultAnalytics} from '../main.js'
    import InputTag from 'vue-input-tag'

    export default {

        components:{
            InputTag,
        },

        name: 'universityPartnerElement',
        number: 'index',
        admin: 'admin',
        props: ['universityPartnerElement', 'index', 'admin'],

        data() {
            return {
                visible: false,
            }
        },

        methods: {
            deleteP(){
                this.$emit("myEvent")
            },

            resize(e){
                e.target.style.height = 'auto'
                e.target.style.height = `${e.target.scrollHeight}px`
            },

            setVisible: function() {
                this.visible = !this.visible
            },

            addSpeciality(index, partner, parentIndex) {
                partner.universityPartnerSpeciality.push({ "specialityName": "" });
            },

            removeSpeciality(index, partner, parentIndex) {
                partner.universityPartnerSpeciality.splice(index, 1);
            }
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