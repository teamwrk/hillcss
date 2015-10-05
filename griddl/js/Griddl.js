import $ from 'jquery';
import GriddlMarkup  from './GriddlMarkup';
import GriddlStorage from './GriddlStorage';
import GriddlHelper  from './GriddlHelper';

class Griddl {
    constructor () {
        this.Markup               = new GriddlMarkup();
        this.Store                = new GriddlStorage();
        this.Helper               = new GriddlHelper();
        this.$html                = $('html');
        this.$app                 = $('.logic-app');
        this.$deviceTypeContainer = $('#deviceTypeContainer');
        this.lastActiveDevice     = '';
        let markup                = this.Markup.getRow();

        if (this.Store.hasData()) {
            markup = this.Store.generateDataMarkup();
        }

        this.$app.html(markup);
        this.Store.initIds();

        // Global events
        $('body').on('click', '.logic-remove-all',      $.proxy(this.clearAll, this))
                 .on('click', '.logic-device-sizes li', $.proxy(this.changeDeviceSize, this))
                 .on('click', '.logic-print',           $.proxy(this.print, this))
                 .on('click', '.logic-save',            $.proxy(this.save, this))
                 .on('click', '.logic-clear',           $.proxy(this.removeAll, this))

        // Row events
                 .on('click', '.logic-add-top',    $.proxy(this.addRowAbove, this))
                 .on('click', '.logic-add-bottom', $.proxy(this.addRowBelow, this))
                 .on('click', '.logic-remove-row', $.proxy(this.removeRow, this))
                 .on('click', '.logic-add-box',    $.proxy(this.addBoxToRow, this))

        // Box events
                 .on('click', '.logic-add-right',      $.proxy(this.addBoxAfter, this))
                 .on('click', '.logic-add-left',       $.proxy(this.addBoxBefore, this))
                 .on('click', '.logic-add-above',      $.proxy(this.addBoxRowBefore, this))
                 .on('click', '.logic-add-below',      $.proxy(this.addBoxRowAfter, this))
                 .on('click', '.logic-remove',         $.proxy(this.removeBox, this))
                 .on('click', '.logic-add-box-inside', $.proxy(this.addBoxInside, this))
                 .on('click', '.layout-list li',       $.proxy(this.changeDeviceSizeSettings, this))
                 .on('click', '.logic-color',          $.proxy(this.changeBoxColor, this));

        $(window).on('resize', $.proxy(this.onWindowResize, this)).trigger('resize');
    }

    save (event) {
        event.preventDefault();

        this.Store.store(this.$app.html());
        this._setContentChangedState(false);
    }

    beforePrint () {
        $('body').append(this.Markup.getPrintContainer());
        this.lastActiveDevice = this.$html.attr('class');
        this.$html.removeClass();
        this.$html.attr('state', 'print');

        let $printContainer = $('#printContainer');
        let $smallDevice    = this.$deviceTypeContainer
                                  .clone()
                                  .addClass('device')
                                  .wrap('<div class="device-is--small"></div>')
                                  .parent();

        let $mediumDevice   = this.$deviceTypeContainer
                                  .clone()
                                  .addClass('device')
                                  .wrap('<div class="device-is--medium"></div>')
                                  .parent();

        let $largeDevice    = this.$deviceTypeContainer
                                  .clone()
                                  .addClass('device')
                                  .wrap('<div class="device-is--large"></div>')
                                  .parent();

        $printContainer.append($largeDevice)
                       .append($mediumDevice)
                       .append($smallDevice);
    }

    afterPrint () {
        let $printContainer = $('#printContainer');
        $printContainer.remove();
        this.$html.removeAttr('state');
        this.$html.addClass(this.lastActiveDevice);
    }

    print (event) {
        this.beforePrint();
        top.window.focus();
        top.window.print();
        this.afterPrint();
    }

    onWindowResize () {
        if ($('.button-auto').attr('state')) {
            this.$html.attr('class', this.Helper.getDeviceClass());
        }
    }

