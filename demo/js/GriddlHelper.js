class GriddlHelper {
    constructor () {
        this.storageID = 'Hill-Griddl';
    }

    getStoredData () {
        return localStorage.getItem(this.storageID);
    }

    isDataStored () {
        return (localStorage.getItem(this.storageID));
    }

    storeData (data) {
        localStorage.setItem(this.storageID, data);
    }

    clearData () {
        localStorage.removeItem(this.storageID);
    }

    randomHexColor () {
        var colors = ['#da9a9a', '#f7e17d', '#9ad5da',
                      '#cbec88', '#f2c082'];

        return colors[Math.floor(Math.random() * colors.length) + 0];
    }
}

export default GriddlHelper;
