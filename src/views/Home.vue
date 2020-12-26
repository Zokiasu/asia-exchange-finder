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
                          <option v-for="(name, index) in cityStartOption" :key="index">{{name}}</option>
                      </select>
                  </div>
                  <div class="pt-6 ms:pl-6">
                      <select v-model="modelD" class="border w-full p-2 rounded">
                          <option value="">Toute destination</option>
                          <option v-for="(name, index) in countryOption" :key="index">{{name}}</option>
                      </select>
                  </div>
                  <div class="pt-6 ms:pl-6">
                      <select v-model="modelS" class="border w-full p-2 rounded">
                          <option value="">Tout spécialité</option>
                          <option v-for="(name, index) in specialityOption" :key="index">{{name}}</option>
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
                      :key="university.name"
                      :university="university"
                      @onClick = "getuniqueUniversityNameCard">
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
                        name: 'Université de Paris 1',
                        pays: 'France',
                        ville: 'Paris',
                        image: 'https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80',
                        partner: [
                            {
                                name: 'University Hello 1',
                                pays: 'Japon',
                                ville: 'Tokyo',
                                specialité: ['politique', 'droit', 'informatique'],
                                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper bibendum posuere. Sed sit amet laoreet ligula. Suspendisse potenti. In hac habitasse platea dictumst. Maecenas mattis tortor lacus, at laoreet dolor laoreet nec. Vestibulum nec porta massa, sed volutpat ligula. Suspendisse porttitor augue ut mauris tristique accumsan. Etiam tempor eu nisl tincidunt tristique. Sed nec tristique mauris. Donec et nibh non diam lobortis dictum sed a metus. Mauris iaculis at risus id sagittis. Quisque a ultrices dolor. Cras faucibus feugiat felis, id mollis ante vehicula et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia consequat ex quis elementum. Fusce nec ex id nisl semper vestibulum ut quis tortor.',
                                website: 'https://www.google.com/'
                            },
                            {
                                name: 'University Kitty 1',
                                pays: 'Japon',
                                ville: 'Kyoto',
                                specialité: ['politique', 'droit', 'informatique'],
                                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper bibendum posuere. Sed sit amet laoreet ligula. Suspendisse potenti. In hac habitasse platea dictumst. Maecenas mattis tortor lacus, at laoreet dolor laoreet nec. Vestibulum nec porta massa, sed volutpat ligula. Suspendisse porttitor augue ut mauris tristique accumsan. Etiam tempor eu nisl tincidunt tristique. Sed nec tristique mauris. Donec et nibh non diam lobortis dictum sed a metus. Mauris iaculis at risus id sagittis. Quisque a ultrices dolor. Cras faucibus feugiat felis, id mollis ante vehicula et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia consequat ex quis elementum. Fusce nec ex id nisl semper vestibulum ut quis tortor.',
                                website: 'https://www.google.com/'
                            },
                            {
                                name: 'University Deins 1',
                                pays: 'Chine',
                                ville: 'Hong Kong',
                                specialité: ['informatique'],
                                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper bibendum posuere. Sed sit amet laoreet ligula. Suspendisse potenti. In hac habitasse platea dictumst. Maecenas mattis tortor lacus, at laoreet dolor laoreet nec. Vestibulum nec porta massa, sed volutpat ligula. Suspendisse porttitor augue ut mauris tristique accumsan. Etiam tempor eu nisl tincidunt tristique. Sed nec tristique mauris. Donec et nibh non diam lobortis dictum sed a metus. Mauris iaculis at risus id sagittis. Quisque a ultrices dolor. Cras faucibus feugiat felis, id mollis ante vehicula et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia consequat ex quis elementum. Fusce nec ex id nisl semper vestibulum ut quis tortor.',
                                website: 'https://www.google.com/'
                            },
                            {
                                name: 'University Hang 1',
                                pays: 'Corée du Sud',
                                ville: 'Séoul',
                                specialité: ['politique'],
                                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper bibendum posuere. Sed sit amet laoreet ligula. Suspendisse potenti. In hac habitasse platea dictumst. Maecenas mattis tortor lacus, at laoreet dolor laoreet nec. Vestibulum nec porta massa, sed volutpat ligula. Suspendisse porttitor augue ut mauris tristique accumsan. Etiam tempor eu nisl tincidunt tristique. Sed nec tristique mauris. Donec et nibh non diam lobortis dictum sed a metus. Mauris iaculis at risus id sagittis. Quisque a ultrices dolor. Cras faucibus feugiat felis, id mollis ante vehicula et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia consequat ex quis elementum. Fusce nec ex id nisl semper vestibulum ut quis tortor.',
                                website: 'https://www.google.com/'
                            },
                            {
                                name: 'University Hang 1',
                                pays: 'Taïwan',
                                ville: 'Taïpei',
                                specialité: ['politique'],
                                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper bibendum posuere. Sed sit amet laoreet ligula. Suspendisse potenti. In hac habitasse platea dictumst. Maecenas mattis tortor lacus, at laoreet dolor laoreet nec. Vestibulum nec porta massa, sed volutpat ligula. Suspendisse porttitor augue ut mauris tristique accumsan. Etiam tempor eu nisl tincidunt tristique. Sed nec tristique mauris. Donec et nibh non diam lobortis dictum sed a metus. Mauris iaculis at risus id sagittis. Quisque a ultrices dolor. Cras faucibus feugiat felis, id mollis ante vehicula et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia consequat ex quis elementum. Fusce nec ex id nisl semper vestibulum ut quis tortor.',
                                website: 'https://www.google.com/'
                            },
                        ]
                    },
                    {
                        name: 'Université de Paris 2',
                        pays: 'France',
                        ville: 'Lyon',
                        image: 'https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80',
                        partner: [
                            {
                                name: 'University Hello 2',
                                pays: 'Japon',
                                ville: 'Tokyo',
                                specialité: ['economie', 'politique', 'droit', 'informatique'],
                                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper bibendum posuere. Sed sit amet laoreet ligula. Suspendisse potenti. In hac habitasse platea dictumst. Maecenas mattis tortor lacus, at laoreet dolor laoreet nec. Vestibulum nec porta massa, sed volutpat ligula. Suspendisse porttitor augue ut mauris tristique accumsan. Etiam tempor eu nisl tincidunt tristique. Sed nec tristique mauris. Donec et nibh non diam lobortis dictum sed a metus. Mauris iaculis at risus id sagittis. Quisque a ultrices dolor. Cras faucibus feugiat felis, id mollis ante vehicula et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia consequat ex quis elementum. Fusce nec ex id nisl semper vestibulum ut quis tortor.',
                                website: 'https://www.google.com/'
                            },
                            {
                                name: 'University Kitty 2',
                                pays: 'Japon',
                                ville: 'Kyoto',
                                specialité: ['economie', 'politique', 'droit', 'informatique'],
                                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper bibendum posuere. Sed sit amet laoreet ligula. Suspendisse potenti. In hac habitasse platea dictumst. Maecenas mattis tortor lacus, at laoreet dolor laoreet nec. Vestibulum nec porta massa, sed volutpat ligula. Suspendisse porttitor augue ut mauris tristique accumsan. Etiam tempor eu nisl tincidunt tristique. Sed nec tristique mauris. Donec et nibh non diam lobortis dictum sed a metus. Mauris iaculis at risus id sagittis. Quisque a ultrices dolor. Cras faucibus feugiat felis, id mollis ante vehicula et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia consequat ex quis elementum. Fusce nec ex id nisl semper vestibulum ut quis tortor.',
                                website: 'https://www.google.com/'
                            },
                        ]
                    },
                    {
                        name: 'Université de Paris 3',
                        pays: 'France',
                        ville: 'Paris',
                        image: 'https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80',
                        partner: [
                            {
                                name: 'University Hello 3',
                                pays: 'Japon',
                                ville: 'Tokyo',
                                specialité: ['economie', 'politique', 'droit', 'informatique'],
                                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper bibendum posuere. Sed sit amet laoreet ligula. Suspendisse potenti. In hac habitasse platea dictumst. Maecenas mattis tortor lacus, at laoreet dolor laoreet nec. Vestibulum nec porta massa, sed volutpat ligula. Suspendisse porttitor augue ut mauris tristique accumsan. Etiam tempor eu nisl tincidunt tristique. Sed nec tristique mauris. Donec et nibh non diam lobortis dictum sed a metus. Mauris iaculis at risus id sagittis. Quisque a ultrices dolor. Cras faucibus feugiat felis, id mollis ante vehicula et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia consequat ex quis elementum. Fusce nec ex id nisl semper vestibulum ut quis tortor.',
                                website: 'https://www.google.com/'
                            },
                            {
                                name: 'University Kitty 3',
                                pays: 'Japon',
                                ville: 'Kyoto',
                                specialité: ['economie', 'politique', 'droit', 'informatique'],
                                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper bibendum posuere. Sed sit amet laoreet ligula. Suspendisse potenti. In hac habitasse platea dictumst. Maecenas mattis tortor lacus, at laoreet dolor laoreet nec. Vestibulum nec porta massa, sed volutpat ligula. Suspendisse porttitor augue ut mauris tristique accumsan. Etiam tempor eu nisl tincidunt tristique. Sed nec tristique mauris. Donec et nibh non diam lobortis dictum sed a metus. Mauris iaculis at risus id sagittis. Quisque a ultrices dolor. Cras faucibus feugiat felis, id mollis ante vehicula et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia consequat ex quis elementum. Fusce nec ex id nisl semper vestibulum ut quis tortor.',
                                website: 'https://www.google.com/'
                            },
                        ]
                    },
                    {
                        name: 'Université de Paris 4',
                        pays: 'France',
                        ville: 'Paris',
                        image: 'https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80',
                        partner: [
                            {
                                name: 'University Hello 4',
                                pays: 'Japon',
                                ville: 'Tokyo',
                                specialité: ['economie', 'politique', 'droit', 'informatique'],
                                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper bibendum posuere. Sed sit amet laoreet ligula. Suspendisse potenti. In hac habitasse platea dictumst. Maecenas mattis tortor lacus, at laoreet dolor laoreet nec. Vestibulum nec porta massa, sed volutpat ligula. Suspendisse porttitor augue ut mauris tristique accumsan. Etiam tempor eu nisl tincidunt tristique. Sed nec tristique mauris. Donec et nibh non diam lobortis dictum sed a metus. Mauris iaculis at risus id sagittis. Quisque a ultrices dolor. Cras faucibus feugiat felis, id mollis ante vehicula et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia consequat ex quis elementum. Fusce nec ex id nisl semper vestibulum ut quis tortor.',
                                website: 'https://www.google.com/'
                            },
                            {
                                name: 'University Kitty 4',
                                pays: 'Japon',
                                ville: 'Kyoto',
                                specialité: ['economie', 'politique', 'droit', 'informatique'],
                                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper bibendum posuere. Sed sit amet laoreet ligula. Suspendisse potenti. In hac habitasse platea dictumst. Maecenas mattis tortor lacus, at laoreet dolor laoreet nec. Vestibulum nec porta massa, sed volutpat ligula. Suspendisse porttitor augue ut mauris tristique accumsan. Etiam tempor eu nisl tincidunt tristique. Sed nec tristique mauris. Donec et nibh non diam lobortis dictum sed a metus. Mauris iaculis at risus id sagittis. Quisque a ultrices dolor. Cras faucibus feugiat felis, id mollis ante vehicula et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia consequat ex quis elementum. Fusce nec ex id nisl semper vestibulum ut quis tortor.',
                                website: 'https://www.google.com/'
                            },
                            {
                                name: 'University Deins 4',
                                pays: 'Chine',
                                ville: 'Hong Kong',
                                specialité: ['economie', 'politique', 'droit', 'informatique'],
                                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper bibendum posuere. Sed sit amet laoreet ligula. Suspendisse potenti. In hac habitasse platea dictumst. Maecenas mattis tortor lacus, at laoreet dolor laoreet nec. Vestibulum nec porta massa, sed volutpat ligula. Suspendisse porttitor augue ut mauris tristique accumsan. Etiam tempor eu nisl tincidunt tristique. Sed nec tristique mauris. Donec et nibh non diam lobortis dictum sed a metus. Mauris iaculis at risus id sagittis. Quisque a ultrices dolor. Cras faucibus feugiat felis, id mollis ante vehicula et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia consequat ex quis elementum. Fusce nec ex id nisl semper vestibulum ut quis tortor.',
                                website: 'https://www.google.com/'
                            },
                        ]
                    }
                ],

                universityObject: {
                    nameB: '',
                    paysB: '',
                    villeB: '',
                    imageB: '',
                    partnerB: []
                },

                visible: false,

                uniqueUniversityName: ''
            }
        },

        mounted(){
            this.init();
        },

        methods: {

            init: function() {
                var cityStart = [];
                var countryPartener = [];
                var specialityPartener = [];

                this.universitys.forEach(el => {
                    cityStart.push(el.ville)
                    el.partner.forEach(el2 => {
                        el2.specialité.forEach(el3 => {specialityPartener.push(el3)})                        
                        countryPartener.push(el2.pays)
                    })
                })

                this.countryOption = [...new Set(countryPartener)]
                this.specialityOption = [...new Set(specialityPartener)]
                this.cityStartOption = [...new Set(cityStart)]
                this.universitysSend = this.universitys
            },

            getuniqueUniversityNameCard (val) {
                this.setValue(val)
                this.$refs.navbarComponent.drawer();
            },

            setValue: function(tests) {
                this.uniqueUniversityName = tests;
                for (var i = 0; i < this.universitys.length; i++) {
                    if(this.universitys[i].name === this.uniqueUniversityName){
                        this.universityObject.nameB = this.universitys[i].name,
                        this.universityObject.paysB = this.universitys[i].pays,
                        this.universityObject.villeB = this.universitys[i].ville,
                        this.universityObject.imageB = this.universitys[i].image,
                        this.universityObject.partnerB = this.universitys[i].partner
                    }
                }
            },

            searchByFilter() {
                var filtered
                filtered = this.universitys.filter((el) => {
                        if(this.modelV == "") {
                            return (this.booleanByCountry(el.partner))
                        } else {
                            return (el.ville.toLowerCase() == this.modelV.toLowerCase() && this.booleanByCountry(el.partner))
                        }
                    }
                )
                this.universitysSend = filtered
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
                        if(el.pays === this.modelD && el.specialité.indexOf(this.modelS) > -1) {
                            res = true
                        }
                    })
                }

                else if(this.modelD == "" && this.modelS != "") {
                     testList.forEach(el => {
                        if(el.specialité.indexOf(this.modelS) > -1) {
                            res = true
                        }
                    })
                }
                
                else if(this.modelD != "" && this.modelS == "") {
                    testList.forEach(el => {
                        if(el.pays === this.modelD) {
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