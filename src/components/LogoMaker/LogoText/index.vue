<template>
  <div>
    <v-container fluid class="pt-12 mt-12">
      <v-row>
        <v-col md="4">
          <div style="position: fixed;" :style="{'width': width}">
            <v-select
              @change="example"
              :items="fontItems"
              item-text="fontName"
              item-value="id"
              :value="selectedFont"
              :label="cms.previewComponent.label"  
            >
            </v-select>
            <div class="logo-text__preview-dark" >
              <h2 class="logo-text__preview-text" :style="{fontFamily:logoFont}">{{logoText}}</h2>
            </div>
            <div class="logo-text__preview-light">
              <h2 class="logo-text__preview-text"  :style="{fontFamily:logoFont}">{{logoText}}</h2>
            </div>
          </div>
        </v-col>
        <v-col md="8">
          <v-col md="3" v-for="(item, i) in fontItems" :key="i" style="float:left" >
            <div :style="{fontFamily:item.fontFamily}" @click="changeFont(item.fontFamily, item.id)" class="logo-text__font-selection-cards">
              <div :class="{'logo-text__font-selection-cards-indicators' : selectedFont === item.id }"></div>
              <h2 class="logo-text__preview-text" >{{logoText}}</h2>
            </div>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import storage from '../../../service/storage'
import textJson from '../../../JSON/text.json'
import cmsJson from '../../../JSON/cms.json'

export default {
  name: 'HelloWorld',
    data: () => ({
      ...storage.getFontData(),
      width: '33%',
      fontItems: textJson,
      cms: cmsJson.selectFont
    }),
    mounted() {
        // this.a = window.localStorage.getItem('user');
    },
    methods: {
        changeFont(font, fontId){
          this.selectedFont = fontId;
          this.logoFont = font;
          storage.saveFontData(font, fontId);
        },
      example(e){
        var idIndex = this.fontItems.findIndex(item => item.id == e);
        var font = this.fontItems[idIndex].fontaFamily;
        var fontId = this.fontItems[idIndex].id
        this.changeFont(font, fontId)
        /* eslint-disable no-console */
        console.log(idIndex)
      }
    }
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

    .logo-text{
        &__preview-dark{
          @extend %textPreview;
          background: #333;
          color: white;
          border-radius: 8px 8px 0 0;
        }
        &__preview-light{
          @extend %textPreview;
          background: #fdfdfd;
          text-align: center;
          border: .5px solid #c4c4c4;
          border-radius: 0 0 8px 8px;
        }
        &__preview-text{
          position: relative;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
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
          color: white;
          background: #333;
          border: 0 solid #c4c4c4;
          transition: .25s;
        }
        &__font-selection-cards-indicators{
          width: 1%;
          height: 119px;
          background-image: linear-gradient(to bottom , #FF5F04, #FF9D42 );
          position: absolute;
          border-radius: 8px 0 0 8px;
        }
    }
</style>
