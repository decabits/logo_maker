const data = () => ({
    logoText : JSON.parse(window.localStorage.getItem('localStorage')|| "{}").companyName
}) ; 

export default data ; 