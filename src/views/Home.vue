<template>
    <div class="mt-1 md:mt-12 mx-auto flex justify-center items-center w-full">

        <div class=" grid grid-cols-1 w-full">

            <!-- Filter -->
            <div class="container flex justify-center flex-col ms:flex-row text-gray-900">
                <div class="pt-6 ms:pl-6">
                    <select v-model="modelV" class="border w-full p-2 rounded">
                        <option value="">All Cities</option>
                        <option v-for="(city, index) in option.cityStartOption" :key="index">{{city}}</option>
                    </select>
                </div>
                <div class="pt-6 ms:pl-6">
                    <select v-model="modelD" class="border w-full p-2 rounded">
                        <option value="">All Destinations</option>
                        <option v-for="(destination, index) in option.countryOption" :key="index">{{destination}}</option>
                    </select>
                </div>
                <div class="pt-6 ms:pl-6">
                    <select v-model="modelS" class="border w-full p-2 rounded">
                        <option value="">All specialities</option>
                        <option v-for="(speciality, index) in option.specialityOption" :key="index">{{speciality}}</option>
                    </select>
                </div>
            </div>

            <!-- Button Search -->
            <div class="container flex justify-center">
                <button @click="searchByFilter" class="mt-6 px-10 ms:px-20 md:px-10 py-2 border rounded-md bg-red-800 text-white">Search</button>
            </div>

            <!-- University Card -->
            <transition-group name="slide-fade">
                <div v-if="visible" class="my-10 p-8 md:p-10 lg:px-20 2xl:px-32 grid gap-4 grid-cols-1 ms:grid-cols-2 lg:grid-cols-3">
                    <card v-for="university in this.universitysSend"
                        :key="university.universitySourceName"
                        :university="university"
                        @onClick = "getuniqueUniversityNameCard"
                        @created="init">
                    </card>
                </div>
                <div v-if="!visible" class="my-10 p-8 md:p-10 lg:px-20 2xl:px-32 grid gap-4 grid-cols-1 ms:grid-cols-2 lg:grid-cols-3">
                    <div class="h-72 rounded-xl bg-gray-500 bg-opacity-50 flex">
                        <pulse-loader class="m-auto"></pulse-loader>
                    </div>
                    <div class="h-72 rounded-xl bg-gray-500 bg-opacity-50 flex">
                        <pulse-loader class="m-auto"></pulse-loader>
                    </div>
                    <div class="h-72 rounded-xl bg-gray-500 bg-opacity-50 flex">
                        <pulse-loader class="m-auto"></pulse-loader>
                    </div>
                    <div class="h-72 rounded-xl bg-gray-500 bg-opacity-50 flex">
                        <pulse-loader class="m-auto"></pulse-loader>
                    </div>
                    <div class="h-72 rounded-xl bg-gray-500 bg-opacity-50 flex">
                        <pulse-loader class="m-auto"></pulse-loader>
                    </div>
                    <div class="h-72 rounded-xl bg-gray-500 bg-opacity-50 flex">
                        <pulse-loader class="m-auto"></pulse-loader>
                    </div>
                </div>
            </transition-group>

            <transition name="slide-fade">
                <div v-if="show" class="container mb-96 flex p-1 justify-center bg-black opacity-85 rounded-xl">
                    <p class="py-2 text-lg lg:text-2xl text-white text-center">We are sorry,<br>we are not able to find a university that fits the selected parameters.</p>
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
    import vSelect from 'vue-select'
    import firebase from 'firebase'
    import db from '../main.js'
    import 'vue-select/dist/vue-select.css'

    export default {

        components:{
            Card,
            Navbar,
            PulseLoader,
            vSelect
        },

        data () {
            return {
                modelV:'',
                modelD:'',
                modelS:'',
                show: false,
                visible: false,
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
                        "universitySourceImageLink": "",
                        "universitySourceWebsiteLink": "",
                        "universitySourceDisplay": "False",
                        "universitySourceCreator": name,
                        "universitySourceLastUpdate": new Date().toLocaleDateString(),   
                        "universitySourcerPartner": [
                            {
                                "universityPartnerName": "University Partner",
                                "universitySourceId": "",
                                "universityPartnerCountry": "",
                                "universityPartnerCity": "",
                                "universityPartnerAddress": "",
                                "universityPartnerWebsiteLink": "",
                                "universityPartnerCondition": "",
                                "universityPartnerDisplay": "False",
                                "universityPartnerCreator": name,
                                "universityPartnerLastUpdate": new Date().toLocaleDateString(),  
                                "universityPartnerSpeciality": [
                                    {
                                        "specialityName": ""
                                    }
                                ],
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
                            specialityPartener.push(el3.specialityName)
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
                this.universitysSend = this.universitys.filter(
                    (el) => {
                        if(this.modelV == "") {
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

            booleanByCountry(testList) {
                var res = false

                if(this.modelD != "" && this.modelS != "") {
                    testList.forEach(el => {
                        if(el.universityPartnerCountry === this.modelD && el.universityPartnerSpeciality.indexOf(this.modelS) > -1) {
                            res = true
                        }
                    })
                }

                else if(this.modelD == "" && this.modelS != "") {
                     testList.forEach(el => {
                        el.universityPartnerSpeciality.forEach(el2 =>{
                            if(el2.specialityName === this.modelS) {
                                res = true
                            }
                        })
                    })
                }
                
                else if(this.modelD != "" && this.modelS == "") {
                    testList.forEach(el => {
                        if(el.universityPartnerCountry === this.modelD) {
                            res = true
                        }
                    })
                }

                else if(this.modelD == "" && this.modelS == "") {
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

<style>

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>