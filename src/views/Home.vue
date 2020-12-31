<template>

  <div class="bg-black bg-opacity-30 h-auto text-white absolute inset-x-0 top-0 flex flex-col">

      <h1 class="font-bold text-center mt-20 ms:mt-24 text-4xl ms:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Asia Exchange Finder</h1>

      <div class="mt-1 md:mt-12 mx-auto flex justify-center items-center w-full">

          <div class=" grid grid-cols-1 w-full">

              <!--<div class="container flex mt-20">
                  <input type="text" class="text-gray-700 dark:text-white rounded border shadow-inner py-2 px-3 w-full" placeholder="Pays, Ville, Domaine,..." >
              </div>-->

              <div class="container flex justify-center flex-col ms:flex-row text-gray-900">
                  <div class="pt-6 ms:pl-6">
                      <select v-model="modelV" class="border w-full p-2 rounded">
                          <option value="">Toute ville</option>
                          <option v-for="(city, index) in option.cityStartOption" :key="index">{{city}}</option>
                      </select>
                  </div>
                  <div class="pt-6 ms:pl-6">
                      <select v-model="modelD" class="border w-full p-2 rounded">
                          <option value="">Toute destination</option>
                          <option v-for="(destination, index) in option.countryOption" :key="index">{{destination}}</option>
                      </select>
                  </div>
                  <div class="pt-6 ms:pl-6">
                      <select v-model="modelS" class="border w-full p-2 rounded">
                          <option value="">Toute spécialité</option>
                          <option v-for="(speciality, index) in option.specialityOption" :key="index">{{speciality}}</option>
                      </select>
                  </div>
              </div>

              <!--<a class="mt-6 container flex justify-center" @click="test" v-if="visible">Moins de filtres</a>
              <a class="mt-6 container flex justify-center" @click="test" v-else>Plus de filtres</a>-->

              <div class="container flex justify-center">
                  <button @click="searchByFilter" class="mt-6 px-10 ms:px-20 md:px-10 py-2 border rounded-md bg-red-800 text-white">Search</button>
              </div>
                                
              <div class="my-10 p-8 md:p-10 lg:px-20 2xl:px-32 grid gap-4 grid-cols-1 ms:grid-cols-2 lg:grid-cols-3">
                  <card
                      v-for="university in this.universitysSend"
                      :key="university.universitySourceName"
                      :university="university"
                      @onClick = "getuniqueUniversityNameCard"
                      @created="init">
                  </card>
              </div>

              <div v-if="show" class="container mb-96 flex justify-center bg-black opacity-85 rounded-xl">
                  <transition name="fade">
                      <p v-if="show" class="py-2 text-lg lg:text-3xl text-white">Sélection Inexistante</p>
                  </transition>
              </div>

              <navbar ref="navbarComponent" :university="universityObject"></navbar>
              
          </div>

      </div>

  </div>
  
</template>

<script>
    import $ from 'jQuery'
    import Card from '../components/Card.vue'
    import Navbar from '../components/navbar.vue'
    import firebase from 'firebase'
    import db from '../main.js'

    export default {

        components:{
            Card,
            Navbar
        },

        data () {
            return {
                modelV:'',
                modelD:'',
                modelS:'',
                show: false,

                option: {
                    cityStartOption: [],
                    countryOption: [],
                    specialityOption: [],
                },

                universitysSend: [],

                universitys: [
                    {
                        universitySourceName: 'Université de Paris 1',
                        universitySourceCountry: 'France',
                        universitySourceCity: 'Paris',
                        universitySourceImageLink: 'https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80',
                        universitySourceWebsiteLink: 'https://www.google.com/',
                        universitySourcerPartner: [
                            {
                                universityPartnerName: 'University Hello 1',
                                universityPartnerCountry: 'Japon',
                                universityPartnerCity: 'Tokyo',
                                universityPartnerSpeciality: ['Politique', 'Droit', 'Informatique'],
                                universityPartnerCondition: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper bibendum posuere. Sed sit amet laoreet ligula. Suspendisse potenti. In hac habitasse platea dictumst. Maecenas mattis tortor lacus, at laoreet dolor laoreet nec. Vestibulum nec porta massa, sed volutpat ligula. Suspendisse porttitor augue ut mauris tristique accumsan. Etiam tempor eu nisl tincidunt tristique. Sed nec tristique mauris. Donec et nibh non diam lobortis dictum sed a metus. Mauris iaculis at risus id sagittis. Quisque a ultrices dolor. Cras faucibus feugiat felis, id mollis ante vehicula et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia consequat ex quis elementum. Fusce nec ex id nisl semper vestibulum ut quis tortor.',
                                universityPartnerWebsiteLink: 'https://www.google.com/'
                            },
                        ]
                    }
                ],

                universityObject: {
                    universitySourceName: '',
                    universitySourceCountry: '',
                    universitySourceCity: '',
                    universitySourceImageLink: '',
                    universitySourceWebsiteLink: '',
                    universitySourcerPartner: []
                },

                visible: false
            }
        },

        created(){
            var testuni = this.universitys

            let testS = db.ref("universitys")
            testS.once("value", function(snapshot){
                snapshot.forEach(function(element){
                    testuni.push(element.val())
                })
            })
            
            this.universitysSend = testuni
            this.universitysSend.splice(0,1)
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
                        this.universityObject.universitySourceImageLink = this.universitys[i].universitySourceImageLink,
                        this.universityObject.universitySourceWebsiteLink = this.universitys[i].universitySourceWebsiteLink,
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

            test: function() {
                this.visible = !this.visible
            }
        },
    }
</script>

<style>

    .show-enter-active,
    .show-leave-enter {
        transform: translateX(0);
        transition: all 1s linear;
    }
    .show-enter,
    .show-leave-to {
        transform: translateX(100%);
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

</style>