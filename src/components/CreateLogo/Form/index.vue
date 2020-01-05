<template>
  <v-container>
    <v-row >
      <v-col md="10">
        <v-text-field 
          v-model="logoText"
          @change="saveText"
          :label="logoArray"
        >
        </v-text-field>
      <router-link to="/logo-maker">
          <v-btn >Next</v-btn>
      </router-link>
      </v-col>
      <v-col md="3" v-for="(item, i) in logoArray" :key="i">
        <v-card
          class="mx-auto"
        >
          <v-card-title @click="updateLogo(i)">
            {{item.id}}
          </v-card-title>
        </v-card>
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

</style>
