<template>
    <div class="w-full">
        <div class="bg-white rounded-lg overflow-hidden shadow relative">
            <button @click="openCard(university.universitySourceName)" class="Button bg-blue-500 rounded-3xl m-2 px-2 absolute right-0 block shadow-2xl">More Info</button>
            <img class="h-56 w-full object-cover object-center" v-bind:src="university.universitySourceImageLink" alt="">
            <div class="p-4 h-auto">
                <p class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg">
                    {{ university.universitySourceName }}
                </p>
                <!--<div class="relative bottom-0 mb-2 mr-1 inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700"  v-for="(name, index) in university.universitySourceCountry" :key="index">
                    <tag :tags="name"/>
                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
//import Tag from './Tag.vue'
import {apps, name, grade, defaultAnalytics} from '../main.js'

export default {
    name: 'university',
    props: ['university'],

    components:{
        //Tag
    },
    created() {
        this.$emit('created');
    },
    
    methods: {
        openCard(name) {
            defaultAnalytics.logEvent('universitySource', {value: this.university.universitySourceName})
            this.$emit('onClick', name)
        }
    }
}
</script>