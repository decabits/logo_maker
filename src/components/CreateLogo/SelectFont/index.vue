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
  import storage from '../../../model/storage'
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
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../../style/selectFont.scss'

</style>
