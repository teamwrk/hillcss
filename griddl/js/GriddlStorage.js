import $ from 'jquery';
import GriddlMarkup from './GriddlMarkup';

class GriddlStorage {
    constructor () {
        this.storageID = 'Hill-Griddl';
        this.Markup    = new GriddlMarkup();
        this.version   = 0.12;
    }

    /*
     * Generates unique ids and set them to boxes and rows.
     * @return {void}
    */
    _initIds () {
        let self = this;

        $('[store]').each(function () {
            $(this).attr('id', self._generateUid());
        });
    }

    /*
     * Generates box markup from data.
     * @Param  {Object} data Data which contains box informations
     * @Return {Object} Generated box markup based on given data
     * @return {void}
    */
    _generateBoxMarkup (data) {
        let $markup   = $(this.Markup.getBox());
        let textValue = '';

        // Set stored background color
        $markup.css('backgroundColor', data.background)

        // Set box size via layout attributes
        $markup.attr('layout', data.sizeClass.small + ' ' +
                               data.sizeClass.medium + ' ' +
                               data.sizeClass.large);

        // Set other content, if stored
        $markup.attr('data-content', data.content);

        // Remove default device size active states
        $markup.find('[state="is-active"]').removeAttr('state');

        // Activate active state represented by data and update text
        textValue = $markup.find('[value="' + data.sizeClass.small + '"]')
                           .attr('state', 'is-active')
                           .text();
        $markup.find('.button-small-device').text(textValue);

        textValue = $markup.find('[value="' + data.sizeClass.medium + '"]')
                           .attr('state', 'is-active')
                           .text();
        $markup.find('.button-medium-device').text(textValue);

        textValue = $markup.find('[value="' + data.sizeClass.large + '"]')
                           .attr('state', 'is-active')
                           .text();
        $markup.find('.button-large-device').text(textValue);

        return $markup;
    }

    /*
     * Generates fresh Markup from given data.
     * @return {Object} Generated Markup
    */
    generateMarkupFromJSON (dataSet) {
        let $markup = $('<div></div>');
        let item    = null;
        let $item   = [];
        let $parent = [];

        // Check compatibility of data and app versions
        if (dataSet.version !== this.version) {
            alert('Local data is not compatible with the current version of Griddl!');
        } else {
            let dataItems = dataSet.data.length;

            // Generate markup for dataset
            for (let index = 0; index < dataItems; ++index) {
                item = dataSet.data[index];

                // If current data is box data then create box markup
                if (item.type === 'box') {
                    $item = this._generateBoxMarkup(item);

                } else {
                    // Otherwise row markup
                    $item = $(this.Markup.getRow());
                }

                $item.attr('id', item.id);

                if (item.parentId === null) {
                    // If generated markup has no parent, then append it to the root
                    // element
                    $markup.append($item);
                } else {
                    $parent = $markup.find('#' + item.parentId);

                    if ($parent.attr('type') === 'row' &&
                        $parent.parents('.box').length) {
                        $parent.addClass('is-second-level');
                        $parent.parents('.box').addClass('box-with-row');
                    }

                    // Otherwise append it to the parent element
                    $parent.removeAttr('state').append($item);
                }
            }
        }

        return $markup;
    }

    /*
     * Generates Markup from stored data.
     * @return {Object} Generated Markup
    */
    generateMarkup () {
        let dataSet = this.getData();

        return this.generateMarkupFromJSON(dataSet);
    }

    /*
     * Checks, if data is stored.
     * @return {Boolean} True, if data is stored, otherwise false
    */
    hasData () {
        return (localStorage.getItem(this.storageID));
    }

    /*
     * Stores data local.
     * @return {void}
    */
    store () {
        let data = JSON.stringify(this._getDataStructure());

        localStorage.setItem(this.storageID, data);
    }

    /*
     * Clears data storage.
     * @return {void}
    */
    clear () {
        localStorage.removeItem(this.storageID);
    }

    /*
     * Gets stored data json.
     * @return {Object} JSON representation of the stored data
    */
    getData () {
        return $.parseJSON(localStorage.getItem(this.storageID));
    }

    /*
     * Generates a unique string.
     * @return {String} Unique String
    */
    _generateUid () {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
    }

    /*
     * Generates data structure for storage from html markup.
     * @return {Object} Data representation of the html boxes and rows
    */
    _getDataStructure () {
        let self     = this;
        let $me      = [];
        let dataSet  = {};
        let sizes    = [];

        // General information
        dataSet.name    = this.storageID;
        dataSet.version = this.version;
        dataSet.website = 'http://www.hill.io';
        dataSet.data    = [];

        // Create unique IDs for storage
        this._initIds();

        // Iterate through every item, which should be stored
        $('[store]').each(function () {
            $me = $(this);

            if ($me.attr('type')) {
                // Get general element data
                let entry       = {};
                entry.id        = $me.attr('id');
                entry.type      = $me.attr('type');
                entry.parentId  = ($me.parent().attr('id') || null);

                // Get more specific data for box elements
                if (entry.type === 'box') {
                    entry.background       = $me.css('backgroundColor');
                    entry.content          = ($me.attr('data-content') || null);
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
