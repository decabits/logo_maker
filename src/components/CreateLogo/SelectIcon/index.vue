<template>
  <div>
    <v-container class="logo-icon pt-12 mt-12" fluid>
      <v-row >
        <v-col md="4">
          <div style="position: fixed;" :style="{'width': width}">
            <v-select
              @change="selectIcon(currentLogoObj.iconId)"
              v-model="currentLogoObj.iconId"
              :items="iconItems"
              item-text="imageName"
              item-value = "id"
              :label="cms.previewComponent.label"
            >
            </v-select>
            <div class="logo-icon__preview-light">
              <img class="logo-icon__preview-icon"  :src="currentLogoObj.icon" alt="">
            </div>
          </div>
        </v-col>
        <v-col md="8">
            <v-col md="3" v-for="(item, i) in iconItems" :key="i" style="float:left">
              <div  @click="changeIcon(item.image, item.id)" class="logo-icon__font-selection-cards">
                <div :class="{'logo-icon__icon-selection-cards-indicators' : currentLogoObj.iconId === item.id }"></div>
                <img :src="item.image" class="logo-icon__preview-icon" alt="">
              </div>
            </v-col>
        </v-col>
      </v-row>
      </v-container>
  </div>
</template>

<script>
  import iconJson from '../../../common/data/icons.js'
  import cmsJson from '../../../common/data/messages.json'
  import Logo from '../../../models/logo'

  export default {
    name: 'HelloWorld',
    data: () => ({
      width: '33%',
      iconItems: iconJson,
      cms: cmsJson.selectIcon,
      logoIcon: null,
    }),
    components: {
    },
    props: {
      currentLogoObj : {
        type : Object
      }
    },
    methods: {
      changeIcon(icon, id){
        const logo = Logo.instance;
        logo.icon = icon;
        logo.iconId = id;
        logo.save();
      },
      selectIcon(id){
        let array = this.iconItems
        let slectedArray = array.filter((e) => e.id == id )
        const icon = slectedArray[0].image;
        this.changeIcon(icon, id)
      }
    },
    mounted() {
    }
  };

</script>

<style lang="scss" scoped>
  @import './selectIcon.scss'

</style>