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
                <button v-if="!partnerView" @click="openPartner" class="font-bold text-indigo-600 hover:text-indigo-900">Edit</button>
                <button v-if="partnerView" @click="openPartner" class="font-bold text-indigo-600 hover:text-indigo-900">Close</button>
            </td>
        </tr>
        <transition-group name="slide-fade">
            <tr v-if="partnerView">
                <td colspan="6">
                    <div>
                        <div class="p-5 bg-gray-400 bg-opacity-70 text-black">
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
                                        id="universityPartnerAddress" v-model="universityPartnerElement.universityPartnerAddress" type="text" placeholder="Partner Address">
                                        <label for="universityPartnerAddress" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Partner Address</label>
                                    </div>
                                </div>
                                <div class="flex flex-wrap">
                                    <div class="relative w-full appearance-none label-floating">
                                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="universityPartnerCountry" v-model="universityPartnerElement.universityPartnerCountry" type="text" placeholder="Partner Country">
                                        <label for="universityPartnerCountry" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Partner Country</label>
                                    </div>
                                </div>
                                <div class="flex flex-wrap">
                                    <div class="relative w-full appearance-none label-floating">
                                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="universityPartnerCity" v-model="universityPartnerElement.universityPartnerCity" type="text" placeholder="Partner City">
                                        <label for="universityPartnerCity" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Partner City</label>
                                    </div>
                                </div>
                                <div class="flex flex-wrap col-end-7 col-span-4">
                                    <div class="relative w-full appearance-none label-floating">
                                        <input class="tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                        id="universityPartnerWebsiteLink" v-model="universityPartnerElement.universityPartnerWebsiteLink" type="url" placeholder="Partner Website Link">
                                        <label for="universityPartnerWebsiteLink" class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">Partner Website Link</label>
                                    </div>
                                </div>
                                <div class="flex flex-wrap col-start-1 col-end-7">
                                    <div class="relative w-full appearance-none label-floating col-start-1 col-end-7">
                                        <textarea class="autoexpand tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                            v-model="universityPartnerElement.universityPartnerCondition" @input="resize($event)" placeholder="Partner Condition..."></textarea>
                                        <label class="absolute tracking-wide py-2 px-4 opacity-0 leading-tight block top-0 left-0 cursor-text" for="Condition">Partner Condition...</label>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full col-start-1 col-end-7">
                                <smart-tagz
                                    input-placeholder="Select Countries ..."
                                    :defaultTags= universityPartnerElement.universityPartnerSpeciality
                                    :on-changed="logResult"
                                    :allowPaste="{delimiter: ','}"
                                    :allowDuplicates="false"
                                />
                            </div>
                            <div class="w-full flex justify-between">
                                <button @click="callDeletePartner()" class="text-red-600">Delete</button>
                                <div v-if="admin" class="flex flex-wrap col-start-1 col-span-3 mt-5">
                                    <div class="relative w-full appearance-none label-floating">
                                        <select v-model="universityPartnerElement.universityPartnerDisplay" class="p-2 rounded bg-gray-200 border border-gray-200">
                                            <option>True</option>
                                            <option>False</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </transition-group>
    </tbody>
</template>

<script>
    import { SmartTagz } from "smart-tagz";
    import "smart-tagz/dist/smart-tagz.css";
    import { defineComponent } from "vue";
    import Multiselect from '@vueform/multiselect'

    export default defineComponent ({
        name: "Basic",

        components:{
            SmartTagz,
            Multiselect
        },

        universityPartnerElement: 'universityPartnerElement',
        index: 'index',
        admin: 'admin',
        props: ['universityPartnerElement', 'index', 'admin'],

        data() {
            return {
                partnerView: false,
                specialityVisible: false,
                hello:[],
                value: [],
                options: ['Batman', 'Robin', 'Joker']
                
            }
        },

        setup(props) {
            const logResult = (result) =>{

                for (let index = 0; index < result.length; index++) {
                    
                }
                console.log("1: " + result)
                console.log("2: " + props.universityPartnerElement.universityPartnerSpeciality)
                props.universityPartnerElement.universityPartnerSpeciality = result
                console.log("3: " + props.universityPartnerElement.universityPartnerSpeciality)
            };
            return {
                logResult,
            };
        },

        methods: {
            callDeletePartner(){
                this.$emit("deletePartner")
            },

            resize(e){
                e.target.style.height = 'auto'
                e.target.style.height = `${e.target.scrollHeight}px`
            },

            openPartner: function() {
                console.log("partnerView")
                this.partnerView = !this.partnerView
            },

            setSpecialityVisible: function() {
                this.specialityVisible = !this.specialityVisible
            },
        }
    });

</script>

<style src="@vueform/multiselect/themes/default.css"></style>
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