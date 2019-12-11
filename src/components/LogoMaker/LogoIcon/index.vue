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

  @import url('https://fonts.googleapis.com/css?family=Alata|Baskervville|Calistoga|Fira+Sans|Ibarra+Real+Nova|Lato|Montserrat|Noto+Serif|Open+Sans|Poppins|Roboto|Roboto+Condensed&display=swap');
  %textPreview {
    position: relative;
    width: 100%;
    height: 35vh;
    text-align: center;
  }

  .logo-icon{
    &__preview-dark{
      @extend %textPreview;
      background: #333;
      text-align: center;
      border-radius: 8px 8px 0 0 ;
    }
    &__preview-light{
      @extend %textPreview;
      background: #fdfdfd;
      text-align: center;
      border: .5px solid #c4c4c4;
      border-radius: 0 0 8px 8px;
    }
    &__preview-icon{
        width: 25%;
        position: relative;
        top: 50%;
        transform: translateY( -50%);
    }
    &__font-selection-cards{
      color: #333;
      text-align: center;
      height: 120px;
      border-radius: 8px;
      cursor: pointer;
      border: .5px solid #c4c4c4c4;
    }
    &__font-selection-cards:hover{
      background: #333;
      border: 0 solid #c4c4c4;
      transition: .25s;
    }
    &__icon-selection-cards-indicators{
      width: 1%;
      height: 119px;
      background-image: linear-gradient(to bottom , #FF5F04, #FF9D42 );
      position: absolute;
      border-radius: 8px 0 0 8px;
    }
  }

</style>