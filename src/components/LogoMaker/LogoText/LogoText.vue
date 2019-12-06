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
              label="select"  
            >
            </v-select>
            <div class="text-select-component__preview-dark" >
              <h2 class="text-select-component__preview-text" :style="{fontFamily:logoFont}">{{logoText}}</h2>
            </div>
            <div class="text-select-component__preview-light">
              <h2 class="text-select-component__preview-text"  :style="{fontFamily:logoFont}">{{logoText}}</h2>
            </div>
          </div>
        </v-col>
        <v-col md="8">
          <v-col md="3" v-for="(item, i) in fontItems" :key="i" style="float:left" >
            <div :style="{fontFamily:item.fontFamily}" @click="changeFont(item.fontFamily, item.id)" class="text-select-component__font-selection-cards">
              <div :class="{'text-select-component__font-selection-cards-indicators' : selectedFont === item.id }"></div>
              <h2 class="text-select-component__preview-text" >{{logoText}}</h2>
            </div>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
    data: () => ({
      logoText : JSON.parse(window.localStorage.getItem('localStorage')|| "{}").companyName,
      logoFont: JSON.parse((window.localStorage.getItem('localStorage') || "{}")).font || "'Fira Sans', sans-serif",
      selectedFont: JSON.parse((window.localStorage.getItem('localStorage'))).fontId || 1,
      width: '33%',
      fontItems: [
        { 
          id : 1,
          fontName : "Fira",
          fontFamily : "'Fira Sans', sans-serif"
        },
        {
          id : 2,
          fontName : "Noto Serif",
          fontFamily : "'Noto Serif', serif"
        },
        {
          id : 3,
          fontName : "Roboto",
          fontFamily : "'Roboto', sans-serif"
        },
        {
          id : 4,
          fontName : "Calistoga",
          fontFamily : "Calistoga"
        },
        {
          id : 5,
          fontName : "Ibarra",
          fontFamily : "'Ibarra Real Nova', serif"
        },
        {
          id : 6,
          fontName : "Alata1",
          fontFamily : "'Alata', sans-serif"
        },
        {
          id : 7,
          fontName : "Lato1",
          fontFamily : "'Lato', sans-serif"
        },
        { 
          id : 8,
          fontName : "Fira2",
          fontFamily : "'Fira Sans', sans-serif"
        },
        {
          id : 9,
          fontName : "Noto Serif3",
          fontFamily : "'Noto Serif', serif"
        },
        {
          id : 10,
          fontName : "Roboto4",
          fontFamily : "'Roboto', sans-serif"
        },
        {
          id : 11,
          fontName : "Calistoga5",
          fontFamily : "Calistoga"
        },
        {
          id : 12,
          fontName : "Ibarra6",
          fontFamily : "'Ibarra Real Nova', serif"
        },
        {
          id : 13,
          fontName : "Alata7",
          fontFamily : "'Alata', sans-serif"
        },
        {
          id : 14,
          fontName : "Lato8",
          fontFamily : "'Lato', sans-serif"
        },
        { 
          id : 15,
          fontName : "Fira",
          fontFamily : "'Fira Sans', sans-serif"
        },
        {
          id : 16,
          fontName : "Noto Serif10",
          fontFamily : "'Noto Serif', serif"
        },
        {
          id : 17,
          fontName : "Roboto9",
          fontFamily : "'Roboto', sans-serif"
        },
        {
          id : 18,
          fontName : "Calistoga11",
          fontFamily : "Calistoga"
        },
        {
          id : 19,
          fontName : "Ibarra12",
          fontFamily : "'Ibarra Real Nova', serif"
        },
        {
          id : 20,
          fontName : "Ala13",
          fontFamily : "'Alata', sans-serif"
        },
        {
          id : 21,
          fontName : "Lato",
          fontFamily : "'Lato', sans-serif"
        }
      ],
    }),
    mounted() {
        // this.a = window.localStorage.getItem('user');
    },
    methods: {
        changeFont(font, fontId){
          this.selectedFont = fontId;
          this.logoFont = font;
          const localStorageData = JSON.parse(window.localStorage.getItem('localStorage') || "{}"); 
          window.localStorage.setItem('localStorage', JSON.stringify({...localStorageData, font , fontId}));
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

    .text-select-component{
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
