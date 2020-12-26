<template>
    <div class="w-full">
        <div class="bg-white rounded-lg overflow-hidden shadow relative">
            <button @click="openCard(university.name)" class="Button rounded-3xl m-2 px-2 absolute right-0 block shadow-2xl">Voir plus</button>
            <img class="h-56 w-full object-cover object-center" v-bind:src="university.image" alt="">
            <div class="p-4 h-auto">
                <p class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg">
                    {{ university.name }}
                </p>
                <!--<div class="relative bottom-0 mb-2 mr-1 inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700"  v-for="(name, index) in university.pays" :key="index">
                    <tag :tags="name"/>
                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
//import Tag from './Tag.vue'

export default {
    name: 'university',
    props: ['university'],

    components:{
        //Tag
    },
    
    methods: {
        openCard(name) {
            this.$emit('onClick', name)
        }
    }
}
</script>