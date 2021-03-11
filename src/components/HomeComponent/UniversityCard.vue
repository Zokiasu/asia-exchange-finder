<template>
    <div class="Card text-xs md:text-md 4xl:text-lg" @click="openCard(university.universitySourceName)">
        <div class="bg-transparent rounded-lg overflow-hidden shadow-2xl relative h-full">
            <button class="Button bg-blue-500 rounded-3xl m-2 px-2 absolute right-0 block shadow-2xl">More Info</button>
            <p class="absolute w-full bg-white bg-opacity-80 p-5 bottom-0 block text-black hover:text-blue-600">
                {{ university.universitySourceName }}
            </p>
            <img class="h-full w-full object-cover object-center" v-lazy="university.universitySourceImageLink" alt="">
        </div>
    </div>
    <div v-if="index%12==0" class="rounded-lg text-white bg-white p-5 flex flex-wrap content-center justify-center">
        <span class="rounded-lg text-sm text-black text-center md:text-xl">
            Ads
        </span>
    </div>
</template>

<script>
    import {analytics} from '../../main.js'

export default {
    name: 'university',
    props: ['university', 'index'],
    

        data () {
            return {
                random:'',
            }
        },

    created(){
        this.random = Math.round(Math.random()*1000)
    },
    
    methods: {
        openCard(nameUniversity) {
            analytics.logEvent("showUniversity", {nameUniversity})
            this.$emit('onClick', nameUniversity)
        }
    }
}
</script>