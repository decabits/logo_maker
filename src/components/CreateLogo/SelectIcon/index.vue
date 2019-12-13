<template>
  <div>
    <v-container class="logo-icon pt-12 mt-12" fluid>
      <v-row >
        <v-col md="4">
          <div style="position: fixed;" :style="{'width': width}">
            <v-select
              v-model="logoIcon"
              :items="iconItems"
              item-text="imageName"
              item-value="image"
              :label="cms.previewComponent.label"
            >
            </v-select>
            <div class="logo-icon__preview-dark">
              <img class="logo-icon__preview-icon"  :src="logoIcon" alt="">
              </div>
              <div class="logo-icon__preview-light">
              <img class="logo-icon__preview-icon"  :src="logoIcon" alt="">
            </div>
          </div>
        </v-col>
        <v-col md="8">
            <v-col md="3" v-for="(item, i) in iconItems" :key="i" style="float:left" >
              <div  @click="changeIcon(item.image, item.id)" class="logo-icon__font-selection-cards">
                <div :class="{'logo-icon__icon-selection-cards-indicators' : selectedIcon === item.id }"></div>
                <img class="logo-icon__preview-icon"  :src="item.image" alt="">
              </div>
            </v-col>
        </v-col>
      </v-row>
      </v-container>
  </div>
</template>

<script>
  import storage from '../../../model/storage'
  import iconJson from '../../../JSON/icon.json'
  import cmsJson from '../../../JSON/cms.json'

  export default {
    name: 'HelloWorld',
    data: () => ({
      ...storage.getIconData(),
      width: '33%',
      iconItems: iconJson,
      cms: cmsJson.selectIcon
    }),
    methods: {
      changeIcon(icon, iconId){
        this.logoIcon = icon;
        this.selectedIcon = iconId;
        storage.saveIconData(icon, iconId);
      }
    },
  };

</script>

<style lang="scss" scoped>
  @import '../../../style/selectIcon.scss'

</style>