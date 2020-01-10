<template>
  <v-container>
    <v-row class="form">
        <v-col md="10" class="form__title">
            <h2>djlkjldjld</h2>
        </v-col>
        <v-col md="2">
            <v-btn class="form__button-new-logo" @click="saveLogoObject">New Logo</v-btn>
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
      logoArray: storage.getAll()
    }),
    methods: {
        saveLogoObject() {
            const logo =  Logo.instance
            logo.id = this.logoArray.length + 1 || 1;
            logo.save();
            this.$router.push({path:'/form'})
        },
        updateLogo(i) {
        // const logo = Logo.instance
        const logoSelected = this.logoArray[i]
        storage.set(logoSelected)
        // logo.calculateWidths()
        Logo.instance = new Logo(storage.get())
        this.$router.push({path:'/logo-maker'})
        }
    }
  }

</script>

<style lang="scss" scoped>
    @import './edit.scss'
</style>
