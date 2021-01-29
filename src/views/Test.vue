<template>
    <smart-tagz
        editable
        autosuggest
        input-placeholder="Select Countries ..."
        :sources="['United Kingdom', 'Uruguay', 'Uzbekistan']"
        :on-changed="logResult"
        :allowPaste="{delimiter: ','}"
        :allowDuplicates="false"
        :max-tags="100"
    />
    <Multiselect
        :class="[ value != '' ? 'w-auto bg-white rounded text-black' : 'w-48 bg-white rounded text-black' ]"
        v-model="value"
        mode="tags"
        :searchable="false"
        :createTag="false"
        :options="[
        { value: 'batman', label: 'Batman' },
        { value: 'robin', label: 'Robin' },
        { value: 'joker', label: 'Joker' },
        ]"
    />
</template>

<script>
    import { SmartTagz } from "smart-tagz";
    import "smart-tagz/dist/smart-tagz.css";
    import { defineComponent } from "vue";
    import Multiselect from '@vueform/multiselect'

    export default  defineComponent ({
        name: "Basic",
        components: {
            SmartTagz,
            Multiselect
        },

        data(){
            return{
                value:[]
            }
        },

        setup() {
            const logResult = (result) =>{
                console.log(result)
            };
            return {
                logResult,
            };
        },
    });
</script>

<style>

</style>