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
      <v-col class="form__cards-container col-12" md="4" v-for="(item, i) in logoArray" :key="i">
        <v-card flat outlined class="form__cards-container__card" @click="updateLogo(i)">
          <v-list-item>
            <v-list-item-avatar class="form__cards-container__card-serial">{{item.id}}</v-list-item-avatar>
          </v-list-item>
          <v-list-item class="pa-0">
            <div class="form__cards-container__card__preview pa-0 ma-0" :style="{'background-color' : item.bgColor}">
              <img :src="item.pngUrl" alt="">
            </div>
          </v-list-item>
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
