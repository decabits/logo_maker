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
  import data from './data'
  import methods from './methods'

  export default { data, methods };

</script>

<style lang="scss" scoped>
  @import './brandName.css';
</style>
