<template>
    <div class="space-x-2 mr-3 ms:mr-10 mt-6">
      <button @click="setVisibleSignUp" class="bg-red-500 shadow-lg rounded-sm px-3 py-1 font-bold text-xs ms:text-md Button">Test</button>
    </div>
</template>

<script>
    import db from '../main.js'
    import {apps, name, grade} from '../main.js'
    import imgs from '../assets/plus-symbol.png'

    import $ from 'jQuery'
    import Multiselect from '@vueform/multiselect'
    import BackToTop from 'vue-backtotop'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    import Card from '../components/EditorViewComponent/UniversityCardEditor.vue'
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
                        "universitySourceMoreInfo": "",
                        "universitySourceContributors": [
                            {
                                "contributorSourceName": name,
                                "contributorSourceEditNumber": 1
                            }
                        ],
                        "universitySourceLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),   
                        "universitySourcerPartner": [
                            {
                                "universityPartnerName": "University Partner",
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
                        if(snapshot.val().grade != "Admin") {
                            this.$toast.error(`You are not authorized to access the test page.`, {position:"top", max:3});
                            setTimeout(this.$toast.clear, 10000)
                            this.$router.replace('/')
                        }
                    })
                } else {
                    this.$toast.error(`You are not authorized to access the test page.`, {position:"top", max:3});
                    setTimeout(this.$toast.clear, 10000)
                    this.$router.replace('/')
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

            setVisibleSignUp: function() {
                var up = {};
                this.universitys.forEach(el => {
                    if(el.universitySourcerPartner){
                        el.universitySourcerPartner.forEach(el2 => {
                            if(el2.universityPartnerCreator == "Zokiasu") {
                                el2.universityPartnerCreator = "Studeler"
                            }
                        })
                    }
                    
                    if(el.universitySourceCreator == "Zokiasu") {
                        el.universitySourceCreator = "Studeler"
                    }
                    console.log(el)
                    up['/universitys/' + el.universitySourceId] = el
                    db.ref().update(up)
                })
            },

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
                this.universityObject.universitySourceMoreInfo = this.universitysSend[index].universitySourceMoreInfo,
                this.universityObject.universitySourceContributors = this.universitysSend[index].universitySourceContributors,                
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
                    "universitySourceMoreInfo": newUniversitys.universitySourceMoreInfo,
                    "universitySourceContributors": newUniversitys.universitySourceContributors,
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
                        "universitySourceMoreInfo": universityEdit.universitySourceMoreInfo,
                        "universitySourceContributors": universityEdit.universitySourceContributors,
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
                    this.universitysSend[index].universitySourceMoreInfo = universityEdit.universitySourceMoreInfo,
                    this.universitysSend[index].universitySourceContributors = universityEdit.universitySourceContributors,
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