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
            <SelectFont v-if="activeBtn === 'btn1'" :currentLogoObj="currentLogoObj"/>
        </transition>

        <transition name="fade" >
            <SelectIcon v-if="activeBtn === 'btn2'" :currentLogoObj="currentLogoObj" />
        </transition>

        <transition name="fade"  >
            <Customise v-if="activeBtn === 'btn3'" :currentLogoObj="currentLogoObj" />
        </transition>
    </v-app>
</template>

<script>
    import Logo from '../../models/logo'
    import SelectFont from './SelectFont/index'
    import SelectIcon from './SelectIcon/index'
    import Customise from './Customise/index'

    export default {
        name: 'BrandName',
        components: {
            SelectFont,
            SelectIcon,
            Customise
        },
        data: () => ({
            drawer: Boolean,
            activeBtn: 'btn1',
            currentLogoObj: Logo.instance
        }),
        methods:{
            btnActive(value){
                this.activeBtn = value;
            }
        }

    };

</script>

<style lang="scss" scoped>
    @import './createLogo.scss'
    
</style>