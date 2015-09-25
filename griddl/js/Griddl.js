import $ from 'jquery';
import GriddlMarkup from './GriddlMarkup';
import GriddlStorage from './GriddlStorage';

class Griddl {
    constructor () {
        this.Markup = new GriddlMarkup();
        this.Store  = new GriddlStorage();
        this.$app   = $('#app');
        let markup  = this.Markup.getRow();

        if (this.Store.hasData()) {
            markup = this.Store.getData();
        }

        this.$app.html(markup);

        // Global events
        $('body').on('click', '.logic-remove-all', $.proxy(this.removeAll, this))

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
        this.Store.store(this.$app.html());
    }

    removeRow (event) {
        event.preventDefault();

        this.getRow($(event.target)).remove();
        this.Store.store(this.$app.html());
    }

    addBoxToRow (event) {
        event.preventDefault();

        this.getRow($(event.target)).removeAttr('state')
                                     .append(this.Markup.getBox());
        this.Store.store(this.$app.html());
    }

    addBoxBefore (event) {
        event.preventDefault();

        var $box = this.getBox($(event.target));

        $box.before($box.clone());
        this.Store.store(this.$app.html());
    }

    addBoxAfter (event) {
        event.preventDefault();

        let $box = this.getBox($(event.target));

        $box.after($box.clone());
        this.Store.store(this.$app.html());
    }

    addBoxRowBefore (event) {
        event.preventDefault();

        this._addBoxRow(this.getRow($(event.target)), 'above');
        this.Store.store(this.$app.html());
    }

    addBoxRowAfter (event) {
        event.preventDefault();

        this._addBoxRow(this.getRow($(event.target)), 'below');
        this.Store.store(this.$app.html());
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
        this.Store.store(this.$app.html());
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
        this.Store.store(this.$app.html());
    }

    changeBoxColor () {
        event.preventDefault();

        this.getBox($(event.target))
              .css('backgroundColor', this._randomHexColor());
        this.Store.store(this.$app.html());
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

    _randomHexColor () {
        var colors = ['#da9a9a', '#f7e17d', '#9ad5da',
                      '#cbec88', '#f2c082'];

        return colors[Math.floor(Math.random() * colors.length) + 0];
    }
}

export default Griddl;
