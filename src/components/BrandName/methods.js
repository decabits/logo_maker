const methods = {
    saveText() {
        let companyName = this.logoText;
        const localStorageData = JSON.parse(window.localStorage.getItem('localStorage') || "{}");
        window.localStorage.setItem('localStorage', JSON.stringify({...localStorageData, companyName}));
    }
}

export default methods