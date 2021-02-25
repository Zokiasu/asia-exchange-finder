<template>
    <div @click="openCard(university.universitySourceName)">
        <div class="bg-transparent rounded-lg overflow-hidden shadow-2xl relative h-full">
            <button class="Button bg-blue-500 rounded-3xl m-2 px-2 absolute right-0 block shadow-2xl">More Info</button>
            <p v-if="university.universitySourceDisplay == 'True'" class="bg-green-500 p-2 px-3 font-semibold text-lg text-white absolute left-0 rounded-br-md">Online</p>
            <p v-if="university.universitySourceDisplay == 'False'" class="bg-red-500 p-2 px-3 font-semibold text-lg text-white absolute left-0 rounded-br-md">In progress</p>
            <p class="absolute w-full bg-white bg-opacity-80 p-5 bottom-0 block text-black hover:text-blue-600 font-semibold text-lg">
                {{ university.universitySourceName }}
            </p>
            <img class="h-full w-full object-cover object-center" v-lazy="university.universitySourceImageLink" alt="">
        </div>
    </div>
</template>

<script>
    import {analytics} from '../main.js'

export default {
    name: 'university',
    props: ['university'],
    
    methods: {
        openCard(nameUniversity) {
            analytics.logEvent("showUniversity", {nameUniversity})
            this.$emit('onClick', nameUniversity)
        }
    }
}
</script>