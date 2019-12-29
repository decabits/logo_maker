<template>
    <div>
        <div>
            <v-container fluid class="pt-12 mt-12 logo-customise">
                <v-row>
                    <v-col md="4">
                        <v-color-picker 
                            style="position: absolute; z-index: 9;"
                            v-if="showTextColorPalet"
                            :mode.sync="mode" 
                            show-swatches 
                            v-model="textColor" 
                            swatches-max-height="300px"
                        >
                        </v-color-picker>
                        <v-color-picker 
                            style="position: absolute; z-index: 9;"
                            v-if="showBgColorPalet"
                            :mode.sync="mode" 
                            show-swatches 
                            v-model="bgColor" 
                            swatches-max-height="300px"
                        >
                        </v-color-picker>
                        <v-color-picker 
                            style="position: absolute; z-index: 9;"
                            v-if="showIconColorPalet"
                            :mode.sync="mode" 
                            show-swatches 
                            v-model="iconColor"
                            @change="saveIconColor(iconColor)"
                            swatches-max-height="300px"
                        >
                        </v-color-picker>
                        <div v-if="showTextColorPalet" style="position:fixed; z-index:8; top:0; left:0; width: 100%; height: 100vh;" @click="showTextColorPalet = false"></div>
                        <div v-if="showBgColorPalet" style="position:fixed; z-index:8; top:0; left:0; width: 100%; height: 100vh;" @click="showBgColorPalet = false"></div>
                        <div v-if="showIconColorPalet" style="position:fixed; z-index:8; top:0; left:0; width: 100%; height: 100vh;" @click="showIconColorPalet = false"></div>
                        <v-row>
                            <v-col md="12">
                                <v-row class="px-4 mb-2">
                                    <h2>Select color</h2>
                                </v-row>
                                <v-row class="px-4 mb-2">
                                    <v-col md="1" class="pa-0">
                                        <div class="logo-customise__select-text-color" :style="{background: currentLogoObj.textColor}" @click="selectedTextColor"></div>
                                    </v-col>
                                    <v-col md="11" class="pa-1 logo-customise__select-color-container">
                                        <h4>Click to change the color of text color</h4>
                                    </v-col>
                                </v-row>
                                <v-row class="px-4 mb-2">
                                    <v-col md="12" class="pa-0 ma-0">
                                        <v-radio-group v-model="bgStatus" row>
                                            <v-radio label="Transparent" @change="bgTransparent"></v-radio>
                                            <v-radio label="Fill"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                    <v-col md="1" class="pa-0" v-if="bgStatus === 1">
                                        <div class="logo-customise__select-bg-color" :style="{background: currentLogoObj.bgColor}" @click="selectedBgColor"></div>
                                    </v-col>
                                    <v-col md="11" class="pa-1 logo-customise__select-color-container" v-if="bgStatus === 1">
                                        <h4>Click to change the color of background color</h4>
                                    </v-col>
                                </v-row>
                                <v-row class="px-4">
                                    <v-col md="1" class="pa-0">
                                        <div class="logo-customise__select-icon-color" :style="{background: currentLogoObj.iconColor}" @click="selectedIconColor"></div>
                                    </v-col>
                                    <v-col md="11" class="pa-1 logo-customise__select-color-container">
                                        <h4>Click to change the color of icon color</h4>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col md="12">
                                <v-row class="px-4 mb-2">
                                    <h2>Selcet Font Size</h2>
                                </v-row>
                                <v-row class="px-4">
                                    <v-col md="3" class="py-5">
                                        <h4>Icon width</h4>
                                    </v-col>
                                    <v-col md="1" class="pa-0">
                                        <v-text-field  label="14"></v-text-field>
                                    </v-col>
                                    <v-col md="1"></v-col>
                                    <v-col md="3" class="py-5">
                                        <h4>Icon Heigth</h4>
                                    </v-col>
                                    <v-col md="1" class="pa-0">
                                        <v-text-field  label="14"></v-text-field>
                                    </v-col>
                                    <v-col md="3"></v-col>
                                    <v-col md="3" class="py-5">
                                        
                                        <h3>Icon scale</h3>
                                    </v-col>
                                    <v-col md="1" class="pa-0">
                                        <v-text-field label="1"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col md="6">
                        <v-col md="12" ref="canvas">
                            <canvas id="c" :width="canvasWidth" @object:moving="drag" style="border:1px solid #000000;"></canvas>
                        </v-col>
                    </v-col>
                    <v-col md="2">
                         <v-row class="px-2">
                            <h2>Do positioning</h2>
                         </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <v-btn class="save-logo" @click="logSvgObj">svgObj</v-btn>
        <v-btn class="save-logo" @click="saveLogoObject">Save Logo</v-btn>
        <v-btn @click="downloadSvg">Download</v-btn>
        <v-btn @click="textCenter">center</v-btn>
        <a  ref="a"></a>
    </div>
