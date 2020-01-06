<template>
    <div>
        <div>
            <v-container fluid class="pt-12 mt-12 logo-customise">
                <v-row>
                    <v-col md="4" class="px-2">
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
                        <v-row class="px-2">
                            <v-card flat class="logo-customise__select-color-container-card">
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
                                                <v-radio label="Transparent" color="red" @change="bgTransparent"></v-radio>
                                                <v-radio label="Fill" color="red" @change="bgFill"></v-radio>
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
                            </v-card>
                            <v-card  flat class="mt-4 logo-customise__select-color-container-card">
                                <v-col md="12">
                                    <v-row class="px-4 mb-2">
                                        <h2>Change the icon scale</h2>
                                    </v-row>
                                    <v-row class="px-4">
                                        <v-col md="10" class="py-5">
                                            <v-slider
                                                v-model="iconScale"
                                                :value="currentLogoObj.iconScaleX"
                                                :label="currentLogoObj.iconScaleX"
                                                @change="changeIconScale(currentLogoObj.iconScaleX)"
                                                max="40"
                                                min="0"
                                            ></v-slider>
                                        </v-col>
                                        <v-col md="1" class="px-2">
                                            <v-avatar color="primary"><span class="white--text ">{{(0.5 + this.currentLogoObj.iconScaleX).toFixed(1)}}</span></v-avatar>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-card>
                            <v-card  flat class="mt-4 logo-customise__select-color-container-card">
                                <v-col md="12">
                                    <v-row class="px-4 mb-2">
                                        <v-col md="12" class="pa-0">
                                            <h2>Change font size</h2>
                                        </v-col>
                                        <v-col md="1" class="pa-0">
                                            <v-text-field
                                                :value="currentLogoObj.fontSize" 
                                                :label="currentLogoObj.fontSize" 
                                                v-model="fontSize" 
                                                @change="changeFontSize(currentLogoObj.fontSize)"
                                            >
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-card>
                        </v-row>
                    </v-col>
                    <v-col md="6" class="px-1">
                        <v-col md="12" ref="canvas" class="pa-0">
                            <canvas id="c" :width="canvasWidth" style="border:1px solid #000000;"></canvas>
                        </v-col>
                    </v-col>
                    <v-col md="2" class="px-1">
                        <v-row class="px-2">
                            <v-col md="12" class="py-0">
                                <h2>Do positioning</h2>
                            </v-col>
                        </v-row>
                        <v-card flat class="logo-customise__select-color-container-card mt-4">
                            <v-row class="px-2">
                                <v-col md="12" class="py-2">
                                    <h4>Text Position</h4>
                                </v-col>
                                <v-col md="2" class="py-5">
                                    <h3>x:</h3>
                                </v-col>
                                <v-col md="3" class="pa-0">
                                    <v-text-field  type="number" v-model="textLeft" @change="changeTextLeft"  :label="currentLogoObj.textLeft"></v-text-field>
                                </v-col>
                                <v-col md="1"></v-col>
                                <v-col md="2" class="py-5">
                                    <h3>y:</h3>
                                </v-col>
                                <v-col md="3" class="pa-0">
                                    <v-text-field type="number" v-model="textTop" @change="changeTextTop" :label="currentLogoObj.textTop"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="px-2">
                                <v-col md="12" class="pa-2">
                                    <v-btn class="logo-customise__position-button"  @click="position('textTc')">Top Center</v-btn>
                                </v-col>
                                <v-col md="4" class="pa-2">
                                    <v-btn class="logo-customise__position-button" @click="position('textLc')">left</v-btn>
                                </v-col>
                                <v-col md="4" class="pa-2">
                                    <v-btn class="logo-customise__position-button" @click="position('textC')">center</v-btn>
                                </v-col>
                                <v-col md="4" class="pa-2">
                                    <v-btn class="logo-customise__position-button" @click="position('textRc')">right</v-btn>
                                </v-col>
                                <v-col md="12" class="pa-2">
                                    <v-btn class="logo-customise__position-button" @click="position('textBc')">Bottom Center</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                        <v-card flat class="logo-customise__select-color-container-card mt-4">
                            <v-row class="px-2">
                                <v-col md="12" class="py-2">
                                    <h4>Icon Position</h4>
                                </v-col>
                                <v-col md="2" class="py-5">
                                    <h3>x:</h3>
                                </v-col>
                                <v-col md="3" class="pa-0">
                                    <v-text-field  type="number" v-model="iconLeft" @change="changeIconLeft"  :label="currentLogoObj.iconLeft"></v-text-field>
                                </v-col>
                                <v-col md="1"></v-col>
                                <v-col md="2" class="py-5">
                                    <h3>y:</h3>
                                </v-col>
                                <v-col md="3" class="pa-0">
                                    <v-text-field type="number" v-model="iconTop" @change="changeIconTop" :label="currentLogoObj.iconTop"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="px-2">
                                <v-col md="12" class="pa-2">
                                    <v-btn class="logo-customise__position-button"  @click="position('iconTc')">Top Center</v-btn>
                                </v-col>
                                <v-col md="4" class="pa-2">
                                    <v-btn class="logo-customise__position-button" @click="position('iconLc')">left</v-btn>
                                </v-col>
                                <v-col md="4" class="pa-2">
                                    <v-btn class="logo-customise__position-button" @click="position('iconC')">center</v-btn>
                                </v-col>
                                <v-col md="4" class="pa-2">
                                    <v-btn class="logo-customise__position-button" @click="position('iconRc')">right</v-btn>
                                </v-col>
                                <v-col md="12" class="pa-2">
                                    <v-btn class="logo-customise__position-button" @click="position('iconBc')">Bottom Center</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <v-btn class="save-logo" @click="saveLogoObject">Save Logo</v-btn>
        <v-btn @click="downloadSvg">Download</v-btn>
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
            iconTop : Number,
            textScaleX: Number,
            textScaleY: Number,
            iconScale: Number,
            iconScaleX: 0.5,
            iconScaleY: 0.5,
            fontSize: ''
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
            bgFill() {
                __bg.set({
                    backgroundColor: this.currentLogoObj.bgColor
                })
                __canvas.renderAll()
            },
            changeIconScale(){
                const logo = Logo.instance;
                logo.iconScaleX = 1/2 + this.iconScale/10;
                logo.iconScaleY = 1/2 +  this.iconScale/10;
                __svg.set({
                    scaleX : this.currentLogoObj.iconScaleX,
                    scaleY : this.currentLogoObj.iconScaleY
                });
                __svg.setCoords();
                __canvas.renderAll();
            },
            changeTextLeft(){
                const logo = Logo.instance;
                logo.textLeft = this.textLeft;
                logo.save();
                __text.set({
                    left: this.currentLogoObj.textLeft
                })
                __text.setCoords();
                __canvas.renderAll()
            },
            changeTextTop(){
                const logo = Logo.instance;
                logo.textTop = this.textTop;
                logo.save();
                __text.set({
                    top: this.currentLogoObj.textTop
                })
                __text.setCoords();
                __canvas.renderAll()
            },
            changeIconLeft(){
                const logo = Logo.instance;
                logo.iconLeft = this.iconLeft;
                logo.save();
                __svg.set({
                    left: this.currentLogoObj.iconLeft
                })
                __svg.setCoords();
                __canvas.renderAll()
            },
            changeIconTop(){
                const logo = Logo.instance;
                logo.iconTop = this.iconTop;
                logo.save();
                __svg.set({
                    top: this.currentLogoObj.iconTop
                })
                __svg.setCoords();
                __canvas.renderAll()
            },
            changeFontSize(){
                const logo = Logo.instance;
                logo.fontSize = this.fontSize;
                logo.save();
                __text.set({
                    fontSize : this.currentLogoObj.fontSize
                })
                __text.setCoords()
                __canvas.renderAll();
            },
            downloadSvg() {
                let canvasToSvg = __canvas.toSVG();
                const svgURL =  "data:image/svg+xml," + encodeURIComponent(canvasToSvg);
                const pngURL = __canvas.toDaataURL('image/png');
                const logo =  Logo.instance;
                logo.pngUrl = pngURL;
                logo.svgUrl = svgURL;
                logo.save();
                const a = this.$refs.a
                a.download = `${this.currentLogoObj.name}byDecabits.svg`
                a.href = svgURL
                a.click()
            },
            position(active){
                // tc = top center
                // bc = bottom center
                // c = center
                // lc = left center
                // rc = right center

                const logo = Logo.instance;
                switch (active) {
                    case 'textTc':
                        logo.textLeft = this.currentLogoObj.canvasWidth/2;
                        logo.textTop = (__text.height*__text.scaleY)/2 + (this.currentLogoObj.canvasWidth*3/4)*.10;
                    break;
                    case 'textBc':
                        logo.textLeft = this.currentLogoObj.canvasWidth/2;
                        logo.textTop =  (this.currentLogoObj.canvasWidth*3/4)*.90 - (__text.height*__text.scaleY)/2;
                    break;
                    case 'textC':
                        logo.textLeft = this.currentLogoObj.canvasWidth/2;
                        logo.textTop = this.currentLogoObj.canvasWidth*3/8;
                    break;
                    case 'textLc':
                        logo.textLeft = (__text.width*__text.scaleX)/2 + (this.currentLogoObj.canvasWidth)*.10;
                        logo.textTop =  this.currentLogoObj.canvasWidth*3/8;
                    break;
                    case 'textRc':
                        logo.textLeft = (this.currentLogoObj.canvasWidth)*.90 - (__text.width*__text.scaleX)/2;
                        logo.textTop =  this.currentLogoObj.canvasWidth*3/8;
                    break;
                    case 'iconTc':
                        logo.iconLeft = this.currentLogoObj.canvasWidth/2;
                        logo.iconTop = (__svg.height*__svg.scaleY)/2 + (this.currentLogoObj.canvasWidth*3/4)*.10;
                    break;
                    case 'iconBc':
                        logo.iconLeft = this.currentLogoObj.canvasWidth/2;
                        logo.iconTop =  (this.currentLogoObj.canvasWidth*3/4)*.90 - (__svg.height*__svg.scaleY)/2;
                    break;
                    case 'iconC':
                        logo.iconLeft = this.currentLogoObj.canvasWidth/2;
                        logo.iconTop = this.currentLogoObj.canvasWidth*3/8;
                    break;
                    case 'iconLc':
                        logo.iconLeft = (__svg.width*__svg.scaleX)/2 + (this.currentLogoObj.canvasWidth)*.10;
                        logo.iconTop =  this.currentLogoObj.canvasWidth*3/8;
                    break;
                    case 'iconRc':
                        logo.iconLeft = (this.currentLogoObj.canvasWidth)*.90 - (__svg.width*__svg.scaleX)/2;
                        logo.iconTop =  this.currentLogoObj.canvasWidth*3/8;
                    break;
                }
                logo.save();
                __text.set({
                    left : this.currentLogoObj.textLeft,
                    top: this.currentLogoObj.textTop
                });
                __text.setCoords();
                __svg.set({
                    left : this.currentLogoObj.iconLeft,
                    top: this.currentLogoObj.iconTop
                })
                __svg.setCoords();
                __canvas.renderAll()
            }
        },
        mounted() {
            this.textLeft = this.currentLogoObj.textLeft;
            this.textTop  = this.currentLogoObj.textTop;
            this.iconLeft = this.currentLogoObj.iconLeft;
            this.iconTop  = this.currentLogoObj.iconTop;
            this.iconScaleX = this.currentLogoObj.iconScaleX;
            this.iconScaleY = this.currentLogoObj.iconScaleY;
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
            });
            const { iconScaleX, iconScaleY, iconColor, iconLeft, iconTop } = this.currentLogoObj;
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
                fontSize: this.currentLogoObj.fontSize,
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
                if(e.hasOwnProperty('target') && e.target && e.target.get('type') === 'text'){
                    _this.textLeft = e.target.left;
                    _this.textTop = e.target.top;
                    _this.textScaleX = e.target.scaleX;
                    _this.textScaleY = e.target.scaleY;
                }
                if(e.hasOwnProperty('target') && e.target && e.target.get('type') === 'path' || e.target.get('type') === 'group'){
                    _this.iconLeft = e.target.left;
                    _this.iconTop = e.target.top;
                    _this.iconScaleX = e.target.scaleX;
                    _this.iconScaleY = e.target.scaleY;
                }
                __canvas.renderAll()
                
            })
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
                logo.textScaleX = this.textScaleX
                logo.textScaleY = this.textScaleY
                logo.save();
            },
            iconLeft(){
                const logo = Logo.instance;
                logo.iconLeft = this.iconLeft;
                logo.iconTop = this.iconTop;
                logo.iconScaleX = this.iconScaleX;
                logo.iconScaleY = this.iconScaleY;
                logo.save();
            }
        }
    };

</script>

<style lang="scss" scoped>
    @import './customise.scss'
</style>
