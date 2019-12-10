const data = () => ({
    logoText : JSON.parse(window.localStorage.getItem('localStorage')|| "{}").brandName
}) ; 

export default data ; 