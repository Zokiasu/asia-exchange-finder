<template>
    <div class="mt-1 md:mt-12 mx-auto flex justify-center items-center w-full h-full">

        <div class="grid grid-cols-1 w-full">
            <!-- Filter City/Destination/Speciality -->
            <div class="container flex justify-center flex-col ms:flex-row text-gray-900">
                <div class="pt-6 ms:pl-1 flex">
                    <Multiselect
                        class="md:w-48 bg-gray-200 text-black"
                        mode="single"
                        :searchable="true"
                        placeholder="From All Cities"
                        v-model="CityFilter"
                        :options="option.cityStartOption"/>
                    <button @click="resetCity" class="px-1 rounded-none" :class="(CityFilter === '' || CityFilter === null || CityFilter === undefined) ? 'bg-gray-200 border border-gray-200 invisible' : 'bg-red-700 border border-red-700 visible text-white'">X</button>
                </div>
                <div class="pt-6 ms:pl-1 flex">
                    <Multiselect
                        class="md:w-48 bg-gray-200 text-black"
                        mode="single"
                        :searchable="true"
                        placeholder="To All Destinations"
                        v-model="DestinationFilter"
                        :options="option.countryOption"/>
                    <button @click="resetDestination" class="px-1 rounded-none" :class="(DestinationFilter === '' || DestinationFilter === null || DestinationFilter === undefined) ? 'bg-gray-200 border border-gray-200 invisible' : 'bg-red-700 border border-red-700 visible text-white'">X</button>
                </div>
                <div class="pt-6 ms:pl-1 flex">
                    <Multiselect
                        class="md:w-48 bg-gray-200 text-black"
                        mode="single"
                        :searchable="true"
                        placeholder="For All Specialities"
                        v-model="SpecialityFilter"
                        :options="option.specialityOption"/>
                    <button @click="resetSpeciality" class="px-1 rounded-none" :class="(SpecialityFilter === '' || SpecialityFilter === null || SpecialityFilter === undefined) ? 'bg-gray-200 border border-gray-200 invisible' : 'bg-red-700 border border-red-700 visible text-white'">X</button>
                </div>
                <div class="pt-6 ms:pl-1 flex">
                    <Multiselect
                        class="md:w-48 bg-gray-200 text-black"
                        mode="single"
                        :searchable="true"
                        placeholder="Display Statut"
                        v-model="displayFilter"
                        :options="option.displayOption"/>
                    <button @click="resetDisplay" class="px-1 rounded-none" :class="(displayFilter === '' || displayFilter === null || displayFilter === undefined) ? 'bg-gray-200 border border-gray-200 invisible' : 'bg-red-700 border border-red-700 visible text-white'">X</button>
                </div>
            </div>
            <div class="container flex flex-col justify-center">
                <button @click="searchByFilter" class="mx-auto mt-6 px-10 ms:px-20 md:px-10 py-2 border rounded-md bg-red-800 text-white">Search</button>
                <button @click="resetFilter" class="mt-2 mx-auto focus:border-transparent">Reset Filter</button>
            </div>
            <div class="px-8 md:px-10 lg:px-20 2xl:px-32 py-2 mb-5 w-full place-items-center">
                <p class="font-semibold">Sort By : </p>
                <button @click="sortingParam(value)" :class="[ (actualSorting == value) ? 'font-semibold bg-red-500' : 'bg-blue-500' ]" class="text-white rounded py-1 px-3 mr-2 mt-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" v-for="(value, index) in this.sortBy" v-bind:key="index">{{value}}</button>
            </div>

            <!-- University Card -->
            <transition-group name="slide-fade">
                <div v-if="visible && userConnected" class="px-8 md:px-10 lg:px-20 2xl:px-32 mb-10 grid gap-4 grid-cols-1 ms:grid-cols-2 xl:grid-cols-3 4xl:grid-cols-4">
                    <button @click="createUniversity" class="bg-gray-200 opacity-60 hover:opacity-100 Card rounded-lg overflow-hidden shadow-2xl relative h-full flex justify-center items-center">
                        <img class="h-full w-full object-cover object-center" v-lazy="imgTmp" alt="">
                        <img class="h-14 w-14 absolute" v-lazy="imgTmp2" alt="">
                        <p class="absolute w-full bg-gray-200 bg-opacity-80 p-5 bottom-0 block text-black font-semibold text-lg">
                            Add New University
                        </p>
                    </button>
                    <card
                        v-for="(universitySource, index) in this.universitysSend.slice(0,minElement)"
                        :key="index"
                        :universitySource="universitySource"
                        @removeUniversitySource="removeUniversity(index)"
                        @openUniversity="getuniqueUniversityNameCard(index)"
                        @updateUniv="function(a){editUniversity(index, a)}">
                    </card>
                    <transition name="slide-fade">
                        <div v-if="show" class="container bg-gray-500 bg-opacity-75 w-full h-full p-10 rounded-lg overflow-hidden shadow-2xl relative justify-center items-center grid grid-cols-1 ">
                            <p class="text-xl lg:text-2xl text-white text-center mb-6">We are sorry,<br>we are not able to find a university or school that fits the selected parameters.</p>
                            <p class="text-xl lg:text-2xl text-white text-center">If you know of a university corresponding the chosen conditions, add it to our database by logging on to our site and consulting the <router-link class="text-blue-300" to="/editorview">Editor Mode</router-link>.</p>
                        </div>
                    </transition>
                </div>
                <pulse-loader v-if="minElement <= this.universitysSend.length || !visible && !userConnected" class=" mt-10 m-auto"></pulse-loader>
            </transition-group>

            <!-- Component University Card -->
            <NavbarEditor 
                class="z-40" ref="navbarComponent" 
                :university="universityObject" 
                :listOfSpeciality="listOfSpeciality"
                @updateUniv="function(a){addNewUniversityPartner(a)}"
                @removePartner="function(a){removeUniversityPartner(universityObject, a)}"
                @editPartner="function(a){editUniversityPartner(universityObject, a)}">
            </NavbarEditor>

        </div>

        <back-to-top class="z-30" bottom="50px" right="50px">
            <button type="button" class="py-1 2xl:py-2 px-2.5 2xl:px-3.5 rounded-xl 2xl:rounded-3xl bg-green-500 text-white 4xl:text-xl">Back to top</button>
        </back-to-top>
    </div>
