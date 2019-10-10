class Store {
  constructor({keyStorage, store}) {
    this._keyStorage = keyStorage;
    this._store = store;
  }

  setItem({key, item}) {
    const items = this.getAll();
    items[key] = item;

    this._store.setItem(this._keyStorage, JSON.stringify(items));
  }

  removeItem({key}) {
    const items = this.getAll();
    delete items[key];

    this._store.setItem(this._keyStorage, JSON.stringify(items));
  }

  getItem({key}) {
    const items = this.getAll();
    return items[key];
  }

  getAll() {
    const emptyItems = {};
    const items = this._store.getItem(this._keyStorage);

    if (!items) {
      return emptyItems;
    }

    try {
      return JSON.parse(items);
    } catch (e) {
      return emptyItems;
    }
  }
}

export default Store;
