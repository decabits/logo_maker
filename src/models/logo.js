import Storage from '../services/storage';

class Logo {

  constructor({id = 1, name = '', font = '' , fontId = 1, icon = '', iconId = 1, transparentPngUrl='',  pngUrl = '', svgUrl = '', current = true, textColor = '#fff', bgColor = '#000000', iconColor = '#fff', canvasWidth = Number , svgEl = '', textScaleX = Number , textScaleY = Number , iconScaleX = .35, iconScaleY = .35, fontSize = 24 ,createdAt = new Date().getTime(), updatedAt = new Date().getTime()}) {
    this.name = name;
    this.textColor = textColor;
    this.bgColor = bgColor;
    this.iconColor = iconColor;
    this.id = id;
    this.current = current;
    this.pngUrl = pngUrl;
    this.svgUrl = svgUrl;
    this.font = font;
    this.svgEl = svgEl;
    this.fontId = fontId;
    this.icon = icon;
    this.textScaleX = textScaleX;
    this.textScaleY = textScaleY;
    this.iconScaleX = iconScaleX;
    this.iconScaleY = iconScaleY;
    this.transparentPngUrl = transparentPngUrl;
    this.iconId = iconId;
    this.fontSize = fontSize;
    this.canvasWidth = canvasWidth;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  calculateWidths = () => {
    this.textLeft = this.textLeft ||  Number(this.canvasWidth)/2 ;
    this.textTop =  this.textTop || Number(this.canvasWidth)*57/160 + 40;
    this.iconLeft = this.iconLeft || Number(this.canvasWidth)/2;
    this.iconTop = this.iconTop || Number(this.canvasWidth)*57/160 -322/2*this.iconScaleX;
  }

  save = () => {
    const currentLogo = this.serialize();
    const storage = new Storage();
    storage.set(currentLogo);
  };

  saveObject = () => {
    const currentLogo = this.serialize();
    currentLogo.current = false;
    const storage = new Storage();
    const logoArray = storage.getAll();
    if(logoArray.some(el => el.id === currentLogo.id )){
      var index = logoArray.length - 1
      logoArray[index] = currentLogo;
      storage.setAll(logoArray);
    }
    else {
      logoArray.push(currentLogo)
      storage.setAll(logoArray);
      const index = logoArray.length-1;
      storage.clear();
      this.id = index + 2;
    }
  }

  serialize = () => {
    const {name, font, description, url, fontId, createdAt, id, icon, iconId, current, iconColor, textColor, bgColor, svgUrl, pngUrl, transparentPngUrl,iconScale, fontSize, canvasWidth, iconLeft, iconTop, textLeft, textTop,svgEl , textScaleX, textScaleY, iconScaleX, iconScaleY, updatedAt} = this;
    return {name,font,  description, url, fontId, createdAt, id, icon, iconId, current, iconColor, textColor, bgColor , svgUrl, pngUrl, transparentPngUrl, iconScale, fontSize, canvasWidth, iconLeft, iconTop, textLeft, textTop , svgEl, textScaleX, textScaleY, iconScaleX, iconScaleY, updatedAt}
  }

}

const storage = new Storage();
Logo.instance = new Logo(storage.get()); 

export default Logo ;
