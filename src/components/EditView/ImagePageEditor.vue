<template>    
    <div class="flex flex-wrap content-center justify-center lg:col-start-2 lg:col-end-7">
        <div class="w-full pt-10 lg:pt-0 lg:px-5 py-1 mb-2 text-xl justify-start">
            <h5 class="font-semibold">Image</h5>
        </div>
        <div class="font-bold grid grid-cols-1 gap-1 text-xs 4xl:text-base w-full lg:px-5">
            <div v-if="university.universitySourceImageLink" class="flex flex-wrap col-start-1 col-end-7">
                <div class="w-7/12 bg-gray-500 rounded p-0.5 shadow">
                    <img class="h-full w-full object-cover object-center" v-lazy="university.universitySourceImageLink" alt="">
                </div>
            </div>
            <div id="image" class="flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-5">
                <!--<img class="w-40 h-40 rounded-full object-cover" v-lazy="university.universitySourceImageLink">-->
                <div>
                    <button 
                        class="px-3 py-1 rounded-sm text-xl font-semibold flex justify-center transition duration-500 ease-in-out bg-red-900 hover:bg-red-700 hover:border-white border border-transparent transform hover:-translate-y-0.5 hover:scale-100 hover:font-bold focus:outline-none max-h-10"
                        @click="launchImageFile"
                        :disabled="isUploadingImage"
                        type="button">
                        {{ isUploadingImage ? 'Uploading...' : 'Upload' }}
                    </button>
                    <input
                        ref="imageFile"
                        @change.prevent="uploadImageFile($event.target.files)"
                        type="file"
                        accept="image/png, image/jpeg"
                        class="hidden">
                </div>
            </div>
        </div>
        <div class="w-full pt-5 justify-end space-x-1.5 flex text-sm 4xl:text-base">
            <button @click="sendUniversity" class="Button bg-green-500 rounded my-3 px-2 block">Send</button>
            <button @click="cancelUniversity" class="bg-transparent my-3 px-2 hover:bg-red-500 text-red-700 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded">Cancel</button>
        </div>
    </div>
</template>

<script>
    import MethodsGeneral from '../../Mixins/firebase'
    import {apps} from '../../main.js'

    export default {
        mixins:[MethodsGeneral],
        props: ['university'],

        data(){
            return {
                id: this.$route.query.id,
                hello:"",
                univ:{},
                isUploadingImage: false,
            }
        },

        created(){
            MethodsGeneral.methods.copyUniversityObject(this.univ, this.university)
        },

        methods:{
            sendUniversity(){
                this.$emit('sendUniversity')
            },
            cancelUniversity(){
                this.$emit('cancelUniversity')
            },

            launchImageFile () {
                this.$refs.imageFile.click()
            },

            uploadImageFile (files) {
                if (!files.length) {
                return
                }
                let file = files[0]

                if (!file.type.match('image.*')) {
                alert('Please upload an image.')
                return
                }

                let metadata = {
                contentType: file.type
                }

                this.isUploadingImage = true

                let imageRef = apps.storage().ref(`university/${this.university.universitySourceName}`)

                let uploadTask = imageRef.put(file, metadata).then((snapshot) => {
                return snapshot.ref.getDownloadURL().then((url) => {
                    return url
                })
                }).catch((error) => {
                console.error(error)
                })
                uploadTask.then((url) => {
                this.university.universitySourceImageLink = url
                this.isUploadingImage = false
                })
            },
        },
    }
</script>