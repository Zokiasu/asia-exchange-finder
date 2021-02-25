<template>

    <div class=" mb-6 m-3 pb-2 bg-gray-200 rounded shadow-lg">
        <!-- Université + Ville + Pays-->
        <div class="relative w-full bg-blue-500 rounded-sm pb-1 text-2xl xl:text-xl 2xl:text-2xl">
            <p class="px-2 font-bold text-white">{{university.universityPartnerName}}</p>
            <p class="font-bold text-white pl-2 xl:pl-0 xl:absolute xl:top-0 xl:right-2">{{university.universityPartnerCity}}, {{university.universityPartnerCountry}}</p>
        </div>
        <!-- Partner speciality -->
        <div v-if="university.universityPartnerSpeciality" class="p-2">
            <p class="mb-1 font-bold">Partner's Speciality :</p>
            <div class="relative inline-block mr-1 mb-1 bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700"  v-for="(universityPartnerName, index) in university.universityPartnerSpeciality" :key="index">
                    <tag :tags="universityPartnerName"/>
            </div>
        </div> 
        <!-- Exchange -->
        <div v-if="university.universityPartnerCondition" class="p-2">
            <p class="mb-1 font-bold">Requirements :</p>
            <p class="whitespace-pre-line">{{university.universityPartnerCondition}}</p>
        </div>
        <!-- Exchange -->
        <div v-if="!university.universityPartnerSpeciality || !university.universityPartnerCondition" class="p-5 text-center font-semibold text-lg">
            <p>Sorry, we don't have more information about this partner. </p>
            <p>If you have any information please edit this partner to help us improve our database.</p>
        </div>
        <!-- universityPartnerWebsiteLink button -->
        <div class="relative">
            <div class="container flex justify-center">
                <a v-bind:href="link" target="_blank">
                    <button class="inline-block px-4 py-1 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-500 
                        rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-blue-900">
                        Website
                    </button>
                </a>
            </div>            
            <div class="space-x-1 absolute bottom-0.5 right-3">
                <button class="inline-block px-4 py-1 text-xs font-medium leading-6 text-center text-white uppercase transition bg-green-500 
                    rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-green-900">
                    Edit
                </button>
                <button class="inline-block px-4 py-1 text-xs font-medium leading-6 text-center text-white uppercase transition bg-red-500 
                    rounded-full shadow ripple waves-light hover:shadow-lg focus:outline-none hover:bg-red-900">
                    Delete
                </button>
            </div>
        </div>
    </div>
    
</template>

<script>
    import Tag from './Tag.vue'

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
        
    },

    

  };
</script>
