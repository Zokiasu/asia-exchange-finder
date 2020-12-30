<template>
  <div id="visa">
    <h1>Vue Visa Application</h1>
    <form>
      <label for="first name">First Name:</label>
      <input type="text" required>
      <br>
      <label for="last name">Last Name:</label>
      <input type="text" required>
      <br>
      <label for="country">Nationality:</label>
      <input type="text"  required>
      <br>
      <label for="passport number">Passport Number:</label>
      <input type="text"  required>

      <label for="duration">Duration of stay:</label>
      <input type="text"  required>
      <br><br>
      <button @click="addVisa">Add another previous visa</button>
      <br>
      <div class="previous" v-for="(applicant, counter) in applicants" v-bind:key="counter">
        <span @click="deleteVisa(counter)">x</span>
        <label for="duration">{{counter+1}}. Previous Visa:</label>
        <input type="text" v-model="applicant.previous" required>
        <label for="duration">Year of expiration:</label>
        <input type="text" v-model="applicant.expiration" required> 
      </div>
    </form>

    <div class="form-group mt-2" v-for="(input,k) in inputs" :key="k">
      <input type="text" class="form-control mx-2" v-model="input.name">
      <span class="">
          <button class="fas fa-plus-circle mr-2" @click="add(k)" v-show="k == inputs.length-1">Add</button>
          <button class="fas fa-minus-circle" @click="remove(k)" v-show="k || ( !k && inputs.length > 1)">Remove</button>
      </span>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: 'Test',
    props: {
      msg: String
    },
    data(){
      return {
        applicants:[
          {
            previous: '',
            expiration:''
          }
        ],
        inputs: [
            {
                name: ''
            }
        ]
      }
    },
    methods : {
        add(index) {
            this.inputs.push({ name: '' });
        },
        remove(index) {
            this.inputs.splice(index, 1);
        },
      addVisa(){
        this.applicants.push({
        previous:'',
        expiration: ''
      })
      },
      deleteVisa(counter){
        this.applicants.splice(counter,1);
      }
    }
  }
</script>

