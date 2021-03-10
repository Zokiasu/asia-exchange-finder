<template>
    <div class="mt-1 md:mt-12 mx-auto flex justify-center items-center w-full h-full">

        <div class="grid grid-cols-1 w-full">
            <!-- Filter City/Destination/Speciality -->
            <div class="container flex justify-center flex-col ms:flex-row text-gray-900">
                <div class="pt-6 ms:pl-6">
                    <Multiselect
                        class="md:w-48 bg-white rounded text-black"
                        mode="single"
                        :clearOnSearch="false"
                        :clearOnSelect="false"
                        :searchable="true"
                        placeholder="From All Cities"
                        v-model="CityFilter"
                        :options="option.cityStartOption"/>
                </div>
                <div class="pt-6 ms:pl-6">
                    <Multiselect
                        class="md:w-48 bg-white rounded text-black"
                        mode="single"
                        :searchable="true"
                        placeholder="To All Destinations"
                        v-model="DestinationFilter"
                        :options="option.countryOption"/>
                </div>
                <div class="pt-6 ms:pl-6">
                    <Multiselect
                        class="md:w-48 bg-white rounded text-black"
                        mode="single"
                        :searchable="true"
                        placeholder="For All Specialities"
                        v-model="SpecialityFilter"
                        :options="option.specialityOption"/>
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
                    <button @click="setCreateUniversity" class="bg-white opacity-60 hover:opacity-100 Card rounded-lg overflow-hidden shadow-2xl relative h-full flex justify-center items-center">
                        <img class="h-full w-full object-cover object-center" v-lazy="imgTmp" alt="">
                        <img class="h-14 w-14 absolute" v-lazy="imgTmp2" alt="">
                        <p class="absolute w-full bg-white bg-opacity-80 p-5 bottom-0 block text-black font-semibold text-lg">
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
                            <p class="text-xl lg:text-2xl text-white text-center">If you know of a university corresponding the chosen conditions, add it to our database by logging on to our site and consulting the <router-link class="text-blue-300" to="/editorview">Editor View</router-link> page.</p>
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
    <AddUSoucePopup
        @close="setCreateUniversity" 
        @addNewUniversity="addNewUniversity"
        :listOfSpeciality="listOfSpeciality"
        v-if="addUniversitySourcePopUp" 
        class="mx-auto flex flex-col mt-auto">
    </AddUSoucePopup>
</template>

