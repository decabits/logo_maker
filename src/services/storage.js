/*
  Example Data
  {
    logos: [{ name: 'Xyz', description: 'Random Description', url: 'Random Url', font_id: 2, createdAt: 1576501645038, updatedAt: 1576501645038 }];
    user: [{ name: 'Sahil', email: 'sahil@decabits.com', company_name: 'Decabits']
  }
 */
class Storage {
  getAll = () => JSON.parse(window.localStorage.getItem(constant.localStorageRootKey) || "{}")

  setAll = data => localStorage.setItem(constant.localStorageRootKey, JSON.stringify(data));
}

export default Storage;
