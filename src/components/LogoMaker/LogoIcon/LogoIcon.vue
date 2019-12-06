<template>
<div>
  <v-container class="icon-select-component pt-12 mt-12" fluid>
    <v-row >
      <v-col md="4">
        <div style="position: fixed;" :style="{'width': width}">
          <v-select
            v-model="logoIcon"
            :items="iconItems"
            item-text="imageName"
            item-value="image"
            label="Select icon for your logo"
          >
          </v-select>
          <div class="icon-select-component__preview-dark">
            <img class="icon-select-component__preview-icon"  :src="logoIcon" alt="">
            </div>
            <div class="icon-select-component__preview-light">
            <img class="icon-select-component__preview-icon"  :src="logoIcon" alt="">
          </div>
        </div>
      </v-col>
      <v-col md="8">
          <v-col md="3" v-for="(item, i) in iconItems" :key="i" style="float:left" >
            <div  @click="changeIcon(item.image, item.id)" class="icon-select-component__font-selection-cards">
              <div :class="{'icon-select-component__icon-selection-cards-indicators' : selectedIcon === item.id }"></div>
              <img class="icon-select-component__preview-icon"  :src="item.image" alt="">
            </div>
          </v-col>
      </v-col>
    </v-row>
    </v-container>
</div>
</template>

<script>
import image1 from "../../../assets/logo.svg"

export default {
  name: 'HelloWorld',
    data: () => ({
      logoIcon: JSON.parse((window.localStorage.getItem('localStorage') || "{}")).icon || image1,
      opacity: 0,
      selectedIcon: JSON.parse((window.localStorage.getItem('localStorage'))).iconId || 1,
      width: '33%',
      iconItems:[
        {
          id: 1,
          image: image1,
          imageName: "image3"
        },
        {
          id: 2,
          image: image1,
          imageName: "image4"
        },
        {
          id: 3,
          image: image1,
          imageName: "image5"
        },
        {
          id: 4,
          image: image1,
          imageName: "image3"
        },
        {
          id: 5,
          image: image1,
          imageName: "image4"
        },
        {
          id: 6,
          image: image1,
          imageName: "image5"
        },
        {
          id: 7,
          image: image1,
          imageName: "image3"
        },
        {
          id: 8,
          image: image1,
          imageName: "image4"
        },
        {
          id : 9,
          image: image1,
          imageName: "image5"
        },
        {
          id: 10,
          image: image1,
          imageName: "image3"
        },
        {
          id: 11,
          image: image1,
          imageName: "image4"
        },
        {
          id: 12,
          image: image1,
          imageName: "image5"
        },
        {
          id: 13,
          image: image1,
          imageName: "image3"
        },
        {
          id: 14,
          image: image1,
          imageName: "image4"
        },
        {
          id: 15,
          image: image1,
          imageName: "image5"
        },
        {
          id: 16,
          image: image1,
          imageName: "image3"
        },
        {
          id: 17,
          image: image1,
          imageName: "image4"
        },
        {
          id: 18,
          image: image1,
          imageName: "image5"
        },
        {
          id: 19,
          image: image1,
          imageName: "image3"
        },
      ]
    }),
    methods: {
        changeIcon(icon, iconId){
            this.logoIcon = icon;
            this.selectedIcon = iconId;
            const localStorageData = JSON.parse(window.localStorage.getItem('localStorage') || "{}"); 
            window.localStorage.setItem('localStorage', JSON.stringify({...localStorageData, icon, iconId}));
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

    .icon-select-component{
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