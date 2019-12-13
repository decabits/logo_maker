<template>
  <v-container>
    <v-row >
      <v-col md="10">
        <v-text-field 
          v-model="logoText"
          @change="saveText"
        >
        </v-text-field>
      <router-link to="/logo-maker">
          <v-btn >Next</v-btn>
      </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import storage from '../../../model/storage'

  export default { 
    data: () => ({
      logoText : JSON.parse(window.localStorage.getItem('localStorage')|| "{}").brandName
    }),
    methods: {
      saveText() {
        storage.saveBrandName(this.logoText);
      }
    }

  }

</script>

<style lang="scss" scoped>
  @import '../../../style/form.scss'

</style>
