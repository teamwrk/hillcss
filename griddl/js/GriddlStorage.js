class GriddlStorage {
    constructor () {
        this.storageID = 'Hill-Griddl';
    }

    getData () {
        return localStorage.getItem(this.storageID);
    }

    hasData () {
        return (localStorage.getItem(this.storageID));
    }

    store (data) {
        localStorage.setItem(this.storageID, data);
    }

    clear () {
        localStorage.removeItem(this.storageID);
    }
}

export default GriddlStorage;
