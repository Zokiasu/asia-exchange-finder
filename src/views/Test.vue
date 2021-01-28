<template>
    <smart-tagz
        editable
        autosuggest
        input-placeholder="Select Countries ..."
        :defaultTags="['United Kingdom', 'Uruguay', 'Uzbekistan']"
        :sources="['United Kingdom', 'Uruguay', 'Uzbekistan']"
        :on-changed="logResult"
        :allowPaste="{delimiter: ','}"
        :allowDuplicates="false"
        :max-tags="100"
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