    changeDeviceSize (event) {
        event.preventDefault();

        let $me = $(event.target);

        $me.siblings('[state="is-active"]').removeAttr('state');
        $me.attr('state', 'is-active');

        if ($me.attr('value') === '') {
            this.$deviceTypeContainer.removeClass('device');
            this.$html.attr('class', this.Helper.getDeviceClass());
        } else {
            this.$deviceTypeContainer.addClass('device');
            this.$html.attr('class', 'device-is--' + $me.attr('value'));
        }
    }

    removeAll (event) {
        event.preventDefault();

        this.$app.html(this.Markup.getRow());
        this._setContentChangedState(true);
    }

    clearAll (event) {
        event.preventDefault();

        this.$app.html(this.Markup.getRow());
        this.Store.clear();
    }

    addRowAbove (event) {
        event.preventDefault();

        this.$app.prepend(this.Markup.getRow());
        this._setContentChangedState(true);
    }

    addBoxInside (event) {
        let $thisBox = this.getBox($(event.target));
        let $newRow  = $(this.Markup.getRow()).removeAttr('state')
                                              .addClass('is-second-level');

        $thisBox.addClass('box-with-row').append($newRow);
        $thisBox.find('[layout="row"]')
                .append(this.Markup.getBox());
    }

    addRowBelow (event) {
        event.preventDefault();

        this.$app.append(this.Markup.getRow());
        this._setContentChangedState(true);
    }

    removeRow (event) {
        event.preventDefault();

        this.getRow($(event.target)).remove();
        this._setContentChangedState(true);
    }

    addBoxToRow (event) {
        event.preventDefault();

        this.getRow($(event.target)).removeAttr('state')
                                     .append(this.Markup.getBox());
        this._setContentChangedState(true);
    }

    addBoxBefore (event) {
        event.preventDefault();

        let $box = this.getBox($(event.target));

        $box.before($box.clone());
        this._setContentChangedState(true);
    }

    addBoxAfter (event) {
        event.preventDefault();

        let $box = this.getBox($(event.target));

        $box.after($box.clone());
        this._setContentChangedState(true);
    }

    addBoxRowBefore (event) {
        event.preventDefault();

        this._addBoxRow(this.getRow($(event.target)), 'above');
        this._setContentChangedState(true);
    }

    addBoxRowAfter (event) {
        event.preventDefault();

        this._addBoxRow(this.getRow($(event.target)), 'below');
        this._setContentChangedState(true);
    }

    removeBox (event) {
        event.preventDefault();

        let $box = this.getBox($(event.target));

        if ($box.siblings('.box').length === 0) {
            let $parentRow = this.getRow($box);

            if ($parentRow.hasClass('is-second-level')) {
                $parentRow.parent('.box-with-row')
                          .removeClass('box-with-row')
                $parentRow.remove();
            } else {
                this.getRow($box)
                    .attr('state', 'is-empty');
            }
        }

        $box.remove();
        this._setContentChangedState(true);
    }

    changeDeviceSizeSettings (event) {
        event.preventDefault();

        let $me            = $(event.target);
        let $list          = $me.parent('.list');
        let $listContainer = $list.parent('.list-container');
        let $box           = this.getBox($listContainer);

        $list.find('[state="is-active"]').removeAttr('state');
        $me.attr('state', 'is-active');
        $listContainer.find('.list-container-value').text($me.text());

        let $actives = $box.find('.layout-list [state="is-active"]');
        let attr = $actives.eq(0).attr('value') + ' ' +
                   $actives.eq(1).attr('value') + ' ' +
                   $actives.eq(2).attr('value');

        $box.attr('layout', attr);
        this._setContentChangedState(true);
    }

    changeBoxColor () {
        event.preventDefault();

        this.getBox($(event.target))
              .css('backgroundColor', this.Helper.randomHexColor());
        this._setContentChangedState(true);
    }

    getBox ($item) {
        return $item.closest('.box');
    }

    getRow ($item) {
        return $item.closest('[layout="row"]');
    }

    _addBoxRow ($row, position) {
        let $newRow = $row.clone();

        if (position === 'above') {
            $row.before($newRow);
        } else {
            $row.after($newRow);
        }
    }

    _setContentChangedState (state) {
        $('.logic-save').attr('state', (state) ? 'unsafed' : '');
    }
}

export default Griddl;
