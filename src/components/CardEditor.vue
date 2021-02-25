<template>
    <div>
        <div class="bg-transparent rounded-lg overflow-hidden shadow-2xl relative h-full">
            <div class="absolute space-x-1.5 right-2 flex">
                <button @click="test()" class="Button bg-red-500 rounded-3xl my-2 px-2 right-28 block">Delete</button>
                <button @click="test()" class="Button bg-green-700 rounded-3xl my-2 px-2 right-52 block">Edit</button>
                <button @click="openCard(university.universitySourceName)" class="Button bg-blue-500 rounded-3xl my-2 px-2 right-0 block shadow-2xl">More Info</button>
            </div>
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

export default {
    name: 'university',
    props: ['university'],
    
    methods: {
        openCard(nameUniversity) {
            this.$emit('onClick', nameUniversity)
        },

        test(){
            console.log("Hello")
        }
    }
}
</script>