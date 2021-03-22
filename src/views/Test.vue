<template>
    <div class="space-x-2 mr-3 ms:mr-10 mt-6">
      <button @click="setVisibleSignUp" class="bg-red-500 shadow-lg rounded-sm px-3 py-1 font-bold text-xs ms:text-md Button">Test</button>
      {{modelCity}}
      
    </div>
</template>

<script>
    import db from '../main.js'
    import {name} from '../main.js'
    
    import $ from 'jQuery'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import firebase from 'firebase'
    import Multiselect from '@vueform/multiselect'
    import BackToTop from 'vue-backtotop'
    
    import Card from '../components/HomeComponent/UniversityCard.vue'
    import Navbar from '../components/HomeComponent/navbar.vue'

    export default {
        name: "Basic",

        components:{
            Card,
            Navbar,
            PulseLoader,
            Multiselect,
            BackToTop,
        },

        data () {
            return {
                modelV:'',
                modelD:'',
                modelS:'',
                CityFilter:'',
                DestinationFilter:'',
                SpecialityFilter:'',

                minElement: 12,

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
                                "universityPartnerLastUpdate": new Date().toISOString().slice(0, 10) + ", " + new Date().toISOString().slice(11, 19),  
                                "universityPartnerSpeciality": [],  
                                "universityPartnerCycle": [],
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
        },

        methods: {

            setVisibleSignUp: function() {
                this.universitysSend.forEach(el => {
                    if(el.universitySourcerPartner) {
                        el.universitySourcerPartner.forEach(el2 => {
                            if(el2.universityPartnerSpeciality) {
                                el2.universityPartnerSpeciality.forEach(el3 => {
                                    if(el3 == "Fasion") {
                                        el3 = "Fashion"
                                        console.log(el2)
                                    }
                                })
                            }                  
                        })
                    }
                })
            },

            scroll(){
                window.onscroll = () => {
                    let bottomOfWindow = Math.round(Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight) === Math.round(document.documentElement.offsetHeight) || Math.round(Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight) === (Math.round(document.documentElement.offsetHeight)-1)
                    
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
                        this.universityObject.universitySourceMoreInfo = this.universitys[i].universitySourceMoreInfo,
                        this.universityObject.universitySourceContributors = this.universitys[i].universitySourceContributors,                
                        this.universityObject.universitySourceLastUpdate = this.universitys[i].universitySourceLastUpdate,
                        this.universityObject.universitySourcerPartner = this.universitys[i].universitySourcerPartner
                    }
                }
            },

            resetAllFilter(){
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
                this.modelV = this.option.cityStartOption[this.CityFilter]
                this.modelD = this.option.countryOption[this.DestinationFilter]
                this.modelS = this.option.specialityOption[this.SpecialityFilter]

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

                if(this.modelD != undefined && this.modelS != undefined && consultList) {
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

                if(this.modelD == undefined && this.modelS != undefined && consultList) {
                     consultList.forEach(el => {
                        if(el.universityPartnerSpeciality != undefined) {
                            for (let index = 0; index < el.universityPartnerSpeciality.length; index++) {
                                if(el.universityPartnerSpeciality[index] === this.modelS) {
                                    res = true
                                }
                            }
                        }
                    })
                }
                
                if(this.modelD != undefined && this.modelS == undefined && consultList) {
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
            },
        },
    }
</script>
