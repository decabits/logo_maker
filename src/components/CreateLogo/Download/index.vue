<template>
  <v-container class="download">
    <v-row class="mt-12 pt-12 download__container">
        <v-col class="col-12 col-md-12 col-sm-12 mt-12">
            <h2 class="download__container__head">Download Your logo in svg, png and jpg formate</h2>
            <v-divider
                class="pa-0 mt-4"
                horizontal
            >
            </v-divider>
        </v-col>
        <v-col class="col-12" sm="4" md="2">
            <v-btn class="download__container__button-png" @click="downloadPng">png</v-btn>
        </v-col>
        <v-col class="col-12" md="2" sm="2" >
            <v-btn class="download__container__button-jpg" @click="downloadjpg">Jpeg</v-btn>
        </v-col>
        <v-col md="2" class="col-12" sm="2" >
            <v-btn class="download__container__button-svg" @click="downloadSvg">Svg</v-btn>
        </v-col>
        <v-col md="6" sm="12" class="col-12">
            <v-btn class="download__container__button-tpng" @click="downloadTpng">Png with no background</v-btn>
        </v-col>
        <v-col md="12" class="col-12">
            <v-divider
                class="pa-0 mt-1"
                horizontal
            >
            </v-divider>
        </v-col>
        <a ref="a"></a>
    </v-row>
  </v-container>
</template>

<script>

  export default { 
    data: () => ({
    
    }),
    props: {
        currentLogoObj: {
            type: Object
        }
    },
    methods: {
        downloadSvg(){
            const a = this.$refs.a
            a.download = `${this.currentLogoObj.name}byDecabits.svg`
            a.href = this.currentLogoObj.svgUrl
            a.click()
        },
        downloadPng(){
            const a = this.$refs.a
            a.download = `${this.currentLogoObj.name}byDecabits.png`
            a.href = this.currentLogoObj.pngUrl
            a.click()
        },
        downloadTpng(){
            const a = this.$refs.a
            a.download = `${this.currentLogoObj.name}byDecabits.png`
            a.href = this.currentLogoObj.transparentPngUrl
            a.click()
        }
    }

  }

</script>

<style lang="scss" scoped>
    @import './download.scss'
</style>
