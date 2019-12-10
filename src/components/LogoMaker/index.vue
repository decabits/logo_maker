<template>
    <v-app style="background: #fdfdfd;">
        <v-app-bar color="#fdfdfd" flat fixed class="pa-0" height="auto;">
            <v-container fluid class="pa-0"
        >
            <v-row class="pa-0">
                <v-col md="3" class="pa-0">
                    <v-btn 
                        @click="btnActive('btn1')" 
                        :class="{'styling-button1': activeBtn === 'btn1'}"
                        class="styling-button"
                    >
                        Select Font
                    </v-btn>
                </v-col>
                <v-col md="3" class="pa-0">
                    <v-btn 
                        @click="btnActive('btn2')" 
                        :class="{'styling-button1': activeBtn === 'btn2'}" 
                        class="styling-button"
                    >
                        Select icon
                    </v-btn>
                </v-col>
                <v-col md="3" class="pa-0">
                    <v-btn 
                        @click="btnActive('btn3')" 
                        :class="{'styling-button1': activeBtn === 'btn3'}" 
                        class="styling-button"
                    >
                        Customise
                    </v-btn>
                </v-col>
                 <v-col md="3" class="pa-0">
                    <v-btn 
                        @click="btnActive('btn4')" 
                        :class="{'styling-button1': activeBtn === 'btn4'}" 
                        class="styling-button"
                    >
                        Download
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        </v-app-bar>
        <transition name="fade"  >
                <LogoText v-if="activeBtn === 'btn1'" />
        </transition>

        <transition name="fade" >
                <LogoIcon v-if="activeBtn === 'btn2'" />
        </transition>

        <transition name="fade"  >
                <div v-if="activeBtn === 'btn3'">
                    <p>djjk</p>
                </div>
        </transition>
    </v-app>
</template>

<script>
import LogoText from './LogoText/index';
import LogoIcon from './LogoIcon/index'
export default {
  name: 'BrandName',
  components: {
      LogoText,
      LogoIcon
  },
  data: () => ({
      drawer: Boolean,
      activeBtn: 'btn1',
  }),
  methods:{
    btnActive(value){
        this.activeBtn = value;
    }
  },
  computed: {
    
  }
};
</script>
<style lang="scss" scoped>
    .styling-button{
        background-color: #fdfdfd !important;
        box-shadow: none;
        width: 100%;
        height: 64px !important;
        margin-top: 8px;
        color: #555;
        border-radius: 0;
        margin-top: 0;
    }
    .styling-button1{
        width: 100% !important;
        background-image: linear-gradient(to right, #1596DF, #0057FF );
        height: 84px !important;
        color: white;
        transition: 1s;
    }
    .styling-button:hover{
        color: #9CDBFF;
    }
 
       .fade-enter-to, .fade-leave {
  transition: 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>