<template>
    <div class="mt-1 md:mt-12 mx-auto flex justify-center items-center w-full h-full">

        <div class="grid grid-cols-1 w-full">
            <!-- Filter -->
            <div class="container flex justify-center flex-col ms:flex-row text-gray-900">
                <div class="pt-6 ms:pl-6">
                    <Multiselect
                        class="md:w-48 bg-white rounded text-black"
                        mode="single"
                        :searchable="true"
                        placeholder="From City"
                        v-model="modelV"
                        :options="option.cityStartOption"/>
                </div>
                <div class="pt-6 ms:pl-6">
                    <Multiselect
                        class="md:w-48 bg-white rounded text-black"
                        mode="single"
                        :searchable="true"
                        placeholder="To Destinations"
                        v-model="modelD"
                        :options="option.countryOption"/>
                </div>
                <div class="pt-6 ms:pl-6">
                    <Multiselect
                        class="md:w-48 bg-white rounded text-black"
                        mode="single"
                        :searchable="true"
                        placeholder="All specialities"
                        v-model="modelS"
                        :options="option.specialityOption"/>
                </div>
            </div>
            <div class="container flex justify-center">
                <button @click="searchByFilter" class="mt-6 px-10 ms:px-20 md:px-10 py-2 border rounded-md bg-red-800 text-white">Search</button>
            </div>

            <!-- University Card -->
            <transition-group name="slide-fade">
                <div v-if="visible" class="p-8 md:p-10 lg:px-20 2xl:px-32 grid gap-4 grid-cols-1 ms:grid-cols-2 lg:grid-cols-3">
                    <card v-for="university in this.universitysSend"
                        :key="university.universitySourceName"
                        :university="university"
                        @onClick = "getuniqueUniversityNameCard"
                        @created="init">
                    </card>
                    <div v-if="!show" class="rounded-lg relative text-white bg-gray-500 bg-opacity-50 p-5">
                        <div class="rounded-lg text-sm md:text-xl h-full space-y-6 py-2 md:py-10 xl:py-16 px-6">
                            <p class="text-center">You know more universities or schools that offer exchanges to asian countries?</p>
                            <p v-if="userConnected" class="text-center">Send us your informations with your dashboard!</p>
                            <p v-if="!userConnected" class="text-center">Go to register and propose them to us!</p>
                        </div>
                    </div>
                </div>
                <pulse-loader v-if="!visible" class=" mt-10 m-auto"></pulse-loader>
            </transition-group>

            <transition name="slide-fade">
                <div v-if="show" class="container mb-10 justify-center bg-gray-500 w-full bg-opacity-75 p-10">
                    <p class="text-xl lg:text-2xl text-white text-center mb-6">We are sorry,<br>we are not able to find a university or school that fits the selected parameters.</p>
                    <p class="text-xl lg:text-2xl text-white text-center">If you know of a university corresponding the chosen conditions, add it to our database by logging on to our site and consulting the <router-link class="text-blue-300" to="/dashboard">Dashboard</router-link> page.</p>
                </div>
            </transition>

            <navbar ref="navbarComponent" :university="universityObject"></navbar>

        </div>

    </div>
</template>

