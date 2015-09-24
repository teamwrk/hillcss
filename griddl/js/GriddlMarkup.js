class GriddlMarkup {
    getRow () {
        return '<div layout="row" state="is-empty">' +
                    '<span title="Add box" class="logic-add-box button-add--dashed layout-add-center"></span>' +
                    '<span title="Remove row container" class="logic-remove-row button-remove layout-remove"></span>' +
                '</div>';
    }

    getBox () {
        return '<div class="box" layout="box-small-25 box-medium-25 box-large-25">' +
                    '<span title="Add box right" class="logic-add-right button-add layout-add-right"></span>' +
                    '<span title="Add box left" class="logic-add-left button-add layout-add-left"></span>' +
                    '<span title="Dublicate row and prepend" class="logic-add-above button-add layout-add-top"></span>' +
                    '<span title="Dublicate row and append" class="logic-add-below button-add layout-add-bottom"></span>' +
                    '<span title="Remove box" class="logic-remove button-remove layout-remove"></span>' +
                    '<span title="Random background color" class="logic-color button-color layout-color"></span>' +

                    '<div class="list-container layout-list-container-small">' +
                        '<span class="button-small-device list-container-value">25</span>' +
                        '<ul class="layout-list list">' +
                            '<li value="box-small-hide">0</li>' +
                            '<li value="box-small-25" state="is-active">25</li>' +
                            '<li value="box-small-33.3">33</li>' +
                            '<li value="box-small-40">40</li>' +
                            '<li value="box-small-50">50</li>' +
                            '<li value="box-small-60">60</li>' +
                            '<li value="box-small-75">75</li>' +
                            '<li value="box-small-100">100</li>' +
                        '</ul>' +
                    '</div>' +

                    '<div class="list-container layout-list-container-medium">' +
                        '<span class="button-medium-device list-container-value">25</span>' +
                        '<ul class="layout-list list">' +
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
                        '<ul class="layout-list list">' +
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
