import $ from 'jquery';
import Griddl from '../../js/Griddl';
import GriddlStorage from '../../js/GriddlStorage';

class SilvertoursGriddl extends Griddl {

    constructor () {
        super();

        this.Storage = new GriddlStorage();
        this.$app        = $('#app');
        this.$modal      = $('#modal');
        this.$modalInput = $('#modalInput'),

        $('body').on('click', '.logic-button-add-content', $.proxy(this.addContentToBox, this))
                 .on('click', '.logic-add-content',        $.proxy(this._showModal, this))
                 .on('click', '.logic-button-cancel',      $.proxy(this._cancelModal, this));

        $(window).on('resize', $.proxy(this._onWindowResize, this))
                 .on('load',   $.proxy(this._initIframes, this));
    }

    _initIframes () {
        let self = this;
        let $iFrameContainers = $('.logic-content');
        let content = '';

        setTimeout(function () {
            $iFrameContainers.each(function () {
                content = $(this).attr('data-content');
                self._setIFrameContent($(this), content);
            });
        }, 500);
    }

    _resizeIframe ($iframe) {
        let innerHeight = $iframe.contents().find('body > *').innerHeight();

        super.getBox($iframe.height(innerHeight));
        $iframe.height(innerHeight);
    }

    addContentToBox (event) {
        event.preventDefault();

        let content = this.$modalInput.val();
        let $target = $('#contentHere');

        this._setIFrameContent($target, content);
        this._resizeIframe($target.find('iframe'));
        super.getBox($target).addClass('box-with-content')
             .find('.logic-color').remove();

        $target.removeAttr('id');
        this.$modal.removeAttr('state');
        this.Storage.store(this.$app.html());
    }

    _setIFrameContent ($target, content) {
        let self = this;

        $target.html(this._getIFrameMarkup());

        $target.attr('data-content', content)
               .find('iframe')
               .one('load', $.proxy(this._iframeLoad, this))
               .attr('src', 'iframe.html');

        this.Storage.store(this.$app.html());
    }

    _showModal (event) {
        event.preventDefault();

        this.$modal.attr('state', 'is-visible');

        let content = $(event.target).siblings('.logic-content')
                                     .attr('id', 'contentHere')
                                     .attr('data-content');

        this.$modalInput.val(content);
    }

    _cancelModal (event) {
        event.preventDefault();

        this.$modal.removeAttr('state');
        $('#contentHere').removeAttr('id');
    }

    addBoxToRow (event) {
        event.preventDefault();
        super(event);

        let self = this;

        $(event.target).siblings('.box').each(function () {
            if($(this).find('.button-content').length === 0) {
                $(this).append(self._getAddContentMarkup());
                $(this).append(self._getContentContainerMarkup());
            }
        });

        this.Storage.store(this.$app.html());
    }

    _iframeLoad (event) {
        event.preventDefault();

        let $me = $(event.target);
        let self = this;
        let content = '';

        setTimeout(function () {
            content = $me.parents('.logic-content')
                         .attr('data-content');

            $me.contents()
               .find('body')
               .html(content);

            self._resizeIframe($me);
        }, 500);
    }

    _getContentContainerMarkup () {
        return '<div class="logic-content layout-content"></div>';
    }

    _getAddContentMarkup () {
        return '<span title="Add HTML content" class="logic-add-content button-content layout-add-content"></span>';
    }

    _getIFrameMarkup () {
        return '<iframe frameborder="0" height="100%" width="100%" class="logic-frame"></iframe>';
    }

    _onWindowResize () {
        let self = this;

        $('iframe').each(function () {
            self._resizeIframe($(this));
        });
    }
}

export default SilvertoursGriddl;
