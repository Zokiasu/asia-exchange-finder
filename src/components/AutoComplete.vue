<template>
  <div id="app" class="flex justify-center mt-12">
    <div>
      <div class="w-full relative">
        <label
          for="city"
          class="block text-sm font-medium leading-5 text-gray-700 sr-only"
        >
          Email
        </label>
        <div
          class="mt-1 relative border border-gray-300 text-black overflow-hidden rounded-md shadow-sm"
        >
          <input
            id="city"
            @keyup="showOptions = true"
            v-model="formData.client"
            class="w-full px-3 py-3"
            autocomplete="on"
            placeholder="you@example.com"
          />
        </div>
        <div
          v-show="resultQuery().length && showOptions"
          class="absolute w-full z-50 bg-white border text-black border-gray-300 mt-1 max-height-48 overflow-hidden overflow-y-scroll rounded-md shadow-md"
        >
          <ul class="py-1">
            <li
              :key="index"
              v-for="(value, index) in resultQuery()"
              @click="setInput(value.clients_name)"
              class="px-3 py-2 cursor-pointer hover:bg-gray-200"
            >
              {{ value.clients_name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      formData: {},
      showOptions: false,
      data: [
        { id: 1, clients_name: "Jane Doe" },
        { id: 2, clients_name: "John Doe" },
        { id: 3, clients_name: "Hello World" },
      ]
    };
  },
  methods: {
    setInput(value) {
      this.$set(this.formData, "client", value);
      this.$set(this.formData, "client_id", value.id);
      this.showOptions = false;
    },
    resultQuery() {
      if (this.formData.client) {
        let data = this.data.filter((item) => {
          return this.formData.client
            .toLowerCase()
            .split(" ")
            .every((v) => item.clients_name.toLowerCase().includes(v));
        });

        return data;
      } else {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.max-height-48 {
  max-height: 200px;
}
</style>
