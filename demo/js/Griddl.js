import $ from 'jquery';
import GriddlMarkup from './GriddlMarkup';
import GriddlHelper from './GriddlHelper';

class Griddl {
    constructor () {
        this.Markup = new GriddlMarkup();
        this.Helper = new GriddlHelper();
        this.$app   = $('#app');

        let markup = this.Markup.getRow();

        if (this.Helper.isDataStored()) {
            markup = this.Helper.getStoredData();
        }

        this.$app.html(markup);

        let self = this;

        // Global events
        $('body').on('click', '.logic-remove-all', $.proxy(this.removeAll, this))

        // Row events
                 .on('click', '.logic-add-top',    $.proxy(this.addRowAbove, this))
                 .on('click', '.logic-add-bottom', $.proxy(this.addRowBelow, this))
                 .on('click', '.logic-remove-row', $.proxy(this.removeRow, this))
                 .on('click', '.logic-add-box',    $.proxy(this.addBoxToRow, this))

        // Box events
                 .on('click', '.logic-add-right',   $.proxy(this.addBoxAfter, this))
                 .on('click', '.logic-add-left',    $.proxy(this.addBoxBefore, this))
                 .on('click', '.logic-add-above',   $.proxy(this.addBoxRowBefore, this))
                 .on('click', '.logic-add-below',   $.proxy(this.addBoxRowAfter, this))
                 .on('click', '.logic-remove',      $.proxy(this.removeBox, this))
                 .on('click', '.layout-list li',    $.proxy(this.changeDeviceSizeSettings, this))
                 .on('click', '.logic-color',       $.proxy(this.changeBoxColor, this));





        // var silverUtils = {
        //     _iFrameTemplate: '<iframe src="iframe.html" frameborder="0" height="100%" width="100%" class="logic-content layout-content"></iframe>',
        //     _$modal: $('#modal'),
        //     _$modalHTMLInput: $('#modalHTMLInput'),

        //     init: function () {
        //         if (hillGriddl._isStored()) {
        //             this._initIframeContent();
        //         }

        //         this._initEvents();
        //     },

        //     _initEvents: function () {
        //         var self = this;

        //         $('body').on('click', '.logic-button-add-content ', function () {
        //             var content = self._$modalHTMLInput.val();
        //             var $target = $('#contentHere');

        //             self._setFrameContent($target, content);
        //             self._updateBoxHeight($target);

        //             $target.removeAttr('id');
        //             self._$modal.removeAttr('state');
        //             hillGriddl._store();

        //             return false;
        //         }).on('click', '.logic-add-content', function () {
        //             var me = $(this);

        //             me.parent().append(self._iFrameTemplate);
        //             self._$modal.attr('state', 'is-visible');

        //             var content = me.siblings('.logic-content')
        //                             .attr('id', 'contentHere')
        //                             .attr('data-src');

        //             self._$modalHTMLInput.val(content);

        //         }).on('click', '.logic-button-cancel', function () {
        //             self._$modal.removeAttr('state');
        //             $('#contentHere').removeAttr('id');

        //             return false;
        //         })
        //     },
        //     _initIframeContent: function () {
        //         var self = this;

        //         setTimeout(function () {
        //             $('iframe').each(function () {
        //                 if($(this).attr('data-src').length > 0) {
        //                     $(this).attr('data-src', $(this).attr('data-src'))
        //                            .contents()
        //                            .find('body')
        //                            .html($(this).attr('data-src'));
        //                 }
        //                 self._updateBoxHeight($(this));
        //             });
        //         }, 600);
        //     },
        //     _updateBoxHeight: function ($iframe) {
        //         var height = $iframe.contents().find('body').innerHeight();

        //         $iframe.parent().height(height);
        //     },
        //     _setFrameContent: function ($iframe, content) {
        //         $iframe.attr('data-src', content)
        //                .contents()
        //                .find('body')
        //                .html(content);
        //     },
        //     _getFrameContent: function ($iframe) {
        //         return $iframe.attr('data-src');
        //     }
        // };

        // hillGriddl.init();
        // silverUtils.init();
    }

    removeAll (event) {
        event.preventDefault();

        this.$app.html(this.Markup.getRow());
        this.Helper.clearData();
    }

    addRowAbove (event) {
        event.preventDefault();

        this.$app.prepend(this.Markup.getRow());
        this.Helper.storeData(this.$app.html());
    }

    addRowBelow (event) {
        event.preventDefault();

        this.$app.append(this.Markup.getRow());
        this.Helper.storeData(this.$app.html());
    }

    removeRow (event) {
        event.preventDefault();

        $(event.target).parents('[layout="row"]').remove();
        this.Helper.storeData(this.$app.html());
    }

    addBoxToRow (event) {
        event.preventDefault();

        $(event.target).parents('[layout="row"]')
                       .removeAttr('state')
                       .append(this.Markup.getBox());
        this.Helper.storeData(this.$app.html());
    }

    addBoxBefore (event) {
        event.preventDefault();

        var $box = $(event.target).parents('.box');

        $box.before($box.clone());
        this.Helper.storeData(this.$app.html());
    }

    addBoxAfter (event) {
        event.preventDefault();

        let $box = $(event.target).parents('.box');

        $box.after($box.clone());
        this.Helper.storeData(this.$app.html());
    }

    addBoxRowBefore (event) {
        event.preventDefault();

        this._addBoxRow($(event.target).parents('[layout="row"]'),
                        'above');
        this.Helper.storeData(this.$app.html());
    }

    addBoxRowAfter (event) {
        event.preventDefault();

        this._addBoxRow($(event.target).parents('[layout="row"]'),
                        'below');
        this.Helper.storeData(this.$app.html());
    }

    removeBox (event) {
        event.preventDefault();

        let $box = $(event.target).parents('.box');

        if ($box.siblings('.box').length === 0) {
            $box.parents('[layout="row"]')
                .attr('state', 'is-empty');
        }

        $box.remove();
        this.Helper.storeData(this.$app.html());
    }

    changeDeviceSizeSettings (event) {
        event.preventDefault();

        let $me            = $(event.target);
        let $list          = $me.parents('.list');
        let $listContainer = $list.parents('.list-container');
        let $box           = $listContainer.parents('.box');

        $list.find('[state="is-active"]').removeAttr('state');
        $me.attr('state', 'is-active');
        $listContainer.find('.list-container-value').text($me.text());

        let $actives = $box.find('.layout-list [state="is-active"]');
        let attr = $actives.eq(0).attr('value') + ' ' +
                   $actives.eq(1).attr('value') + ' ' +
                   $actives.eq(2).attr('value');

        $box.attr('layout', attr);
        this.Helper.storeData(this.$app.html());
    }

    changeBoxColor () {
        event.preventDefault();

        $(event.target).parents('.box')
              .css('backgroundColor', this.Helper.randomHexColor());
        this.Helper.storeData(this.$app.html());
    }

    _addBoxRow ($row, position) {
        let $newRow = $row.clone();

        if (position === 'above') {
            $row.before($newRow);
        } else {
            $row.after($newRow);
        }
    }
}

export default Griddl;
