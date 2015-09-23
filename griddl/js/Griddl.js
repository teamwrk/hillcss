import $ from 'jquery';
import GriddlMarkup from './GriddlMarkup';
import GriddlStorage from './GriddlStorage';

class Griddl {
    constructor () {
        this.Markup = new GriddlMarkup();
        this.Store  = new GriddlStorage('Hill-Griddl');
        this.$app   = $('#app');
        let markup  = this.Markup.getRow();

        if (this.Store.hasData()) {
            markup = this.Store.getData();
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
        this.Store.clear();
    }

    addRowAbove (event) {
        event.preventDefault();

        this.$app.prepend(this.Markup.getRow());
        this.Store.store(this.$app.html());
    }

    addRowBelow (event) {
        event.preventDefault();

        this.$app.append(this.Markup.getRow());
        this.Store.store(this.$app.html());
    }

    removeRow (event) {
        event.preventDefault();

        $(event.target).parents('[layout="row"]').remove();
        this.Store.store(this.$app.html());
    }

    addBoxToRow (event) {
        event.preventDefault();

        $(event.target).parents('[layout="row"]')
                       .removeAttr('state')
                       .append(this.Markup.getBox());
        this.Store.store(this.$app.html());
    }

    addBoxBefore (event) {
        event.preventDefault();

        var $box = this._getBox($(event.target));

        $box.before($box.clone());
        this.Store.store(this.$app.html());
    }

    addBoxAfter (event) {
        event.preventDefault();

        let $box = this._getBox($(event.target));

        $box.after($box.clone());
        this.Store.store(this.$app.html());
    }

    addBoxRowBefore (event) {
        event.preventDefault();

        this._addBoxRow($(event.target).parents('[layout="row"]'),
                        'above');
        this.Store.store(this.$app.html());
    }

    addBoxRowAfter (event) {
        event.preventDefault();

        this._addBoxRow($(event.target).parents('[layout="row"]'),
                        'below');
        this.Store.store(this.$app.html());
    }

    removeBox (event) {
        event.preventDefault();

        let $box = this._getBox($(event.target));

        if ($box.siblings('.box').length === 0) {
            $box.parents('[layout="row"]')
                .attr('state', 'is-empty');
        }

        $box.remove();
        this.Store.store(this.$app.html());
    }

    changeDeviceSizeSettings (event) {
        event.preventDefault();

        let $me            = $(event.target);
        let $list          = $me.parents('.list');
        let $listContainer = $list.parents('.list-container');
        let $box           = this._getBox($listContainer);

        $list.find('[state="is-active"]').removeAttr('state');
        $me.attr('state', 'is-active');
        $listContainer.find('.list-container-value').text($me.text());

        let $actives = $box.find('.layout-list [state="is-active"]');
        let attr = $actives.eq(0).attr('value') + ' ' +
                   $actives.eq(1).attr('value') + ' ' +
                   $actives.eq(2).attr('value');

        $box.attr('layout', attr);
        this.Store.store(this.$app.html());
    }

    changeBoxColor () {
        event.preventDefault();

        this._getBox($(event.target))
              .css('backgroundColor', this._randomHexColor());
        this.Store.store(this.$app.html());
    }

    _getBox ($item) {
        return $item.parents('.box');
    }

    _addBoxRow ($row, position) {
        let $newRow = $row.clone();

        if (position === 'above') {
            $row.before($newRow);
        } else {
            $row.after($newRow);
        }
    }

    _randomHexColor () {
        var colors = ['#da9a9a', '#f7e17d', '#9ad5da',
                      '#cbec88', '#f2c082'];

        return colors[Math.floor(Math.random() * colors.length) + 0];
    }
}

export default Griddl;