<script>
    import db from '../main.js'
    import {apps, name, grade} from '../main.js'
    import imgs from '../assets/plus-symbol.png'

    import $ from 'jQuery'
    import Multiselect from '@vueform/multiselect'
    import BackToTop from 'vue-backtotop'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    import Card from '../components/EditorViewComponent/CardEditor.vue'
    import NavbarEditor from '../components/EditorViewComponent/NavbarEditor.vue'
    import AddUSoucePopup from '../components/EditorViewComponent/CreateUniversityPopUp.vue'    

    export default {
        name: "Basic",

        components:{
            Card,
            NavbarEditor,
            PulseLoader,
            Multiselect,
            BackToTop,
            AddUSoucePopup,
        },

        data () {
            return {
                imgTmp: 'https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80',
                imgTmp2: imgs,

                modelCity:'',
                modelDestination:'',
                modelSpeciality:'',
                CityFilter:'',
                DestinationFilter:'',
                SpecialityFilter:'',

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
                    universitySourceId: '',
                    universitySourceName: '',
                    universitySourceCountry: '',
                    universitySourceCity: '',
                    universitySourceAddress: '',
                    universitySourceImageLink: '',
                    universitySourceWebsiteLink: '',
                    universitySourceDisplay: '',
                    universitySourceCreator: '',
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

            var testuni = this.universitys
            var specialityPartener = []

            await db.ref("universitys").once("value", function(snapshot){
                snapshot.forEach(function(element){
                    testuni.push(element.val())
                })
            })

            await db.ref("universitysEdited").once("value", function(snapshot){
                snapshot.forEach(function(element){
                    testuni.push(element.val())
                })
            })

            testuni.forEach(el => {
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
            this.universitysSend = testuni
            this.universitysSend.splice(0,1)
            
            this.universitysSend.sort(function(a,b){
                if(a.universitySourceName.toLowerCase() < b.universitySourceName.toLowerCase()) {return -1;}
                if(a.universitySourceName.toLowerCase() > b.universitySourceName.toLowerCase()) {return 1;}
                return 0;
            })

            if(this.universitysSend.length > 0){
                this.visible = !this.visible;
                this.init();
            }
        },

        methods: {

            setCreateUniversity: function() {
                this.addUniversitySourcePopUp = !this.addUniversitySourcePopUp
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
                this.universityObject.universitySourceLastUpdate = this.universitysSend[index].universitySourceLastUpdate,
                this.universityObject.universitySourcerPartner = this.universitysSend[index].universitySourcerPartner
                this.$refs.navbarComponent.drawer();
            },

            resetFilter(){
                this.CityFilter = undefined
                this.DestinationFilter = undefined
                this.SpecialityFilter = undefined
                this.searchByFilter()
            },

            searchByFilter() {
                this.modelCity = this.option.cityStartOption[this.CityFilter]
                this.modelDestination = this.option.countryOption[this.DestinationFilter]
                this.modelSpeciality = this.option.specialityOption[this.SpecialityFilter]

                this.universitysSend = this.universitys.filter(
                    (el) => {
                        if(this.modelCity == "" || this.modelCity == null || this.modelCity == undefined) {
                            return (this.booleanByCountry(el.universitySourcerPartner))
                        } else {
                            return (el.universitySourceCity.toLowerCase() == this.modelCity.toLowerCase() && this.booleanByCountry(el.universitySourcerPartner))
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

            addNewUniversity(newUniversitys){
                var testA = "";
                var up = {};
                
                if(newUniversitys.universitySourceId == "" || newUniversitys.universitySourceId == undefined) {
                    testA = db.ref().child('universitys').push().key;
                    newUniversitys.universitySourceId = testA;
                    up['/universitysEdited/' + testA] = newUniversitys
                    
                } else {
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
                    "universitySourceLastUpdate": newUniversitys.universitySourceLastUpdate,   
                    "universitySourcerPartner": newUniversitys.universitySourcerPartner, 
                })

                this.sortingParam("Creation Date Desc.")

                return db.ref().update(up).then(
                    () => {
                        this.$router.replace('/editorview')
                        this.$toast.show(`Thank you for your help in improving our database.`, {position:"bottom-left", max:3});
                        this.$toast.success(`Your university has been successfully added in "In Progress" list for a validation.`, {position:"top", max:3});
                        setTimeout(this.$toast.clear, 10000)
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
                    this.universitysSend.push({
                        "universitySourceId": universityEdit.universitySourceId,
                        "universitySourceName": universityEdit.universitySourceName,
                        "universitySourceCountry": universityEdit.universitySourceCountry,
                        "universitySourceCity": universityEdit.universitySourceCity,
                        "universitySourceAddress": universityEdit.universitySourceAddress,
                        "universitySourceImageLink": universityEdit.universitySourceImageLink,
                        "universitySourceWebsiteLink": universityEdit.universitySourceWebsiteLink,
                        "universitySourceDisplay": universityEdit.universitySourceDisplay,
                        "universitySourceCreator": universityEdit.universitySourceCreator,
                        "universitySourceLastUpdate": universityEdit.universitySourceLastUpdate,   
                        "universitySourcerPartner": universityEdit.universitySourcerPartner, 
                    })
                } else {
                    this.universitysSend[index].universitySourceId = universityEdit.universitySourceId,
                    this.universitysSend[index].universitySourceName = universityEdit.universitySourceName,
                    this.universitysSend[index].universitySourceCountry = universityEdit.universitySourceCountry,
                    this.universitysSend[index].universitySourceCity = universityEdit.universitySourceCity,
                    this.universitysSend[index].universitySourceAddress = universityEdit.universitySourceAddress,
                    this.universitysSend[index].universitySourceImageLink = universityEdit.universitySourceImageLink,
                    this.universitysSend[index].universitySourceWebsiteLink = universityEdit.universitySourceWebsiteLink,
                    this.universitysSend[index].universitySourceDisplay = universityEdit.universitySourceDisplay,
                    this.universitysSend[index].universitySourceCreator = universityEdit.universitySourceCreator,
                    this.universitysSend[index].universitySourceLastUpdate = universityEdit.universitySourceLastUpdate,
                    this.universitysSend[index].universitySourcerPartner = universityEdit.universitySourcerPartner
                }

                this.sortingParam("Creation Date Desc.")
                up['/universitysEdited/' + this.universitysSend[index].universitySourceId] = universityEdit

                return db.ref().update(up).then(
                    () => {
                        this.$router.replace('/editorview')
                        this.$toast.show(`Thank you for your help in improving our database.`, {position:"bottom-left", max:3});
                        if (newEdit) {
                            this.$toast.show(`If you wish to continue your modifications it is still accessible but are displayed as "In Progress".`, {position:"top", max:3});
                        }
                        this.$toast.success(`Your changes have been sent for validation.`, {position:"top", max:3});
                        setTimeout(this.$toast.clear, 10000)
                    }
                )
            },

            removeUniversity(index){
                if(this.universitysSend[index].universitySourceDisplay == "True") {
                    apps.database().ref('/universitys/' + this.universitysSend[index].universitySourceId).set(null)
                    apps.database().ref('/universityHistory/' + this.universitysSend[index].universitySourceId).set(null)
                    apps.database().ref('/universitysEdited/' + this.universitysSend[index].universitySourceId).set(null)
                } else {
                    apps.database().ref('/universitysEdited/' + this.universitysSend[index].universitySourceId).set(null)
                }
                this.$toast.error(this.universitysSend[index].universitySourceName + ` has been removed.`, {position:"top", max:3});
                setTimeout(this.$toast.clear, 10000)
                this.universitysSend.splice(index,1)
            },

            addNewUniversityPartner(universityEdit){

                var up = {};
                var universityNotCurrentEdit = true
                universityEdit.universitySourceLastUpdate =  new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)

                this.universitysSend.forEach(function(element){
                    //Si l'universités est déjà en cours d'édition fusionne sa liste de partenaire avec le nouveau partenaire
                    if(element.universitySourceName == universityEdit.universitySourceName && element.universitySourceDisplay == "False") {

                        var tmpPartner = []

                        universityEdit.universitySourcerPartner.forEach(function(element2){
                            tmpPartner.push({
                                "universityPartnerName": element2.universityPartnerName,
                                "universitySourceId": element2.universitySourceId,
                                "universityPartnerCountry": element2.universityPartnerCountry,
                                "universityPartnerCity": element2.universityPartnerCity,
                                "universityPartnerAddress": element2.universityPartnerAddress,
                                "universityPartnerWebsiteLink": element2.universityPartnerWebsiteLink,
                                "universityPartnerCondition": element2.universityPartnerCondition,
                                "universityPartnerDisplay": element2.universityPartnerDisplay,
                                "universityPartnerCreator": element2.universityPartnerCreator,
                                "universityPartnerLastUpdate": element2.universityPartnerLastUpdate,  
                                "universityPartnerSpeciality": element2.universityPartnerSpeciality,
                            })
                        })
                        
                        if(element.universitySourcerPartner != undefined) {
                            element.universitySourcerPartner.forEach(function(element2){
                                tmpPartner.push({
                                    "universityPartnerName": element2.universityPartnerName,
                                    "universitySourceId": element2.universitySourceId,
                                    "universityPartnerCountry": element2.universityPartnerCountry,
                                    "universityPartnerCity": element2.universityPartnerCity,
                                    "universityPartnerAddress": element2.universityPartnerAddress,
                                    "universityPartnerWebsiteLink": element2.universityPartnerWebsiteLink,
                                    "universityPartnerCondition": element2.universityPartnerCondition,
                                    "universityPartnerDisplay": element2.universityPartnerDisplay,
                                    "universityPartnerCreator": element2.universityPartnerCreator,
                                    "universityPartnerLastUpdate": element2.universityPartnerLastUpdate,  
                                    "universityPartnerSpeciality": element2.universityPartnerSpeciality,
                                })
                            })
                        }

                        var dataArr = tmpPartner.map(item=>{
                            return [item.universityPartnerName,item]
                        }); // creates array of array
                        var maparr = new Map(dataArr); // create key value pair from array of array

                        var result = [...maparr.values()];//converting back to array from mapobject

                        element.universitySourcerPartner = result
                        universityNotCurrentEdit = false
                    }
                })

                if(universityNotCurrentEdit) {
                    if(universityEdit.universitySourceDisplay == "True") {
                        universityEdit.universitySourceDisplay = "False"
                        this.universitysSend.push({
                            "universityPartnerName": universityEdit.universityPartnerName,
                            "universitySourceId": universityEdit.universitySourceId,
                            "universityPartnerCountry": universityEdit.universityPartnerCountry,
                            "universityPartnerCity": universityEdit.universityPartnerCity,
                            "universityPartnerAddress": universityEdit.universityPartnerAddress,
                            "universityPartnerWebsiteLink": universityEdit.universityPartnerWebsiteLink,
                            "universityPartnerCondition": universityEdit.universityPartnerCondition,
                            "universityPartnerDisplay": universityEdit.universityPartnerDisplay,
                            "universityPartnerCreator": universityEdit.universityPartnerCreator,
                            "universityPartnerLastUpdate": universityEdit.universityPartnerLastUpdate,  
                            "universityPartnerSpeciality": universityEdit.universityPartnerSpeciality,
                        })
                    }
                }
                
                up['/universitysEdited/' + universityEdit.universitySourceId] = universityEdit

                this.sortingParam("Creation Date Desc.")

                return db.ref().update(up).then(
                    () => {
                        this.$router.replace('/editorview')
                        this.$toast.show(`Thank you for your help in improving our database.`, {position:"bottom-left", duration: 10000, max:3});
                        this.$toast.success(`Your university partner has been successfully added in "In Progress" list for a validation.`, {position:"top", duration: 10000, max:3});
                    }
                )
            },

            editUniversityPartner(universityEdit, newPartnerVersion){
                var up = {}

                if(universityEdit.universitySourceDisplay == "False") { //University display statut is in progress
                    for (let m = 0; m < universityEdit.universitySourcerPartner.length; m++) {
                        if (universityEdit.universitySourcerPartner[m].universityPartnerCountry == newPartnerVersion.universityPartnerCountry 
                        && universityEdit.universitySourcerPartner[m].universityPartnerCity == newPartnerVersion.universityPartnerCity 
                        && universityEdit.universitySourcerPartner[m].universityPartnerLastUpdate == newPartnerVersion.universityPartnerLastUpdate){
                            universityEdit.universitySourcerPartner[m] = JSON.parse(JSON.stringify(newPartnerVersion))
                        }
                    }

                    universityEdit.universitySourceLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)

                    up['/universitysEdited/' + universityEdit.universitySourceId] = universityEdit
                } else {//University display statut is online
                    var tmpUEdit = JSON.parse(JSON.stringify(universityEdit))
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
                }

                this.sortingParam("Creation Date Desc.")

                return db.ref().update(up).then(
                    () => {
                        this.$router.replace('/editorview')
                        this.$toast.show(`Thank you for your help in improving our database.`, {position:"bottom-left", max:3});
                        this.$toast.success(`Your changes have been sent for validation.`, {position:"top", max:3});
                        setTimeout(this.$toast.clear, 10000)
                    }
                )
            },

            removeUniversityPartner(universityEdit, partnerToRemove){
                var up = {}

                if(universityEdit.universitySourceDisplay == "False") { //University display statut is in progress
                    for (let m = 0; m < universityEdit.universitySourcerPartner.length; m++) {
                        if (universityEdit.universitySourcerPartner[m].universityPartnerName == partnerToRemove.universityPartnerName){
                            universityEdit.universitySourcerPartner.splice(m, 1)
                        }
                    }

                    universityEdit.universitySourceLastUpdate = new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19)

                    up['/universitysEdited/' + universityEdit.universitySourceId] = universityEdit
                } else {//University display statut is online
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
                    this.$toast.error(`The partner has been successfully deleted`, {position:"top", max:3});
                    setTimeout(this.$toast.clear, 10000)
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