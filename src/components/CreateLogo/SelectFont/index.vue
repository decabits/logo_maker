<template>
  <div>
    <v-container fluid class="pt-12 mt-12">
      <v-row>
        <v-col md="4">
          <div style="position: fixed;" :style="{'width': width}">
            <v-select
              @change="selectFont(currentLogoObj.fontId)"
              v-model="currentLogoObj.fontId"
              :items="fontItems"
              item-text="fontName"
              item-value="id"
              :value="currentLogoObj.fontId"
              :label="cms.previewComponent.label"  
            >
            </v-select>
            <div class="logo-text__preview-dark" >
              <h2 class="logo-text__preview-text" :style="{fontFamily:currentLogoObj.font}">{{currentLogoObj.name}}</h2>
            </div>
            <div class="logo-text__preview-light">
              <h2 class="logo-text__preview-text"  :style="{fontFamily:currentLogoObj.font}">{{currentLogoObj.name}}</h2>
            </div>
          </div>
        </v-col>
        <v-col md="8">
          <v-col :md="cardGrid" v-for="(item, i) in fontItems" :key="i" style="float:left" >
            <div :style="{fontFamily:item.fontFamily}" @click="changeFont(item.fontFamily, item.id)" class="logo-text__font-selection-cards">
              <div :class="{'logo-text__font-selection-cards-indicators' : currentLogoObj.fontId === item.id }"></div>
              <h2 class="logo-text__preview-text" >{{currentLogoObj.name}}</h2>
            </div>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import Logo from '../../../models/logo'
  import textJson from '../../../common/data/fonts.json'
  import cmsJson from '../../../common/data/messages.json'

  export default {
    name: 'HelloWorld',
    data: () => ({
      width: '33%',
      fontItems: textJson,
      cms: cmsJson.selectFont,
      cardGrid: Number
    }),
    props: {
      currentLogoObj : {
        type : Object
      }
    },
    methods: {
      changeFont(font, fontId){
        const logo = Logo.instance;
        logo.font = font;
        logo.fontId = fontId;
        logo.save();
      },
      selectFont(id){
        let array = this.fontItems
        let slectedArray = array.filter((e) => e.id == id )
        const font = slectedArray[0].font;
        this.changeIcon(font, id)
      }
          
    },
    mounted() {
      let char = this.currentLogoObj.name.length;
      if (char > 0 && char <= 6) {
        this.cardGrid = 3
      }
      else if (char > 6 && char <=12) {
        this.cardGrid = 4;
      }
      else if(char > 12 && char<=23) {
        this.cardGrid = 6;
      }
      else if (char> 24) {
        this.cardGrid = 12
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import './selectFont.scss'

</style>
