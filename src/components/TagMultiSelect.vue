<template>
  <div class="example">
    <div class="sample-view">
      <smart-tagz
        input-placeholder="Select Countries ..."
        :defaultTags="['United Kingdom', 'Uruguay', 'Uzbekistan']"
        :on-changed="logResult"
      />
    </div>
    <button @click="h()">Hello</button>
  </div>
</template>


<script>
import {SmartTagz} from "smart-tagz";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Basic",

  components: {
    SmartTagz,
  },

  setup() {
    const logResult = (result) => console.log(result);
    return {
      logResult,
    };
  },
});
</script>