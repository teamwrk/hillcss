$(function () {
    var hillGriddl = {
        // Nice to have
        // '<span class="logic-add-row button-add--dashed layout-add-center"></span>' +
        //
        _rowMarkup: '<div layout="row" state="is-empty">' +
                        '<span class="logic-add-box button-add--dashed layout-add-center"></span>' +
                        '<span class="logic-remove button-remove layout-remove"></span>' +
                    '</div>',
        _boxMarkup: '<div layout="box-25">' +
                        '<span class="logic-add-right button-add layout-add-right"></span>' +
                        '<span class="logic-add-left button-add layout-add-left"></span>' +
                        '<span class="logic-add-above button-add layout-add-top"></span>' +
                        '<span class="logic-add-below button-add layout-add-bottom"></span>' +
                        '<span class="logic-remove button-remove layout-remove"></span>' +
                        '<span class="logic-color button-color layout-color"></span>' +

                        '<div class="layout-list-container-small">' +
                            '<span class="button-small-device list-container-value">100</span>' +
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

                        '<div class="layout-list-container-medium">' +
                            '<span class="button-medium-device list-container-value">100</span>' +
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

                        '<div class="layout-list-container-large">' +
                            '<span class="button-large-device list-container-value">100</span>' +
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
                        '<div class="logic-content"></div>' +
                    '</div>',

        _$app: $('#app'),

        init: function () {
            this._$app.html(this._rowMarkup);
            this._initEvents();
        },
        _initEvents: function () {
            var self = this;

            $('body').on('click', '.logic-add-top', function () {
                self._$app.prepend(self._rowMarkup);

            }).on('click', '.logic-add-bottom', function () {
                self._$app.append(self._rowMarkup);

            }).on('click', '.logic-add-box', function () {
                $(this).parents('[layout="row"]')
                       .removeAttr('state')
                       .append(self._boxMarkup);

            }).on('click', '.logic-add-right', function () {
                var $box = $(this).parent();

                $box.after($box.clone());

            }).on('click', '.logic-add-left', function () {
                var $box = $(this).parent();

                $box.before($box.clone());

            }).on('click', '.logic-add-above', function () {
                var $newRow = $(self._rowMarkup);
                var $thisRow = $(this).parents('[layout="row"]');

                $thisRow.before($newRow);
                $newRow.find('.logic-add-box').trigger('click');

            }).on('click', '.logic-add-below', function () {
                var $thisRow = $(this).parents('[layout="row"]');
                var $newRow = $thisRow.clone();

                $thisRow.after($newRow);

            }).on('click', '.logic-remove', function () {
                var $parent = $(this).parent();
                var $row = $parent.parent();

                $parent.remove();

                if($row.attr('layout') === 'row' &&
                   $row.children()
                       .not('.logic-add-box, .logic-remove').length === 0) {
                    $row.attr('state', 'is-empty');
                }
            }).on('click', '.layout-list li', function () {
                var $ul = $(this).parent();
                var $listContainer = $ul.parent();
                var $box = $listContainer.parent();

                $ul.find('[state="is-active"]').removeAttr('state');
                $(this).attr('state', 'is-active');
                $listContainer.find('.list-container-value').text($(this).text());

                var $actives = $box.find('.layout-list [state="is-active"]');
                var attr = $actives.eq(0).attr('value') + ' ' +
                           $actives.eq(1).attr('value') + ' ' +
                           $actives.eq(2).attr('value');

                $box.attr('layout', attr);
            }).on('click', '.logic-color', function () {
                var colors = ['#da9a9a', '#f7e17d', '#9ad5da',
                              '#cbec88', '#f2c082'];
                var randomColorIndex = Math.floor(Math.random() * colors.length) + 0;

                $(this).parent().css('backgroundColor', colors[randomColorIndex]);
            }).on('click', '.logic-remove-all', function () {
                self._$app.html(self._rowMarkup);
            })
        }
    };

    hillGriddl.init();
});
