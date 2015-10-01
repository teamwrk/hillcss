import $ from 'jquery';
import GriddlMarkup from './GriddlMarkup';

class GriddlStorage {
    constructor () {
        this.storageID = 'Hill-Griddl';
        this.Markup    = new GriddlMarkup();
        this.version   = 0.9;
    }

    initIds () {
        let self = this;

        $('[store]').each(function () {
            $(this).attr('id', self._generateUid());
        });
    }

    generateDataMarkup () {
        let $markup = $('<div></div>');
        let dataSet = this._getData();
        let item    = null;
        let $item   = null;

        if (dataSet.version !== this.version) {
            alert('Local data is not compatible with the current version of Griddl!');
        } else {
            let dataItems = dataSet.data.length;

            for (let index = 0; index < dataItems; ++index) {
                item = dataSet.data[index];

                if (item.type === 'box') {
                    $item = $(this.Markup.getBox());
                    $item.css('backgroundColor', item.background)
                    $item.attr('layout', 'box-small-' + item.sizeClass.small + ' ' +
                                         'box-medium-' + item.sizeClass.medium + ' ' +
                                         'box-large-' + item.sizeClass.large);
                } else {
                    $item = $(this.Markup.getRow());
                }

                $item.attr('id', item.id);

                if (item.parentId === null) {
                    $markup.append($item);
                } else {
                    $markup.find('#' + item.parentId)
                           .removeAttr('state').append($item);
                }
            }
        }

        return $markup;
    }

    hasData () {
        return (localStorage.getItem(this.storageID));
    }

    store () {
        let data = JSON.stringify(this._getDataStructure());

        localStorage.setItem(this.storageID, data);
    }

    clear () {
        localStorage.removeItem(this.storageID);
    }

    _getData () {
        return $.parseJSON(localStorage.getItem(this.storageID));
    }

    _generateUid () {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
    }

    _getDataStructure () {
        let self     = this;
        let $me      = [];
        let dataSet  = {};
        let sizes    = [];

        dataSet.name    = this.storageID;
        dataSet.version = this.version;
        dataSet.website = 'http://www.hill.io';
        dataSet.data    = [];

        $('[store]').each(function () {
            $me = $(this);

            if ($me.attr('type')) {
                let entry       = {};
                entry.id        = $me.attr('id');
                entry.type      = $me.attr('type');
                entry.parentId  = ($me.parent().attr('id') || null);

                if (entry.type === 'box') {
                    entry.background       = $me.css('backgroundColor');
                    sizes                  = $me.attr('layout').split(' ')
                    entry.sizeClass        = {};
                    entry.sizeClass.small  = sizes[0];
                    entry.sizeClass.medium = sizes[1];
                    entry.sizeClass.large  = sizes[2];
                }

                dataSet.data.push(entry);
            }
        });

        return dataSet;
    }
}

export default GriddlStorage;
