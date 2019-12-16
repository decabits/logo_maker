class Logo {

  constructor(name = '', description = '', url = '', fontId = 1, createdAt = new Date().getTime(), updatedAt = new Date().getTime()) {
    this.name = name;
    this.description = description;
    this.url = url;
    this.fontId = fontId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  save = () => {
    const storage = new Storage();
    const data = storage.getAll();
    const logos = data.logos;
    logos.push(this.serialize());
    storage.set(data);
  };

  serialize = () => {
    const {name, description, url, fontId, createdAt, updatedAt} = this;
    return {name, description, url, fontId, createdAt, updatedAt}
  }
}
