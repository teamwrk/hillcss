class GriddlMarkup {
    getPrintContainer () {
        return '<style type="text/css" media="print">' +
                   '@page { size: landscape; }' +
               '</style>' +
               '<div id="printContainer" class="layout-print-container"></div>';
    }

    getRow (removeable = true) {
        return '<div store type="row" layout="row" state="is-empty" removeable="' + removeable + '">' +
                    '<a tooltip="Add box" class="logic-add-box button-add--dashed layout-add-center"></a>' +
                    '<a tooltip="Remove row" class="logic-remove-row button-remove layout-remove"></a>' +
                '</div>';
    }

    getBox () {
        return '<div store type="box" class="box" layout="box-small-100 box-medium-25 box-large-25">' +
                    '<a tooltip="Dublicate Box After" class="logic-add-right button-add layout-add-right"></a>' +
                    '<a tooltip="Dublicate Box Before" class="logic-add-left button-add layout-add-left"></a>' +
                    '<a tooltip="Dublicate Row After" class="logic-add-below button-add layout-add-bottom"></a>' +
                    '<a tooltip="Dublicate Row Before" class="logic-add-above button-add layout-add-top"></a>' +
                    '<a tooltip="Add Box Inside" class="logic-add-box-inside button-add layout-add-box"></a>' +
                    '<a tooltip="Remove Box" class="logic-remove button-remove layout-remove"></a>' +
                    '<a tooltip="Random Background" class="logic-color button-color layout-color"></a>' +

                    '<div class="list-container layout-list-container-small">' +
                        '<span class="button-small-device list-container-value">100</span>' +
                        '<ul class="logic-list layout-list list">' +
                            '<li value="box-small-hide">0</li>' +
                            '<li value="box-small-25">25</li>' +
                            '<li value="box-small-33.3">33</li>' +
                            '<li value="box-small-40">40</li>' +
                            '<li value="box-small-50">50</li>' +
                            '<li value="box-small-60">60</li>' +
                            '<li value="box-small-75">75</li>' +
                            '<li value="box-small-100" state="is-active">100</li>' +
                        '</ul>' +
                    '</div>' +

                    '<div class="list-container layout-list-container-medium">' +
                        '<span class="button-medium-device list-container-value">25</span>' +
                        '<ul class="logic-list layout-list list">' +
                            '<li value="box-medium-hide">0</li>' +
                            '<li value="box-medium-25" state="is-active">25</li>' +
                            '<li value="box-medium-33.3">33</li>' +
                            '<li value="box-medium-40">40</li>' +
                            '<li value="box-medium-50">50</li>' +
                            '<li value="box-medium-60">60</li>' +
                            '<li value="box-medium-75">75</li>' +
                            '<li value="box-medium-100">100</li>' +
                        '</ul>' +
                    '</div>' +

                    '<div class="list-container layout-list-container-large">' +
                        '<span class="button-large-device list-container-value">25</span>' +
                        '<ul class="logic-list layout-list list">' +
                            '<li value="box-large-hide">0</li>' +
                            '<li value="box-large-25" state="is-active">25</li>' +
                            '<li value="box-large-33.3">33</li>' +
                            '<li value="box-large-40">40</li>' +
                            '<li value="box-large-50">50</li>' +
                            '<li value="box-large-60">60</li>' +
                            '<li value="box-large-75">75</li>' +
                            '<li value="box-large-100">100</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>';
    }
}

export default GriddlMarkup;
