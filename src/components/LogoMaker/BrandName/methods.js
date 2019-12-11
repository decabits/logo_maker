import storage from "../../../model/storage";
const methods = {
    saveText() {
        storage.saveBrandName(this.logoText);
    }
}

export default methods;