</template>

<script>
    import { fabric } from 'fabric'
    import Logo from '../../../models/logo'

    let __canvas = null;
    let __svg = null;
    let __text = null;
    let __bg = null;

    export default {
        name: 'Customise',
        components: {
        },
        data: () => ({
            direct: false,
            canvasWidth: Number,
            iconWidth: Number,
            mode: 'hexa',
            showTextColorPalet: false,
            showBgColorPalet: false,
            showIconColorPalet: false,
            textColor: '',
            iconColor: '',
            bgColor: '',
            bgStatus: 1,
            iconX: Number,
            iconY: '',
            svgURL: '',
            textTop: Number,
            textLeft: Number,
            iconLeft: Number,
            iconTop : Number
        }),
        props: {
            currentLogoObj : {
                type : Object
            }
        },
        methods:{
            saveLogoObject() {
                const logo = Logo.instance
                logo.saveObject()
                this.direct = true
                this.$router.push({path:'/company-name'})
            },
            selectedTextColor() {
                this.showTextColorPalet = true
                this.textColor = this.currentLogoObj.textColor
            },
            selectedBgColor() {
                this.showBgColorPalet = true
                this.bgColor = this.currentLogoObj.bgColor  
            },
            selectedIconColor() {
                this.showIconColorPalet = true
                this.iconColor = this.currentLogoObj.iconColor
            },
            saveTextColor(color) {
                const logo = Logo.instance;
                logo.textColor = color;
                logo.save();
            },
            bgTransparent() {
                __bg.set({
                    backgroundColor: 'transparent'
                })
                __canvas.renderAll()
            },
            downloadSvg() {
                let canvasToSvg = __canvas.toSVG();
                const svgURL =  "data:image/svg+xml," + encodeURIComponent(canvasToSvg);
                const a = this.$refs.a
                a.download = `${this.currentLogoObj.name}byDecabits.svg`
                a.href = svgURL
                a.click()
            },
            logSvgObj(){
                // eslint-disable-next-line no-console
                console.log(__svg)
            },
            textCenter(){
                const logo = Logo.instance;
                logo.textLeft = this.currentLogoObj.canvasWidth/2;
                logo.textTop = this.currentLogoObj.canvasWidth*3/8;
                logo.save();
                __text.set({
                    left : this.currentLogoObj.textLeft,
                    top: this.currentLogoObj.textTop
                });
                __text.setCoords()
                __canvas.renderAll()


            },
            drag(){
                alert('j')
            }
        },
        mounted() {
            const logo = Logo.instance;
            logo.canvasWidth = this.$refs.canvas.clientWidth;
            logo.save();
            __canvas = new fabric.Canvas('c');
            __bg = __canvas.setDimensions({
                width:this.currentLogoObj.canvasWidth, 
                height:this.currentLogoObj.canvasWidth*3/4, 
            });
            __bg.set({
                backgroundColor: this.currentLogoObj.bgColor,
            })
            let iconScaleX = this.currentLogoObj.iconScale;
            let iconScaleY = this.currentLogoObj.iconScale;
            let iconColor = this.currentLogoObj.iconColor;
            let iconLeft = this.currentLogoObj.iconLeft;
            let iconTop = this.currentLogoObj.iconTop;
            fabric.loadSVGFromURL(this.currentLogoObj.icon, function(objects, options) {
                __svg = fabric.util.groupSVGElements(objects, options);
                __svg.set({
                    scaleX:  iconScaleX,
                    scaleY : iconScaleY,
                    originX: 'center',
                    originY: 'center',
                    fill :iconColor,
                    left: iconLeft,
                    top:  iconTop,
                });
                if(__svg.hasOwnProperty('_objects')) __svg._objects.forEach(_=>_.set({fill: iconColor}));
                __canvas.add(__svg)
            });
            __text = new fabric.Text(this.currentLogoObj.name, {
                textAlign: 'center',
                fontSize: 56,
                fontFamily: this.currentLogoObj.font,
                fill : this.currentLogoObj.textColor
            });
            __canvas.add(__text)
            __text.set({
                originX: 'center',
                originY: 'center',
                left: this.currentLogoObj.textLeft,
                top: this.currentLogoObj.textTop,
            });
            __text.setCoords()
            __canvas.renderAll();

            const _this = this
            __canvas.on('object:modified', function(e){

                // eslint-disable-next-line no-console
                console.log(e.target.get('type'))

                if(e.hasOwnProperty('target') && e.target && e.target.get('type') === 'text'){
                    _this.textLeft = e.target.left;
                    _this.textTop = e.target.top;
                }
                if(e.hasOwnProperty('target') && e.target && e.target.get('type') === 'path' || e.target.get('type') === 'group'){
                    _this.iconLeft = e.target.left;
                    _this.iconTop = e.target.top;
                }
                __canvas.renderAll()
                
            })
                // const type = e.target.get('type');
               
                // if(type === 'group'){
                //     this.saveIconPosition(left,top)
                // }
                // if(type === 'text'){
                //     const logo = Logo.instance;
                //     logo.textLeft = left;
                //     logo.save();
                // }

            // this.textLeft = this.currentLogoObj.textLeft
            // this.textTop = this.currentLogoObj.textTop
        },
        watch : {
            textColor(){
                const logo = Logo.instance;
                logo.textColor = this.textColor;
                logo.save();
                __text.set({
                    fill: this.currentLogoObj.textColor
                })
                __canvas.renderAll()
            },
            bgColor(){
                const logo = Logo.instance;
                logo.bgColor = this.bgColor;
                logo.save();
                __bg.set({
                    backgroundColor: this.currentLogoObj.bgColor
                })
                __canvas.renderAll()
            },
            iconColor(){
                const logo = Logo.instance;
                logo.iconColor = this.iconColor;
                logo.save();
                __svg.set({
                    fill: this.currentLogoObj.iconColor
                });
                if(__svg.hasOwnProperty('_objects')) __svg._objects.forEach(_=>_.set({fill: this.currentLogoObj.iconColor})); 
                __canvas.renderAll()
            },
            textLeft(){
                const logo = Logo.instance;
                logo.textLeft = this.textLeft;
                logo.textTop = this.textTop;
                logo.save();
                __svg.set({
                    left: this.currentLogoObj.textLeft,
                    top: this.currentLogoObj.textTop
                })
                __canvas.renderAll()
            },
            textTop(){
                const logo = Logo.instance;
                logo.iconLeft = this.iconLeft;
                logo.iconTop = this.iconTop;
                logo.save();
                __svg.set({
                    left: this.currentLogoObj.iconLeft,
                    top: this.currentLogoObj.iconTop,
                })
                __canvas.renderAll()
            },
            iconX(){
                alert('kjl')
            }
        }
    };

</script>

<style lang="scss" scoped>
    @import './customise.scss'
</style>
