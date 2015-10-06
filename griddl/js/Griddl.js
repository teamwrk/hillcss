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

        this._init();
        this._initEvents();
    }

    /*
     * Do init stuff.
     * @return {void}
    */
    _init () {
        let markup = this.Markup.getRow();

        // Generate Markup from stored Data, if exists
        if (this.Store.hasData()) {
            markup = this.Store.generateDataMarkup();
        }

        // Set empty row or loaded data
        this.$app.html(markup);
    }

    /*
     * Init interactive events.
     * @return {void}
    */
    _initEvents () {
        // Global events
        $('body').on('click', '.logic-remove-all',      $.proxy(this.onClearData, this))
                 .on('click', '.logic-device-sizes li', $.proxy(this.onDeviceViewChange, this))
                 .on('click', '.logic-print',           $.proxy(this.onPrint, this))
                 .on('click', '.logic-save',            $.proxy(this.onSave, this))
                 .on('click', '.logic-clear',           $.proxy(this.onReset, this))

        // Row events
                 .on('click', '.logic-add-top',    $.proxy(this.onAddNewRowAbove, this))
                 .on('click', '.logic-add-bottom', $.proxy(this.onAddNewRowBelow, this))
                 .on('click', '.logic-remove-row', $.proxy(this.onRowRemove, this))
                 .on('click', '.logic-add-box',    $.proxy(this.onInsertBoxInRow, this))

        // Box events
                 .on('click', '.logic-add-right',      $.proxy(this.onAddBoxAfter, this))
                 .on('click', '.logic-add-left',       $.proxy(this.onAddBoxBefore, this))
                 .on('click', '.logic-add-above',      $.proxy(this.onAddBoxRowBefore, this))
                 .on('click', '.logic-add-below',      $.proxy(this.onAddBoxRowAfter, this))
                 .on('click', '.logic-remove',         $.proxy(this.onBoxRemove, this))
                 .on('click', '.logic-add-box-inside', $.proxy(this.onBoxInsert, this))
                 .on('click', '.logic-list li',        $.proxy(this.onDeviceBreakpointChange, this))
                 .on('click', '.logic-color',          $.proxy(this.onBoxColorChange, this));

        // Window events
        $(window).on('resize', $.proxy(this.onWindowResize, this)).trigger('resize');
    }

    /*
     * Inserts a cloned row above or below a row.
     * @param  {Object} $row      Given row to clone
     * @param  {String} direction The direction, above or below
     * @return {void}
    */
    _cloneRow ($row, direction) {
        let $newRow = $row.clone();

        if (direction === 'above') {
            $row.before($newRow);
        } else {
            $row.after($newRow);
        }
    }

    /*
     * Updates the change state for visaul 'unsaved changes' feedback.
     * @param  {Boolean} state The 'unsaved changes' state. Can be true or false
     * @return {void}
    */
    _updateChangeState (state) {
        $('.logic-save').attr('state', (state) ? 'unsafed' : '');
    }

    /*
     * Is called before a print view appears, to execute custom logic.
     * @return {void}
    */
    beforePrint () {
        // Add print container
        $('body').append(this.Markup.getPrintContainer());
        // Save last device settings
        this.lastActiveDevice = this.$html.attr('class');
        this.$html.removeClass();
        // Set print mode
        this.$html.attr('state', 'print');

        // Add device views for the printview
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

        // Fill device views with content
        $printContainer.append($largeDevice)
                       .append($mediumDevice)
                       .append($smallDevice);
    }

    /*
     * Is called after a print view disappeared.
     * @return {void}
    */
    afterPrint () {
        let $printContainer = $('#printContainer');

        // Remove print cointainer and reset all states
        $printContainer.remove();
        this.$html.removeAttr('state');
        this.$html.addClass(this.lastActiveDevice);
    }

    /*
     * Get closest box relative from given element.
     * @param  {Object} $element Get box relative from given element
     * @return {Object} Returns the closest box element
    */
    getBox ($element) {
        return $element.closest('.box');
    }

    /*
     * Get closest row relative from given element.
     * @param  {Object} $element Get row relative from given element
     * @return {Object} Returns the closest row element
    */
    getRow ($element) {
        return $element.closest('[layout="row"]');
    }

    /*
     * Set device classes from css property, if window was resized.
     * @return {void}
    */
    onWindowResize () {
        if ($('.button-auto').attr('state')) {
            this.$html.attr('class', this.Helper.getDeviceClass());
        }
    }

    /*
     * Saves data of the current view.
     * @param  {Object} event The click event
     * @return {void}
    */
    onSave (event) {
        event.preventDefault();

        this.Store.store();
        this._updateChangeState(false);
    }

    /*
     * Shows print view and reset states, if view was closed.
     * @return {void}
    */
    onPrint () {
        this.beforePrint();

        top.window.focus();
        top.window.print();

        this.afterPrint();
    }

    /*
     * Show device view, if representive device was clicked. Also updates the
     * current active device state.
     * @param  {Object} event The click event
     * @return {void}
    */
    onDeviceViewChange (event) {
        event.preventDefault();

        // Clicked element
        let $me = $(event.target);

        // Update active device button
        $me.siblings('[state="is-active"]').removeAttr('state');
        $me.attr('state', 'is-active');

        // Change to auto mode, if no device was activated. Otherwise show
        // the clicked device view
        if ($me.attr('value') === '') {
            this.$deviceTypeContainer.removeClass('device');
            this.$html.attr('class', this.Helper.getDeviceClass());
        } else {
            this.$deviceTypeContainer.addClass('device');
            this.$html.attr('class', 'device-is--' + $me.attr('value'));
        }
    }

    /*
     * Resets the app.
     * @param  {Object} event The click event
     * @return {void}
    */
    onReset (event) {
        event.preventDefault();

        this.$app.html(this.Markup.getRow());
        this._updateChangeState(true);
    }

    /*
     * Resets the app and clear stored data.
     * @param  {Object} event The click event
     * @return {void}
    */
    onClearData (event) {
        event.preventDefault();

        if (confirm('Do you really want to clear your project data? All stored data will be lost!')) {
            this.$app.html(this.Markup.getRow());
            this.Store.clear();
        }
    }

    /*
     * Adds new row at the top.
     * @param  {Object} event The click event
     * @return {void}
    */
    onAddNewRowAbove (event) {
        event.preventDefault();

        this.$app.prepend(this.Markup.getRow());
        this._updateChangeState(true);
    }

    /*
     * Adds new row at the bottom.
     * @param  {Object} event The click event
     * @return {void}
    */
    onAddNewRowBelow (event) {
        event.preventDefault();

        this.$app.append(this.Markup.getRow());
        this._updateChangeState(true);
    }

    /*
     * Inserts a wrapped box into another box.
     * @param  {Object} event The click event
     * @return {void}
    */
    onBoxInsert (event) {
        // Get box of the clicked button
        let $thisBox = this.getBox($(event.target));
        // Create new row
        let $newRow  = $(this.Markup.getRow()).removeAttr('state')
                                              .addClass('is-second-level');

        // Add row into current box
        $thisBox.addClass('box-with-row').append($newRow);
        // Append box into new appended row
        $thisBox.find('[layout="row"]')
                .append(this.Markup.getBox());
    }

    /*
     * Removes row.
     * @param  {Object} event The click event
     * @return {void}
    */
    onRowRemove (event) {
        event.preventDefault();

        this.getRow($(event.target)).remove();
        this._updateChangeState(true);
    }

    /*
     * Add a box into row.
     * @param  {Object} event The click event
     * @return {void}
    */
    onInsertBoxInRow (event) {
        event.preventDefault();

        this.getRow($(event.target)).removeAttr('state')
                                     .append(this.Markup.getBox());
        this._updateChangeState(true);
    }

    /*
     * Clones box and add it before the current box.
     * @param  {Object} event The click event
     * @return {void}
    */
    onAddBoxBefore (event) {
        event.preventDefault();

        let $box = this.getBox($(event.target));

        $box.before($box.clone());
        this._updateChangeState(true);
    }

    /*
     * Clones box and add it after the current box.
     * @param  {Object} event The click event
     * @return {void}
    */
    onAddBoxAfter (event) {
        event.preventDefault();

        let $box = this.getBox($(event.target));

        $box.after($box.clone());
        this._updateChangeState(true);
    }

    /*
     * Clones row and add it before the current row.
     * @param  {Object} event The click event
     * @return {void}
    */
    onAddBoxRowBefore (event) {
        event.preventDefault();

        this._cloneRow(this.getRow($(event.target)), 'above');
        this._updateChangeState(true);
    }

    /*
     * Clones row and add it after the current row.
     * @param  {Object} event The click event
     * @return {void}
    */
    onAddBoxRowAfter (event) {
        event.preventDefault();

        this._cloneRow(this.getRow($(event.target)), 'below');
        this._updateChangeState(true);
    }

    /*
     * Removes box.
     * @param  {Object} event The click event
     * @return {void}
    */
    onBoxRemove (event) {
        event.preventDefault();

        let $box = this.getBox($(event.target));

        // If the box which should be removed, is the last one in row ...
        if ($box.siblings('.box').length === 0) {
            let $parentRow = this.getRow($box);

            if ($parentRow.hasClass('is-second-level')) {
                // ... and is on second level, then remove the box with the parent row
                $parentRow.parent('.box-with-row')
                          .removeClass('box-with-row')
                $parentRow.remove();
            } else {
                // ... Otherwise mark parent row as empty
                this.getRow($box)
                    .attr('state', 'is-empty');
            }
        }

        $box.remove();
        this._updateChangeState(true);
    }

    /*
     * Sets device breakpoints to a container.
     * @param  {Object} event The click event
     * @return {void}
    */
    onDeviceBreakpointChange (event) {
        event.preventDefault();

        let $me            = $(event.target);
        let $list          = $me.parent('.list');
        let $listContainer = $list.parent('.list-container');
        let $box           = this.getBox($listContainer);

        // Update active state
        $list.find('[state="is-active"]').removeAttr('state');
        $me.attr('state', 'is-active');
        // Update selected breakpoint value text
        $listContainer.find('.list-container-value').text($me.text());

        // Create layout properties
        let $actives = $box.find('.logic-list [state="is-active"]');
        let attr = $actives.eq(0).attr('value') + ' ' +
                   $actives.eq(1).attr('value') + ' ' +
                   $actives.eq(2).attr('value');

        // Append layout properties
        $box.attr('layout', attr);
        this._updateChangeState(true);
    }

    /*
     * Sets box color to a random color.
     * @param  {Object} event The click event
     * @return {void}
    */
    onBoxColorChange (event) {
        event.preventDefault();

        this.getBox($(event.target))
              .css('backgroundColor', this.Helper.randomHexColor());
        this._updateChangeState(true);
    }
}

export default Griddl;