<script>
    import $ from 'jQuery'
    import Card from '../components/Card.vue'
    import Navbar from '../components/navbar.vue'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import firebase from 'firebase'
    import db from '../main.js'
    import {name} from '../main.js'
    import Multiselect from '@vueform/multiselect'
    import Notifications from "vt-notifications"

    export default {
        name: "Basic",

        components:{
            Card,
            Navbar,
            PulseLoader,
            Multiselect,
            Notifications,
        },

        data () {
            return {
                modelV:'',
                modelD:'',
                modelS:'',
                show: false,
                visible: false,
                userConnected: false,
                universitysSend: [],

                option: {
                    cityStartOption: [],
                    countryOption: [],
                    specialityOption: [],
                },

                universitys: [
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

                universityObject: {
                    universitySourceName: '',
                    universitySourceCountry: '',
                    universitySourceCity: '',
                    universitySourceAddress: '',
                    universitySourceImageLink: '',
                    universitySourceWebsiteLink: '',
                    universitySourceDisplay: '',
                    universitySourceCreator: '',
                    universitySourcerPartner: []
                },
            }
        },

        async beforeCreate(){
            await firebase.auth().onAuthStateChanged((user) => {
                if(user != undefined) {
                    db.ref('users/' + user.uid).once('value').then((snapshot) => {
                        this.userConnected = true
                    })
                }
            })
        },

        async created(){
            var testuni = this.universitys

            await db.ref("universitys").once("value", function(snapshot){
                snapshot.forEach(function(element){
                    testuni.push(element.val())
                })
            })
            
            this.universitysSend = testuni
            this.universitysSend.splice(0,1)

            for (let index = this.universitysSend.length-1; index >= 0; index--) {
                if(this.universitysSend[index].universitySourceDisplay === "False"){
                    this.universitysSend.splice(index, 1)
                } else {
                    for (let index2 = this.universitysSend[index].universitySourcerPartner.length-1; index2 >= 0 ; index2--) {
                        if(this.universitysSend[index].universitySourcerPartner[index2].universityPartnerDisplay === "False") {
                            this.universitysSend[index].universitySourcerPartner.splice(index2, 1)
                        }
                    }
                }
            }

            if(this.universitysSend.length > 0){
                this.visible = !this.visible;
            }
        },

        methods: {
            
            init(){
                var cityStart = [];
                var countryPartener = [];
                var specialityPartener = [];

                this.universitysSend.forEach(el => {
                    cityStart.push(el.universitySourceCity)
                    el.universitySourcerPartner.forEach(el2 => {
                        el2.universityPartnerSpeciality.forEach(el3 => {
                            if(el3 != "" && el3 != "N/A") {
                                specialityPartener.push(el3)
                            }
                        })                    
                        countryPartener.push(el2.universityPartnerCountry)
                    })
                })

                this.option.countryOption = [...new Set(countryPartener)]
                this.option.specialityOption = [...new Set(specialityPartener)]
                this.option.cityStartOption = [...new Set(cityStart)]
            },

            getuniqueUniversityNameCard (val) {
                this.setValue(val)
                this.$refs.navbarComponent.drawer();
            },

            setValue: function(universitySourceNameToFind) {
                for (var i = 0; i < this.universitys.length; i++) {
                    if(this.universitys[i].universitySourceName === universitySourceNameToFind){
                        this.universityObject.universitySourceName = this.universitys[i].universitySourceName,
                        this.universityObject.universitySourceCountry = this.universitys[i].universitySourceCountry,
                        this.universityObject.universitySourceCity = this.universitys[i].universitySourceCity,
                        this.universityObject.universitySourceAddress = this.universitys[i].universitySourceAddress,
                        this.universityObject.universitySourceImageLink = this.universitys[i].universitySourceImageLink,
                        this.universityObject.universitySourceWebsiteLink = this.universitys[i].universitySourceWebsiteLink,
                        this.universityObject.universitySourceDisplay = this.universitys[i].universitySourceDisplay,
                        this.universityObject.universitySourceCreator = this.universitys[i].universitySourceCreator,
                        this.universityObject.universitySourcerPartner = this.universitys[i].universitySourcerPartner
                    }
                }
            },

            searchByFilter() {
                this.modelV = this.option.cityStartOption[this.modelV]
                this.modelD = this.option.countryOption[this.modelD]
                this.modelS = this.option.specialityOption[this.modelS]

                this.universitysSend = this.universitys.filter(
                    (el) => {
                        if(this.modelV == "" || this.modelV == null || this.modelV == undefined) {
                            return (this.booleanByCountry(el.universitySourcerPartner))
                        } else {
                            return (el.universitySourceCity.toLowerCase() == this.modelV.toLowerCase() && this.booleanByCountry(el.universitySourcerPartner))
                        }
                    }
                )
                
                if(this.universitysSend.length > 0) {
                    this.show = false
                } else {
                    this.show = true
                }
            },

            booleanByCountry(consultList) {
                var res = false

                if(this.modelD != undefined && this.modelS != undefined) {
                    consultList.forEach(el => {
                        if(el.universityPartnerCountry == this.modelD) {
                            el.universityPartnerSpeciality.forEach(el2=>{
                                if(el2 == this.modelS) {
                                    res = true
                                }
                            })
                        }
                    })
                }

                if(this.modelD == undefined && this.modelS != undefined) {
                     consultList.forEach(el => {
                        el.universityPartnerSpeciality.forEach(el2 =>{
                            if(el2 === this.modelS) {
                                res = true
                            }
                        })
                    })
                }
                
                if(this.modelD != undefined && this.modelS == undefined) {
                    consultList.forEach(el => {
                        if(el.universityPartnerCountry === this.modelD) {
                            res = true
                        }
                    })
                }

                if(this.modelD == undefined && this.modelS == undefined) {
                    res = true
                }

                return res        
            },

            enter: function(el, done) {
                $(el).hide().slideDown(800,done)
            },

            leave: function(el, done) {
                $(el).show().slideUp(800, done)
            },

            setVisible: function() {
                this.visible = !this.visible
            }
        },
    }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style>

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  height: 0;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>