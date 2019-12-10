export default {
    saveBrandName(brandName){
        const localStorageData = JSON.parse(window.localStorage.getItem('localStorage') || "{}");
        window.localStorage.setItem('localStorage', JSON.stringify({...localStorageData, brandName}));
    },
    saveFontData(font, fontId ){
        const localStorageData = JSON.parse(window.localStorage.getItem('localStorage') || "{}"); 
        window.localStorage.setItem('localStorage', JSON.stringify({...localStorageData, font , fontId}));
    },
    saveIconData(icon, iconId ){
        const localStorageData = JSON.parse(window.localStorage.getItem('localStorage') || "{}"); 
        window.localStorage.setItem('localStorage', JSON.stringify({...localStorageData, icon , iconId}));
    },
    getFontData(){
        return {
            logoText : JSON.parse(window.localStorage.getItem('localStorage')|| "{}").brandName || "",
            logoFont: JSON.parse((window.localStorage.getItem('localStorage') || "{}")).font || "'Fira Sans', sans-serif",
            selectedFont: JSON.parse((window.localStorage.getItem('localStorage'))).fontId || 1,
        }
    },
    getIconData(){
        return {
            logoIcon: JSON.parse((window.localStorage.getItem('localStorage') || "{}")).icon || "image1",
            selectedIcon: JSON.parse((window.localStorage.getItem('localStorage'))).iconId || 1,
        }
    }
}