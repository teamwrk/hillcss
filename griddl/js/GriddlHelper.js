import $ from 'jquery';

class GriddlHelper {
    constructor () {
    }

    randomHexColor () {
        let colors = ['#c5d2a2', '#d2c9a2', '#d2cfa2',
                      '#aed2a2', '#a2d2bc', '#c4b0bf',
                      '#c4b2b0', '#c4bfb0'];

        return colors[Math.floor(Math.random() * colors.length) + 0];
    }

    getDeviceClass () {
        return 'device-is--' + $('html').css('font-family');
    }

    /*
     * Gets and parse the JSON string from the font-family of a target.
     * @param  {object} $target     The target with the JSON string in font-family
     * @return {object}             Returns a JSON object
    */
    // _getJsonFromStyles: function ($target) {
    //     var result = null;

    //     try {
    //         var string = $target.css('font-family')
    //                             // Replace unneeded quotes at the beginning and end of the JSON string ...
    //                             .replace(/\'/g, '') // for Chrome
    //                             .replace(/\\/g, '') // for Firefox
    //                             .replace('"{', '{') // for IE
    //                             .replace('}"', '}');

    //         result = $.parseJSON(string);
    //     } catch (e) {
    //         console.warn('JSON could not be parsed. ' +
    //             'Did you store the JSON Object in the font-family CSS Property?');
    //     }

    //     return result;
    // }
}

export default GriddlHelper;
