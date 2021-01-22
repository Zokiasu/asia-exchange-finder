<template>

    <div class="mb-6 m-3 pb-2 bg-gray-500 bg-opacity-20 rounded shadow-lg">
        <!-- Université + Ville + Pays-->
        <div class="relative w-full bg-blue-500 rounded-sm pb-1">
            <p class="px-2 font-bold text-2xl text-white">{{university.universityPartnerName}}</p>
            <p class="font-bold text-2xl text-white pl-2 md:pl-0 md:absolute md:top-0 md:right-2">{{university.universityPartnerCity}}, {{university.universityPartnerCountry}}</p>
        </div>
        <!-- University program
        <div class="p-2">
            <p class="mb-1 font-bold">University's programs related :</p>
            <p>N/A</p>
        </div>s -->
        <!-- University programs
        <div class="p-2">
            <p class="mb-1 font-bold">Exchange's programs :</p>
            <p>N/A</p>
        </div> -->
        <!-- Partner speciality -->
        <div class="p-2">
            <p class="mb-1 font-bold">Partner's Speciality :</p>
            <div class="relative bottom-0 mb-2 mr-1 inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700"  v-for="(universityPartnerName, index) in university.universityPartnerSpeciality" :key="index">
                    <tag :tags="universityPartnerName.specialityName"/>
            </div>
        </div> 
        <!-- Exchange -->
        <div class="p-2">
            <p class="mb-1 font-bold">Requirements :</p>
            <p>{{university.universityPartnerCondition}}</p>
        </div>
        <!-- universityPartnerWebsiteLink button -->
        <div class="container flex justify-center">
            <a v-bind:href="link" target="_blank">
                <button @click="analytics(university.universityPartnerName)" class="inline-block px-4 py-1 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-500 
                    rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-blue-900">
                    Website
                </button>
            </a>
        </div>
    </div>
    
</template>

<script>
    import Tag from './Tag.vue'
    import {apps, name, grade, defaultAnalytics} from '../main.js'

  export default {

    components:{
        Tag
    },

    universityPartnerName: 'university',
    props: ['university'],

    data() {
        return{
            link: this.university.universityPartnerWebsiteLink,
        }
    },

    methods: {
      analytics(nameUniversityPartner){
        defaultAnalytics.logEvent('universityPartnerWebsite', {value:nameUniversityPartner})
      }
    },

    

  };
</script>
