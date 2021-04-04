<template>
    <div class="mt-1 md:mt-12 mx-auto flex justify-center items-center w-full h-full">

        <div class="grid grid-cols-1 w-full">
            <input class="tracking-wide hidden mx-64 py-2 px-4 leading-relaxed appearance-none bg-gray-200 rounded focus:outline-none focus:border-white focus:border-4 text-gray-900" 
                type="text" v-model="search" placeholder="Find an University.."/>
            <!-- Filter City/Destination/Speciality -->
            <div class="my-5 flex justify-center flex-col ms:flex-row text-gray-900">
                <div class="ms:pl-1 flex">
                    <Multiselect
                        class="md:w-48 bg-gray-200 text-black"
                        mode="single"
                        :searchable="true"
                        placeholder="From All Cities"
                        v-model="CityFilter"
                        :options="option.cityStartOption"/>
                    <button @click="resetCity" class="px-1 rounded-none" :class="(CityFilter === '' || CityFilter === null || CityFilter === undefined) ? 'bg-gray-200 border border-gray-200 invisible' : 'bg-red-700 border border-red-700 visible text-white'">X</button>
                </div>
                <div class="ms:pl-1 flex">
                    <Multiselect
                        class="md:w-48 bg-gray-200 text-black"
                        mode="single"
                        :searchable="true"
                        placeholder="To All Destinations"
                        v-model="DestinationFilter"
                        :options="option.countryOption"/>
                    <button @click="resetDestination" class="px-1 rounded-none" :class="(DestinationFilter === '' || DestinationFilter === null || DestinationFilter === undefined) ? 'bg-gray-200 border border-gray-200 invisible' : 'bg-red-700 border border-red-700 visible text-white'">X</button>
                </div>
                <div class="ms:pl-1 flex">
                    <Multiselect
                        class="md:w-48 bg-gray-200 text-black"
                        mode="single"
                        :searchable="true"
                        placeholder="For All Majors"
                        v-model="SpecialityFilter"
                        :options="option.specialityOption"/>
                    <button @click="resetSpeciality" class="px-1 rounded-none" :class="(SpecialityFilter === '' || SpecialityFilter === null || SpecialityFilter === undefined) ? 'bg-gray-200 border border-gray-200 invisible' : 'bg-red-700 border border-red-700 visible text-white'">X</button>
                </div>
                <div class="ms:pl-1 flex">
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
                <button @click="searchByFilter" class="mx-auto px-10 ms:px-20 md:px-10 py-2 border rounded-md bg-red-800 text-white">Search</button>
                <button @click="resetFilter" class="mt-2 mx-auto focus:border-transparent">Reset Filter</button>
            </div>
            <div class="px-8 md:px-10 lg:px-20 2xl:px-32 py-2 mb-5 w-full place-items-center">
                <p class="font-semibold">Sort By : </p>
                <button @click="sortingParam(value)" :class="[ (actualSorting == value) ? 'font-semibold bg-red-500' : 'bg-blue-500' ]" class="text-white rounded py-1 px-3 mr-2 mt-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" v-for="(value, index) in this.sortBy" v-bind:key="index">{{value}}</button>
            </div>

            <!-- University Card -->
            <transition-group name="slide-fade">
                <div v-if="visible && userConnected" class="p-8 md:p-10 lg:px-20 2xl:px-32 grid gap-4 grid-cols-1 ms:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <button @click="createUniversity" class="bg-gray-200 opacity-60 hover:opacity-100 Card rounded-lg overflow-hidden shadow-2xl relative h-60 flex justify-center items-center">
                        <img class="h-full w-full object-cover object-center" v-lazy="imgTmp" alt="">
                        <img class="h-14 w-14 absolute" v-lazy="imgTmp2" alt="">
                        <p class="absolute w-full bg-gray-200 bg-opacity-80 p-5 bottom-0 block text-black font-semibold text-lg">
                            Add New University
                        </p>
                    </button>
                    <card
                        v-for="(universitySource, index) in filteredList.slice(0,minElement)"
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
                @removePartner="function(a){removeUniversityPartner(universityObject, a)}">
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
    
    import MethodsGeneral from '../../Mixins/firebase'

    export default {
        name: "Basic",
        mixins:[MethodsGeneral],

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
                search: '',

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

                universityObject: {},
            }
        },

        async beforeCreate(){
            await apps.auth().onAuthStateChanged((user) => {
                if(user != undefined) {
                    db.ref('users/' + user.uid).once('value').then((snapshot) => {
                        this.userConnected = true
                    })
                } else {
                    this.$toast.error(`You are not authorized to access this page. Please login to access it.`, {position:"top", duration: 10000, max:3});
                    this.$router.replace('/')
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
                        getUniversityDatabase.push(MethodsGeneral.methods.newUniversityObject(element.val()))
                    }
                })
            })

            await db.ref("universitysEdited").once("value", function(snapshot){
                snapshot.forEach(function(el){
                    el.forEach(function(element){
                        if(element.val().universitySourceName != undefined) {
                            getUniversityDatabase.push(MethodsGeneral.methods.newUniversityObject(element.val()))
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
        
        computed: {
            filteredList() {
                return this.universitysSend.filter(university => {
                    return university.universitySourceName.toLowerCase().includes(this.search.toLowerCase())
                })
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
                        getUniversityDatabase.push(MethodsGeneral.methods.newUniversityObject(element.val()))
                    })
                })

                await db.ref("universitysEdited").once("value", function(snapshot){
                    snapshot.forEach(function(el){
                        el.forEach(function(element){
                            getUniversityDatabase.push(MethodsGeneral.methods.newUniversityObject(element.val()))
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
                        MethodsGeneral.methods.copyUniversityObject(this.universityObject, this.universitys[i])
                    }
                }
            },

            getuniqueUniversityNameCard (index) {
                MethodsGeneral.methods.copyUniversityObject(this.universityObject, this.universitysSend[index])
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
            removeUniversity(index){
                MethodsGeneral.methods.removeUniversityToFirebase(this.universitysSend[index])
                this.universitysSend.splice(index,1)
                this.$toast.error(this.universitysSend[index].universitySourceName + ` has been removed.`, {position:"top", duration: 10000, max:3});
            },

            //Partner function
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

                    up['/universitysEdited/' + universityEdit.universitySourceId + '/' + universityEdit.universitySourceCreator] = universityEdit
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
                    up['/universitysEdited/' + tmpUEdit.universitySourceId + '/' + universityEdit.universitySourceCreator] = tmpUEdit
                    
                }

                return db.ref().update(up).then(() => {
                    this.$router.replace('/editorview')
                    this.$toast.error(`The partner has been successfully deleted`, {position:"top", duration: 10000, max:3});
                    MethodsGeneral.methods.logDeletePartner(name, universityEdit.universitySourceName, partnerToRemove.universityPartnerName)
                })
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