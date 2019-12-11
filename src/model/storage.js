class Logo {
    getStorageData = () => JSON.parse(window.localStorage.getItem('localStorage') || "{}")

    setStorageData = data => localStorage.setItem('localStorage', JSON.stringify({...this.getStorageData() , ...data}))

    saveBrandName(brandName){
        this.setStorageData({brandName});
    }

    saveFontData(font, fontId){
        this.setStorageData({font , fontId});
    }

    saveIconData(icon, iconId ){
        this.setStorageData({icon , iconId});
    }
    
    getFontData(){
        return {
            logoText : this.getStorageData().brandName || "",
            logoFont: this.getStorageData().font || "'Fira Sans', sans-serif",
            selectedFont: this.getStorageData().fontId || 1,
        }
    }

    getIconData(){
        return {
            logoIcon: this.getStorageData().icon || "image1",
            selectedIcon: this.getStorageData().iconId || 1,
        }
    }
}

export default new Logo();
