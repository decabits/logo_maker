import storage from "../../../service/storage";
const methods = {
    saveText() {
        let brandName = this.logoText;
        storage.saveBrandName(brandName);
    }
}

export default methods