</template>

<script>
    import $ from 'jQuery'
    import Multiselect from '@vueform/multiselect'
    import BackToTop from 'vue-backtotop'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    import db from '../../main.js'
    import {apps, name, grade} from '../../main.js'
    import imgs from '../../assets/plus-symbol.png'

    import Card from '../../components/EditorViewComponent/UniversityCardEditor.vue'
    import NavbarEditor from '../../components/EditorViewComponent/NavbarEditor.vue'
    import FirebaseLog from '../../Mixins/firebase' 

    export default {
        name: "Basic",
        mixins:[FirebaseLog],

        components:{
            Card,
            NavbarEditor,
            PulseLoader,
            Multiselect,
            BackToTop,
        },

        data () {
            return {
                imgTmp: 'https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80',
                imgTmp2: imgs,

                modelCity:'',
                modelDestination:'',
                modelSpeciality:'',
                modelDisplay:'',

                CityFilter:'',
                DestinationFilter:'',
                SpecialityFilter:'',
                displayFilter:'',

                minElement: 11,

                show: false,
                visible: false,
                userConnected: false,
                addUniversitySourcePopUp: false,
                editUniversitySourcePopUp: false,
                deleteUniversitySourcePopUp: false,
                
                userName: '',
                universitysSend: [],
                listOfSpeciality: [],
                sortBy: ['A-Z', 'Z-A', 'Creation Date Asc.', 'Creation Date Desc.'],
                actualSorting: 'A-Z',

                option: {
                    cityStartOption: [],
                    countryOption: [],
                    specialityOption: [],
                    displayOption: ['Online', 'In Progress'],
                },

                universitys: [],

                universityObject: {
                    universitySourceId: '',
                    universitySourceName: '',
                    universitySourceCountry: '',
                    universitySourceCity: '',
                    universitySourceAddress: '',
                    universitySourceImageLink: '',
                    universitySourceWebsiteLink: '',
                    universitySourceDisplay: '',
                    universitySourceCreator: '',
                    universitySourceMoreInfo: '',
                    universitySourceContributors: [],
                    universitySourceLastUpdate: '',
                    universitySourcerPartner: []
                },
            }
        },

        async beforeCreate(){
            await apps.auth().onAuthStateChanged((user) => {
                if(user != undefined) {
                    db.ref('users/' + user.uid).once('value').then((snapshot) => {
                        this.userConnected = true
                    })
                }
            })
        },

        async mounted() {
            this.scroll()

            var getUniversityDatabase = this.universitys
            var specialityPartener = []

            await db.ref("universitys").once("value", function(snapshot){
                snapshot.forEach(function(element){
                    if(element.val().universitySourceName != undefined) {
                        getUniversityDatabase.push(
                            {
                                "universitySourceId": element.val().universitySourceId,
                                "universitySourceName": element.val().universitySourceName,
                                "universitySourceCountry": element.val().universitySourceCountry,
                                "universitySourceCity": element.val().universitySourceCity,
                                "universitySourceAddress": element.val().universitySourceAddress,
                                "universitySourceImageLink": element.val().universitySourceImageLink,
                                "universitySourceWebsiteLink": element.val().universitySourceWebsiteLink,
                                "universitySourceDisplay": element.val().universitySourceDisplay,
                                "universitySourceCreator":element.val().universitySourceCreator,
                                "universitySourceMoreInfo": element.val().universitySourceMoreInfo,
                                "universitySourceContributors": element.val().universitySourceContributors,
                                "universitySourceLastUpdate": element.val().universitySourceLastUpdate,
                                "universitySourcerPartner": element.val().universitySourcerPartner, 
                            }
                        )
                        if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceName == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceName = ""}
                        if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceCountry == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceCountry = ""}
                        if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceCity == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceCity = ""}
                        if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceAddress == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceAddress = ""}
                        if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceImageLink == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceImageLink = ""}
                        if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceWebsiteLink == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceWebsiteLink = ""}
                        if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceDisplay == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceDisplay = ""}
                        if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceCreator == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceCreator = []}
                        if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceMoreInfo == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceMoreInfo = ""}
                        if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceContributors == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceContributors = ""}
                        if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceLastUpdate == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceLastUpdate = ""}
                        if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourcerPartner == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourcerPartner = []}
                    }
                })
            })

            await db.ref("universitysEdited").once("value", function(snapshot){
                snapshot.forEach(function(el){
                    el.forEach(function(element){
                        if(element.val().universitySourceName != undefined) {
                            getUniversityDatabase.push(
                                {
                                    "universitySourceId": element.val().universitySourceId,
                                    "universitySourceName": element.val().universitySourceName,
                                    "universitySourceCountry": element.val().universitySourceCountry,
                                    "universitySourceCity": element.val().universitySourceCity,
                                    "universitySourceAddress": element.val().universitySourceAddress,
                                    "universitySourceImageLink": element.val().universitySourceImageLink,
                                    "universitySourceWebsiteLink": element.val().universitySourceWebsiteLink,
                                    "universitySourceDisplay": element.val().universitySourceDisplay,
                                    "universitySourceCreator":element.val().universitySourceCreator,
                                    "universitySourceMoreInfo": element.val().universitySourceMoreInfo,
                                    "universitySourceContributors": element.val().universitySourceContributors,
                                    "universitySourceLastUpdate": element.val().universitySourceLastUpdate,
                                    "universitySourcerPartner": element.val().universitySourcerPartner, 
                                }
                            )
                            if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceName == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceName = ""}
                            if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceCountry == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceCountry = ""}
                            if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceCity == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceCity = ""}
                            if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceAddress == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceAddress = ""}
                            if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceImageLink == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceImageLink = ""}
                            if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceWebsiteLink == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceWebsiteLink = ""}
                            if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceDisplay == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceDisplay = ""}
                            if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceCreator == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceCreator = []}
                            if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceMoreInfo == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceMoreInfo = ""}
                            if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceContributors == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceContributors = ""}
                            if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourceLastUpdate == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourceLastUpdate = ""}
                            if(getUniversityDatabase[getUniversityDatabase.length-1].universitySourcerPartner == undefined) {getUniversityDatabase[getUniversityDatabase.length-1].universitySourcerPartner = []}
                            console.log(getUniversityDatabase[getUniversityDatabase.length-1])
                        }
                    })
                })
            })

            getUniversityDatabase.forEach(el => {
                if(el.universitySourcerPartner){
                    el.universitySourcerPartner.forEach(el2 => {
                        if(el2.universityPartnerSpeciality != undefined){
                            for (let index = 0; index < el2.universityPartnerSpeciality.length; index++) {
                                specialityPartener.push(el2.universityPartnerSpeciality[index])
                            }
                        }
                    })
                }
            })

            this.listOfSpeciality = [...new Set(specialityPartener)]
            this.universitysSend = getUniversityDatabase
            
            this.universitysSend.sort(function(a,b){
                if(a.universitySourceName.toLowerCase() < b.universitySourceName.toLowerCase()) {return -1;}
                if(a.universitySourceName.toLowerCase() > b.universitySourceName.toLowerCase()) {return 1;}
                return 0;
            })

            this.removeDoubleUniversityOnline(this.universitysSend)

            if(this.universitysSend.length > 0){
                this.visible = !this.visible;
                this.init();
                if(this.$route.query.id) {
                    this.getuniqueUniversityNameCard1(this.$route.query.id)
                }
            }
        },

        methods: {
            //General function            
            init(){
                var cityStart = [];
                var countryPartener = [];
                var specialityPartener = [];

                this.universitysSend.forEach(el => {
                    cityStart.push(el.universitySourceCity)
                    if(el.universitySourcerPartner) {
                        el.universitySourcerPartner.forEach(el2 => {
                            if(el2.universityPartnerSpeciality) {
                                el2.universityPartnerSpeciality.forEach(el3 => {
                                    if(el3 != "" && el3 != "N/A") {
                                        specialityPartener.push(el3)
                                    }
                                })
                            }                  
                            countryPartener.push(el2.universityPartnerCountry)
                        })
                    }
                })

                this.option.countryOption = [...new Set(countryPartener)]
                this.option.countryOption.sort()
                this.option.specialityOption = [...new Set(specialityPartener)]
                this.option.specialityOption.sort()
                this.option.cityStartOption = [...new Set(cityStart)]
                this.option.cityStartOption.sort()
            },

            scroll(){
                window.onscroll = () => {
                    let bottomOfWindow = Math.round(Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight) === Math.round(document.documentElement.offsetHeight) 
                                        || Math.round(Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight) === (Math.round(document.documentElement.offsetHeight)-1)
                    if (bottomOfWindow) {
                        this.minElement = this.minElement + 9;
                        bottomOfWindow = false;
                    }
                }
            },

            async updateDisplayUniversity(){
                var getUniversityDatabase = []

                await db.ref("universitys").once("value", function(snapshot){
                    snapshot.forEach(function(element){
                        getUniversityDatabase.push(
                            {
                                "universitySourceId": element.val().universitySourceId,
                                "universitySourceName": element.val().universitySourceName,
                                "universitySourceCountry": element.val().universitySourceCountry,
                                "universitySourceCity": element.val().universitySourceCity,
                                "universitySourceAddress": element.val().universitySourceAddress,
                                "universitySourceImageLink": element.val().universitySourceImageLink,
                                "universitySourceWebsiteLink": element.val().universitySourceWebsiteLink,
                                "universitySourceDisplay": element.val().universitySourceDisplay,
                                "universitySourceCreator":element.val().universitySourceCreator,
                                "universitySourceMoreInfo": element.val().universitySourceMoreInfo,
                                "universitySourceContributors": element.val().universitySourceContributors,
                                "universitySourceLastUpdate": element.val().universitySourceLastUpdate,
                                "universitySourcerPartner": element.val().universitySourcerPartner, 
                            }
                        )
                    })
                })

                await db.ref("universitysEdited").once("value", function(snapshot){
                    snapshot.forEach(function(el){
                        el.forEach(function(element){
                            getUniversityDatabase.push(
                                {
                                    "universitySourceId": element.val().universitySourceId,
                                    "universitySourceName": element.val().universitySourceName,
                                    "universitySourceCountry": element.val().universitySourceCountry,
                                    "universitySourceCity": element.val().universitySourceCity,
                                    "universitySourceAddress": element.val().universitySourceAddress,
                                    "universitySourceImageLink": element.val().universitySourceImageLink,
                                    "universitySourceWebsiteLink": element.val().universitySourceWebsiteLink,
                                    "universitySourceDisplay": element.val().universitySourceDisplay,
                                    "universitySourceCreator":element.val().universitySourceCreator,
                                    "universitySourceMoreInfo": element.val().universitySourceMoreInfo,
                                    "universitySourceContributors": element.val().universitySourceContributors,
                                    "universitySourceLastUpdate": element.val().universitySourceLastUpdate,
                                    "universitySourcerPartner": element.val().universitySourcerPartner, 
                                }
                            )
                        })
                    })
                })
                this.universitysSend = getUniversityDatabase
                
                this.universitysSend.sort(function(a,b){
                    if(a.universitySourceName.toLowerCase() < b.universitySourceName.toLowerCase()) {return -1;}
                    if(a.universitySourceName.toLowerCase() > b.universitySourceName.toLowerCase()) {return 1;}
                    return 0;
                })

                this.removeDoubleUniversityOnline(this.universitysSend)

                var specialityPartener = []
                
                getUniversityDatabase.forEach(el => {
                    if(el.universitySourcerPartner){
                        el.universitySourcerPartner.forEach(el2 => {
                            if(el2.universityPartnerSpeciality != undefined){
                                for (let index = 0; index < el2.universityPartnerSpeciality.length; index++) {
                                    specialityPartener.push(el2.universityPartnerSpeciality[index])
                                }
                            }
                        })
                    }
                })

                this.listOfSpeciality = [...new Set(specialityPartener)]
            },

            removeDoubleUniversityOnline(universityEdit){
                for (let j = 0; j < universityEdit.length-1; j++) {
                    if(universityEdit[j].universitySourceName === universityEdit[j+1].universitySourceName) {
                        if(universityEdit[j].universitySourceDisplay == "True") {
                            universityEdit.splice(j,1)
                        } else if(universityEdit[j+1].universitySourceDisplay == "True") {
                            universityEdit.splice(j+1,1)
                        }
                    }
                }
            },

            createUniversity: function() {
                this.$router.push({path: '/edit/informations'})
            },
            
            getuniqueUniversityNameCard1 (idUniv) {
                this.setValue(idUniv)
                this.$refs.navbarComponent.drawer();
            },

            setValue: function(universitySourceIdToFind) {
                for (var i = 0; i < this.universitys.length; i++) {
                    if(this.universitys[i].universitySourceId === universitySourceIdToFind){
                        this.universityObject.universitySourceId = this.universitys[i].universitySourceId,
                        this.universityObject.universitySourceName = this.universitys[i].universitySourceName,
                        this.universityObject.universitySourceCountry = this.universitys[i].universitySourceCountry,
                        this.universityObject.universitySourceCity = this.universitys[i].universitySourceCity,
                        this.universityObject.universitySourceAddress = this.universitys[i].universitySourceAddress,
                        this.universityObject.universitySourceImageLink = this.universitys[i].universitySourceImageLink,
                        this.universityObject.universitySourceWebsiteLink = this.universitys[i].universitySourceWebsiteLink,
                        this.universityObject.universitySourceDisplay = this.universitys[i].universitySourceDisplay,
                        this.universityObject.universitySourceCreator = this.universitys[i].universitySourceCreator,
                        this.universityObject.universitySourceMoreInfo = this.universitys[i].universitySourceMoreInfo,
                        this.universityObject.universitySourceContributors = this.universitys[i].universitySourceContributors,                
                        this.universityObject.universitySourceLastUpdate = this.universitys[i].universitySourceLastUpdate,
                        this.universityObject.universitySourcerPartner = this.universitys[i].universitySourcerPartner
                    }
                }
            },

            getuniqueUniversityNameCard (index) { 
                this.universityObject.universitySourceId = this.universitysSend[index].universitySourceId,
                this.universityObject.universitySourceName = this.universitysSend[index].universitySourceName,
                this.universityObject.universitySourceCountry = this.universitysSend[index].universitySourceCountry,
                this.universityObject.universitySourceCity = this.universitysSend[index].universitySourceCity,
                this.universityObject.universitySourceAddress = this.universitysSend[index].universitySourceAddress,
                this.universityObject.universitySourceImageLink = this.universitysSend[index].universitySourceImageLink,
                this.universityObject.universitySourceWebsiteLink = this.universitysSend[index].universitySourceWebsiteLink,
                this.universityObject.universitySourceDisplay = this.universitysSend[index].universitySourceDisplay,
                this.universityObject.universitySourceCreator = this.universitysSend[index].universitySourceCreator,
                this.universityObject.universitySourceMoreInfo = this.universitysSend[index].universitySourceMoreInfo,
                this.universityObject.universitySourceContributors = this.universitysSend[index].universitySourceContributors,                
                this.universityObject.universitySourceLastUpdate = this.universitysSend[index].universitySourceLastUpdate,
                this.universityObject.universitySourcerPartner = this.universitysSend[index].universitySourcerPartner
                this.$refs.navbarComponent.drawer();
            },

            enter: function(el, done) {
                $(el).hide().slideDown(800,done)
            },

            leave: function(el, done) {
                $(el).show().slideUp(800, done)
            },

            setVisible: function() {
                this.visible = !this.visible
            },

            sortingParam(sortParameter){
                switch(sortParameter){
                    case 'A-Z':
                        this.actualSorting = "A-Z"
                        this.universitysSend.sort(function(a,b){
                            if(a.universitySourceName.toLowerCase() < b.universitySourceName.toLowerCase()) {return -1;}
                            if(a.universitySourceName.toLowerCase() > b.universitySourceName.toLowerCase()) {return 1;}
                            return 0;
                        })
                    break;
                    case 'Z-A':
                        this.actualSorting = "Z-A"
                        this.universitysSend.sort(function(a,b){
                            if(a.universitySourceName.toLowerCase() > b.universitySourceName.toLowerCase()) {return -1;}
                            if(a.universitySourceName.toLowerCase() < b.universitySourceName.toLowerCase()) {return 1;}
                            return 0;
                        })
                    break;
                    case 'Creation Date Asc.':
                        this.actualSorting = "Creation Date Asc."
                        this.universitysSend.sort(function(a,b){
                            if(a.universitySourceLastUpdate.toLowerCase() < b.universitySourceLastUpdate.toLowerCase()) {return -1;}
                            if(a.universitySourceLastUpdate.toLowerCase() > b.universitySourceLastUpdate.toLowerCase()) {return 1;}
                            return 0;
                        })
                    break;
                    case 'Creation Date Desc.':
                        this.actualSorting = "Creation Date Desc."
                        this.universitysSend.sort(function(a,b){
                            if(a.universitySourceLastUpdate.toLowerCase() > b.universitySourceLastUpdate.toLowerCase()) {return -1;}
                            if(a.universitySourceLastUpdate.toLowerCase() < b.universitySourceLastUpdate.toLowerCase()) {return 1;}
                            return 0;
                        })
                    break;
                }
            },

            //Reset function
            resetFilter(){
                this.CityFilter = undefined
                this.DestinationFilter = undefined
                this.SpecialityFilter = undefined
                this.displayFilter = undefined
                this.searchByFilter()
            },

            resetCity(){
                this.CityFilter = undefined
                this.searchByFilter()
            },

            resetDestination(){
                this.DestinationFilter = undefined
                this.searchByFilter()
            },

            resetSpeciality(){
                this.SpecialityFilter = undefined
                this.searchByFilter()
            },

            resetDisplay(){
                this.displayFilter = undefined
                this.searchByFilter()
            },

            //Filter function
            searchByFilter() {
                this.modelCity = this.option.cityStartOption[this.CityFilter]
                this.modelDestination = this.option.countryOption[this.DestinationFilter]
                this.modelSpeciality = this.option.specialityOption[this.SpecialityFilter]
                this.modelDisplay = this.option.displayOption[this.displayFilter]

                if(this.modelDisplay == "Online") {
                    this.modelDisplay = "true"
                } else if (this.modelDisplay == "In Progress"){
                    this.modelDisplay = "false"
                }

                this.universitysSend = this.universitys.filter(
                    (el) => {
                        if(this.modelCity == "" && this.modelDisplay == "" || this.modelCity == null && this.modelDisplay == null || this.modelCity == undefined && this.modelDisplay == undefined) {
                            return (this.booleanByCountry(el.universitySourcerPartner))
                        } 
                        else if(this.modelCity == "" && this.modelDisplay != "" || this.modelCity == null && this.modelDisplay != null || this.modelCity == undefined && this.modelDisplay != undefined) {
                            return (this.booleanByCountry(el.universitySourcerPartner) && el.universitySourceDisplay.toLowerCase() == this.modelDisplay.toLowerCase())
                        } 
                        else if(this.modelCity != "" && this.modelDisplay == "" || this.modelCity != null && this.modelDisplay == null || this.modelCity != undefined && this.modelDisplay == undefined) {
                            return (el.universitySourceCity.toLowerCase() == this.modelCity.toLowerCase() && this.booleanByCountry(el.universitySourcerPartner))
                        } 
                        else {
                            return (el.universitySourceCity.toLowerCase() == this.modelCity.toLowerCase() && this.booleanByCountry(el.universitySourcerPartner) && el.universitySourceDisplay.toLowerCase() == this.modelDisplay.toLowerCase())
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

                if(this.modelDestination != undefined && this.modelSpeciality != undefined && consultList) {
                    consultList.forEach(el => {
                        if(el.universityPartnerCountry == this.modelDestination) {
                            el.universityPartnerSpeciality.forEach(el2=>{
                                if(el2 == this.modelSpeciality) {
                                    res = true
                                }
                            })
                        }
                    })
                }

                if(this.modelDestination == undefined && this.modelSpeciality != undefined && consultList) {
                     consultList.forEach(el => {
                        if(el.universityPartnerSpeciality != undefined) {
                            for (let index = 0; index < el.universityPartnerSpeciality.length; index++) {
                                if(el.universityPartnerSpeciality[index] === this.modelSpeciality) {
                                    res = true
                                }
                            }
                        }
                    })
                }
                
                if(this.modelDestination != undefined && this.modelSpeciality == undefined && consultList) {
                    consultList.forEach(el => {
                        if(el.universityPartnerCountry === this.modelDestination) {
                            res = true
                        }
                    })
                }

                if(this.modelDestination == undefined && this.modelSpeciality == undefined) {
                    res = true
                }

                return res        
            },

            //University function
            addNewUniversity(newUniversitys){
                var testA = "";
                var up = {};
                
                if(newUniversitys.universitySourceId == "" || newUniversitys.universitySourceId == undefined) {
                    testA = db.ref().child('universitys').push().key;
                    newUniversitys.universitySourceId = testA;
                    this.updateCreators(newUniversitys)
                    up['/universitysEdited/' + testA] = newUniversitys
                    
                } else {
                    this.updateCreators(newUniversitys)
                    up['/universitysEdited/' + newUniversitys.universitySourceId] = newUniversitys
                }

                this.universitysSend.push({
                    "universitySourceId": newUniversitys.universitySourceId,
                    "universitySourceName": newUniversitys.universitySourceName,
                    "universitySourceCountry": newUniversitys.universitySourceCountry,
                    "universitySourceCity": newUniversitys.universitySourceCity,
                    "universitySourceAddress": newUniversitys.universitySourceAddress,
                    "universitySourceImageLink": newUniversitys.universitySourceImageLink,
                    "universitySourceWebsiteLink": newUniversitys.universitySourceWebsiteLink,
                    "universitySourceDisplay": newUniversitys.universitySourceDisplay,
                    "universitySourceCreator": newUniversitys.universitySourceCreator,
                    "universitySourceMoreInfo": newUniversitys.universitySourceMoreInfo,
                    "universitySourceContributors": newUniversitys.universitySourceContributors,
                    "universitySourceLastUpdate": newUniversitys.universitySourceLastUpdate,   
                    "universitySourcerPartner": newUniversitys.universitySourcerPartner, 
                })


                return db.ref().update(up).then(
                    () => {
                        this.$router.replace('/editorview')
                        this.$toast.show(`Thank you for your help in improving our database.`, {position:"bottom-left", duration: 5000, max:3});
                        this.$toast.success(`Your university has been successfully added in "In Progress" list for a validation.`, {position:"top", duration: 5000, max:3});
                        this.updateDisplayUniversity().then(()=>{this.sortingParam("Creation Date Desc.")})    
                        FirebaseLog.methods.logCreateUniversity(name, newUniversitys.universitySourceName)                    
                    }
                )
            },

            editUniversity(index, universityEdit){
                var up = {};
                var newEdit = false;
                
                if((this.universitysSend[index].universitySourceId == universityEdit.universitySourceId) 
                && (this.universitysSend[index].universitySourceDisplay != universityEdit.universitySourceDisplay)) {
                    if (this.universitysSend[index].universitySourceDisplay == "True") {
                        newEdit = true;
                    }
                    this.universitysSend.push(FirebaseLog.methods.newUniversityObject(universityEdit))
                    this.updateDisplayUniversity()
                } else {                    
                    FirebaseLog.methods.fillUniversityObject(this.universitysSend[index], universityEdit)
                }

                this.updateCreators(universityEdit)
                up['/universitysEdited/' + universityEdit.universitySourceId] = universityEdit

                return db.ref().update(up).then(() => {
                        this.$router.replace('/editorview')
                        this.$toast.show(`Thank you for your help in improving our database.`, {position:"bottom-left", duration: 10000, max:3});
                        if (newEdit) {
                            this.$toast.show(`If you wish to continue your modifications it is still accessible but are displayed as "In Progress".`, {position:"top", duration: 10000, max:3});
                            this.updateDisplayUniversity().then(()=>{this.sortingParam("Creation Date Desc.")})      
                        }
                        this.$toast.success(`Your changes have been sent for validation.`, {position:"top", duration: 10000, max:3});
                        FirebaseLog.methods.logEditUniversity(name, universityEdit.universitySourceName)
                    }
                )
            },

            removeUniversity(index){
                if(this.universitysSend[index].universitySourceDisplay == "True") {
                    apps.database().ref('/universitys/' + this.universitysSend[index].universitySourceId).set(null)
                    apps.database().ref('/universitysEdited/' + this.universitysSend[index].universitySourceId).set(null)
                    FirebaseLog.methods.logDeleteUniversity(name, this.universitysSend[index].universitySourceName)
                } else {
                    apps.database().ref('/universitysEdited/' + this.universitysSend[index].universitySourceId).set(null)
                    FirebaseLog.methods.logDeleteUniversity(name, this.universitysSend[index].universitySourceName)
                }
                this.$toast.error(this.universitysSend[index].universitySourceName + ` has been removed.`, {position:"top", duration: 10000, max:3});
                this.universitysSend.splice(index,1)
            },

            //Partner function
            addNewUniversityPartner(universityEdit){

                var up = {};
                var universityNotCurrentEdit = true
                universityEdit.universitySourceLastUpdate =  new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)

                this.universitysSend.forEach(function(element){
                    //Si l'universités est déjà en cours d'édition fusionne sa liste de partenaire avec le nouveau partenaire
                    if(element.universitySourceName == universityEdit.universitySourceName && element.universitySourceDisplay == "False") {

                        var tmpPartner = []

                        universityEdit.universitySourcerPartner.forEach(function(element2){
                            tmpPartner.push(FirebaseLog.methods.newPartnerObject(element2))
                        })
                        
                        if(element.universitySourcerPartner != undefined) {
                            element.universitySourcerPartner.forEach(function(element2){
                                tmpPartner.push(FirebaseLog.methods.newPartnerObject(element2))
                            })
                        }
                            
                        //Récupère la liste des partenaires de l'université en cours et le nouveau partenaire vérifie qu'il n'y ait pas de doublon pour les supprimés
                        var dataArr = tmpPartner.map(item=>{
                            return [item.universityPartnerName,item]
                        }); //creates array of array
                        var maparr = new Map(dataArr); //create key value pair from array of array
                        var result = [...maparr.values()]; //converting back to array from mapobject
                        
                        //Reset les partenaires pour remplacer par la nouvelle liste avec le nouveau partenaire
                        element.universitySourcerPartner = result
                        universityNotCurrentEdit = false
                    }
                })

                if(universityNotCurrentEdit) {
                    if(universityEdit.universitySourceDisplay == "True") {
                        universityEdit.universitySourceDisplay = "False"
                        this.universitysSend.push(FirebaseLog.methods.newUniversityObject(universityEdit))
                    }
                }

                this.updateCreators(universityEdit)
                up['/universitysEdited/' + universityEdit.universitySourceId] = universityEdit

                this.sortingParam("Creation Date Desc.")

                return db.ref().update(up).then(() => {
                        this.$router.replace('/editorview')
                        this.$toast.show(`Thank you for your help in improving our database.`, {position:"bottom-left", duration: 10000, max:3});
                        this.$toast.success(`Your university partner has been successfully added in "In Progress" list for a validation.`, {position:"top", duration: 10000, max:3});
                        FirebaseLog.methods.logCreatePartner(name, universityEdit.universitySourceName)
                    }
                )
            },

            editUniversityPartner(universityEdited, newPartnerVersion){
                var up = {}
                var indexIntoOfficialList = ""

                for (let b = 0; b < this.universitysSend.length; b++) {
                    if (this.universitysSend[b].universitySourceName == universityEdited.universitySourceName
                    && this.universitysSend[b].universitySourceCountry == universityEdited.universitySourceCountry
                    && this.universitysSend[b].universitySourceCity == universityEdited.universitySourceCity
                    && this.universitysSend[b].universitySourceDisplay == universityEdited.universitySourceDisplay) {
                        indexIntoOfficialList = b
                    }
                }

                //UniversitySourceDisplay statut is in progress
                if(universityEdited.universitySourceDisplay == "False") {
                    for (let m = 0; m < universityEdited.universitySourcerPartner.length; m++) {
                        if (universityEdited.universitySourcerPartner[m].universityPartnerCountry == newPartnerVersion.universityPartnerCountry 
                        && universityEdited.universitySourcerPartner[m].universityPartnerCity == newPartnerVersion.universityPartnerCity 
                        && universityEdited.universitySourcerPartner[m].universityPartnerLastUpdate == newPartnerVersion.universityPartnerLastUpdate){
                            universityEdited.universitySourcerPartner[m] = JSON.parse(JSON.stringify(newPartnerVersion))
                        }
                    }

                    universityEdited.universitySourceLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)
                    this.universitysSend[indexIntoOfficialList].universitySourcerPartner = JSON.parse(JSON.stringify(universityEdited.universitySourcerPartner))
                    up['/universitysEdited/' + universityEdited.universitySourceId] = universityEdited
                    this.updateCreators(universityEdited)
                } 
                //UniversitySourceDisplay statut is online
                else {
                    var tmpUEdit = JSON.parse(JSON.stringify(universityEdited))
                    tmpUEdit.universitySourceLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)

                    for (let m = 0; m < tmpUEdit.universitySourcerPartner.length; m++) {
                        if (tmpUEdit.universitySourcerPartner[m].universityPartnerCountry == newPartnerVersion.universityPartnerCountry 
                        && tmpUEdit.universitySourcerPartner[m].universityPartnerCity == newPartnerVersion.universityPartnerCity 
                        && tmpUEdit.universitySourcerPartner[m].universityPartnerLastUpdate == newPartnerVersion.universityPartnerLastUpdate){
                            tmpUEdit.universitySourcerPartner[m] = JSON.parse(JSON.stringify(newPartnerVersion))
                        }
                    }

                    tmpUEdit.universitySourceDisplay = "False"
                    this.universitysSend.push(tmpUEdit)
                    up['/universitysEdited/' + tmpUEdit.universitySourceId] = JSON.parse(JSON.stringify(tmpUEdit))
                    this.updateCreators(tmpUEdit)
                }

                this.sortingParam("Creation Date Desc.")

                return db.ref().update(up).then(() => {
                        this.$router.replace('/editorview')
                        this.$toast.show(`Thank you for your help in improving our database.`, {position:"bottom-left", duration: 10000, max:3});
                        this.$toast.success(`Your changes have been sent for validation.`, {position:"top", duration: 10000, max:3});
                        FirebaseLog.methods.logEditPartner(name, newPartnerVersion.universityPartnerName)
                    }
                )
            },

            removeUniversityPartner(universityEdit, partnerToRemove){
                var up = {}
                
                //University display statut is in progress
                if(universityEdit.universitySourceDisplay == "False") {
                    for (let m = 0; m < universityEdit.universitySourcerPartner.length; m++) {
                        if (universityEdit.universitySourcerPartner[m].universityPartnerName == partnerToRemove.universityPartnerName){
                            universityEdit.universitySourcerPartner.splice(m, 1)
                        }
                    }

                    universityEdit.universitySourceLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)

                    up['/universitysEdited/' + universityEdit.universitySourceId] = universityEdit
                } 
                //University display statut is online
                else {
                    var tmpUEdit = JSON.parse(JSON.stringify(universityEdit))
                    tmpUEdit.universitySourceLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)

                    for (let m = 0; m < tmpUEdit.universitySourcerPartner.length; m++) {
                        if (tmpUEdit.universitySourcerPartner[m].universityPartnerName == partnerToRemove.universityPartnerName){
                            tmpUEdit.universitySourcerPartner.splice(m, 1)
                        }
                    }

                    tmpUEdit.universitySourceDisplay = "False"
                    this.universitysSend.push(tmpUEdit)
                    up['/universitysEdited/' + tmpUEdit.universitySourceId] = JSON.parse(JSON.stringify(tmpUEdit))
                    
                }

                this.sortingParam("Creation Date Desc.")

                return db.ref().update(up).then(() => {
                    this.$router.replace('/editorview')
                    this.$toast.error(`The partner has been successfully deleted`, {position:"top", duration: 10000, max:3});
                    FirebaseLog.methods.logDeletePartner(name, universityEdit.universitySourceName, partnerToRemove.universityPartnerName)
                })
            },
        
            updateCreators(universityEdit) {
                var newEditor = true

                universityEdit.universitySourceContributors.forEach(el => {
                    if(el.contributorSourceName == name) {
                        el.contributorSourceEditNumber = el.contributorSourceEditNumber + 1
                        newEditor = false
                    }
                })
                
                if(newEditor) {
                    universityEdit.universitySourceContributors.push({
                        "contributorSourceName": name,
                        "contributorSourceEditNumber": 1
                    })
                }

            },
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