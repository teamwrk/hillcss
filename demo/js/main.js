$(function () {
    var hillGriddl = {
        _rowMarkup: '<div layout="row" state="is-empty">' +
                        '<span title="Add box" class="logic-add-box button-add--dashed layout-add-center"></span>' +
                        '<span title="Remove row container" class="logic-remove button-remove layout-remove"></span>' +
                    '</div>',
        _boxMarkup: '<div layout="box-25">' +
                        '<span title="Add box right" class="logic-add-right button-add layout-add-right"></span>' +
                        '<span title="Add box left" class="logic-add-left button-add layout-add-left"></span>' +
                        '<span title="Dublicate row and prepend" class="logic-add-above button-add layout-add-top"></span>' +
                        '<span title="Add HTML content" class="logic-add-content button-content layout-add-content"></span>' +
                        '<span title="Dublicate row and append" class="logic-add-below button-add layout-add-bottom"></span>' +
                        '<span title="Remove box" class="logic-remove button-remove layout-remove"></span>' +
                        '<span title="Random background color" class="logic-color button-color layout-color"></span>' +

                        '<div class="layout-list-container-small">' +
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

                        '<div class="layout-list-container-medium">' +
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

                        '<div class="layout-list-container-large">' +
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
                        '<div class="logic-content"></div>' +
                    '</div>',

        _$app: $('#app'),
        _storageID: 'HillGriddl',
        _$modal: $('#modal'),
        _$modalInput: $('#modalInput'),

        init: function () {
            if (this._isStored()) {
                this._loadFromStorage();
            } else {
                this._$app.html(this._rowMarkup);
            }

            this._initEvents();
        },
        _store: function () {
            var markup = this._$app.html();

            localStorage.setItem(this._storageID, markup);
        },
        _clearStorage: function () {
            localStorage.setItem(this._storageID, '');
        },
        _loadFromStorage: function () {
            var markup = localStorage.getItem(this._storageID);

            this._$app.html(markup);
        },
        _isStored: function () {
            return (localStorage.getItem(this._storageID));
        },
        _initEvents: function () {
            var self = this;

            $('body').on('click', '.logic-add-top', function () {
                self._$app.prepend(self._rowMarkup);
                self._store();

            }).on('click', '.logic-add-bottom', function () {
                self._$app.append(self._rowMarkup);
                self._store();

            }).on('click', '.logic-add-box', function () {
                $(this).parents('[layout="row"]')
                       .removeAttr('state')
                       .append(self._boxMarkup);
                self._store();

            }).on('click', '.logic-add-right', function () {
                var $box = $(this).parent();

                $box.after($box.clone());
                self._store();

            }).on('click', '.logic-add-left', function () {
                var $box = $(this).parent();

                $box.before($box.clone());
                self._store();

            }).on('click', '.logic-add-above', function () {
                var $newRow = $(self._rowMarkup);
                var $thisRow = $(this).parents('[layout="row"]');

                $thisRow.before($newRow);
                $newRow.find('.logic-add-box').trigger('click');
                self._store();

            }).on('click', '.logic-add-below', function () {
                var $thisRow = $(this).parents('[layout="row"]');
                var $newRow = $thisRow.clone();

                $thisRow.after($newRow);
                self._store();

            }).on('click', '.logic-remove', function () {
                var $parent = $(this).parent();
                var $row = $parent.parent();

                $parent.remove();

                if($row.attr('layout') === 'row' &&
                   $row.children()
                       .not('.logic-add-box, .logic-remove').length === 0) {
                    $row.attr('state', 'is-empty');
                }
                self._store();

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
                self._store();

            }).on('click', '.logic-color', function () {
                var colors = ['#da9a9a', '#f7e17d', '#9ad5da',
                              '#cbec88', '#f2c082'];
                var randomColorIndex = Math.floor(Math.random() * colors.length) + 0;

                $(this).parent().css('backgroundColor', colors[randomColorIndex]);
                self._store();

            }).on('click', '.logic-remove-all', function () {
                self._$app.html(self._rowMarkup);
                self._clearStorage();
            }).on('click', '.logic-add-content', function () {
                self._$modal.attr('state', 'is-visible');
                $(this).siblings('.logic-content').attr('id', 'contentHere');
            }).on('click', '.logic-button-cancel', function () {
                self._$modal.removeAttr('state');
                $('#contentHere').removeAttr('id');
                return false;
            })
            .on('click', '.logic-button-add-content ', function () {
                var content = self._$modalInput.val();
                $('#contentHere').html(content);
                $('#contentHere').removeAttr('id');
                self._$modal.removeAttr('state');
                self._store();

                return false;
            })
        }
    };

    hillGriddl.init();
});
