/*
  Example Data
  {
    logos: [{ name: 'Xyz', description: 'Random Description', url: 'Random Url', font_id: 2, createdAt: 1576501645038, updatedAt: 1576501645038 }];
    user: [{ name: 'Sahil', email: 'sahil@decabits.com', company_name: 'Decabits']
  }
 */
import constant from '../common/constants.json'

class Storage {
  get = () => JSON.parse(window.localStorage.getItem(constant.currentStorageKey) || "{}")

  set = data => localStorage.setItem(constant.currentStorageKey, JSON.stringify(data));

  clear = () => window.localStorage.removeItem(constant.currentStorageKey)

  setAll = data => localStorage.setItem(constant.localStorageRootKey, JSON.stringify(data))

  getAll = () => JSON.parse(window.localStorage.getItem(constant.localStorageRootKey) || "[]")
}

export default Storage;
