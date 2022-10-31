<template>
  <v-container id="formContainer" >
    <v-row class="d-flex flex-column align-center subContainer" >
        <h1 class="title" >Create your Logo</h1>
        <h2 class="subtitle">
          ENTER YOUR COMPANY NAME BELOW TO GET STARTED WITH OUR LOGO MAKER.
        </h2>    
    </v-row>
    <v-row class="form" style="height:100vh;display:flex;align-items:center;">
      <v-col class="text-center formInputContainer ">
      <v-row class="d-flex flex-column align-center" >
        <input
          class="inputField"
          placeholder="Company Name"
          v-model="logoText"
          @change="saveText"
          :label="logoArray.name"
        />
        <br/>
        <!-- <v-text-field
          v-model="logoText"
          @change="saveText"
          :label="logoArray.name"
        >
        </v-text-field> -->
        <v-btn @click="addNewLogo" style="margin-top:10px;" >Let's Go</v-btn>      
      </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from "../../../models/logo";
// import mainLogo from "../../../../images/Logomaker_Logo.svg";
import Storage from "../../../services/storage";

const storage = new Storage();

export default {
  data: () => ({
    logoText: storage.get().name,
    logoArray: storage.getAll(),
  }),
  methods: {
    addNewLogo() {
      const logo = Logo.instance;
      logo.id = this.logoArray.length + 1 || 1;
      logo.save();
      this.$router.push({ path: "/logo-maker" });
    },
    saveText() {
      const logo = Logo.instance;
      logo.name = this.logoText;
      logo.save();
    },
    updateLogo(i) {
      const logoSelected = this.logoArray[i];
      storage.set(logoSelected);
      Logo.instance = new Logo(storage.get(logoSelected));
      this.$router.push({ path: "/logo-maker" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./form.scss";
@media (max-width: 100vw) {
  .container{
    max-width:100vw;
  }

} 
</style>
