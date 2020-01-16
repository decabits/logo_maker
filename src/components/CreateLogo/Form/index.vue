<template>
  <v-container>
    <v-row class="form">
      <v-col md="12">
        <v-text-field 
          v-model="logoText"
          @change="saveText"
          :label="logoArray.name"
        >
        </v-text-field>
        <v-btn @click="addNewLogo">Next</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Logo from '../../../models/logo'
  import Storage from '../../../services/storage'

  const storage = new Storage()

  export default { 
    data: () => ({
      logoText : storage.get().name,
      logoArray: storage.getAll()
    }),
    methods: {
      addNewLogo(){
        const logo =  Logo.instance
        logo.id = this.logoArray.length + 1 || 1;
        logo.save();
        this.$router.push({path:'/logo-maker'})
      },
      saveText() {
        const logo = Logo.instance;
        logo.name = this.logoText;
        logo.save();
      },
      updateLogo(i) {
        const logoSelected = this.logoArray[i]
        storage.set(logoSelected)
        Logo.instance = new Logo(storage.get(logoSelected))
        this.$router.push({path:'/logo-maker'})
      }
    }

  }

</script>

<style lang="scss" scoped>
  @import './form.scss'

</style>
