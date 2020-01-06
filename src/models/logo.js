import Storage from '../services/storage';

class Logo {

  constructor({id = 1, name = '', font = '' , fontId = 1, icon = '', iconId = 1,  pngUrl = '', svgUrl = '', current = true, textColor = '#000000', bgColor = '#000000', iconColor = '#000000', canvasWidth = Number , textScaleX = Number , textScaleY = Number , fontSize = 24 ,createdAt = new Date().getTime(), updatedAt = new Date().getTime()}) {
    this.name = name;
    this.textColor = textColor;
    this.bgColor = bgColor;
    this.iconColor = iconColor;
    this.id = id;
    this.current = current;
    this.pngUrl = pngUrl;
    this.svgUrl = svgUrl;
    this.font = font;
    this.fontId = fontId;
    this.icon = icon;
    this.textScaleX = textScaleX;
    this.textScaleY = textScaleY;
    this.iconScaleX = .35;
    this.iconScaleY = .35;
    this.iconId = iconId;
    this.fontSize = fontSize;
    this.canvasWidth =canvasWidth;
    this.textLeft = this.canvasWidth/2;
    this.textTop = this.canvasWidth/2;
    this.iconLeft = this.canvasWidth/2;
    this.iconTop = this.canvasWidth/2;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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
    logoArray.push(currentLogo)
    storage.setAll(logoArray);
    const index = logoArray.length-1;
    storage.clear();
    this.id = index + 2;
  }

  serialize = () => {
    const {name, font, description, url, fontId, createdAt, id, icon, iconId, current, iconColor, textColor, bgColor, iconScale, fontSize, canvasWidth, iconLeft, iconTop, textLeft, textTop, textScaleX, textScaleY, iconScaleX, iconScaleY, updatedAt} = this;
    return {name,font,  description, url, fontId, createdAt, id, icon, iconId, current, iconColor, textColor, bgColor , iconScale, fontSize, canvasWidth, iconLeft, iconTop, textLeft, textTop , textScaleX, textScaleY, iconScaleX, iconScaleY, updatedAt}
  }

}

const storage = new Storage();
Logo.instance = new Logo(storage.get()); 

export default Logo ;
