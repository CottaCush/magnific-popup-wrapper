;if (!inIframe()) {
    throw new Error('This page is not in an iframe');
}

(function ($, topWindow, top$) {
    /* return if these objects doesn't exist */
    if (!topWindow || !top$ || !topWindow.mfpWrapper) {
        return;
    }

    var mfpWrapper = topWindow.mfpWrapper,
        nsp = mfpWrapper.nsp,
        events = mfpWrapper.events,
        getPopupInstance = mfpWrapper.getPopupInstance;

    /* Close Iframe buttons */
    $(mfpWrapper.closeSelector).on(nsp('click'), closeIframe);


    _initializeResize();


    window.mfpIframeWrapper = {
        closeIframe: closeIframe,
        closeIframeAndReload: closeIframeAndReload,
        iframeResize: iframeResize,
        topWindowEvent: topWindowEvent
    };


    /* Alert top page that iframe is loaded */
    topWindowEvent(events.iframeReady);


    /* Send iframeResize events to the top window if the frame contains the necessary data-* attributes */
    function _initializeResize() {
        var $frame = $(window.frameElement),
            resize = $frame.data(mfpWrapper.iframeResizeKey),
            autoResize = $frame.data(mfpWrapper.iframeAutoResizeKey);

        if (resize || autoResize) {
            iframeResize();
        }
        if (autoResize) {
            $(window, document,'html').on(nsp('resize'), function () {
                iframeResize();
            });
        }
    }

    /* Trigger an iframeResize event on the top window */
    function iframeResize() {
        var height = $('html').height();
        topWindowEvent(events.iframeResize, {height: height});

    }

    /* Trigger events and optional data on the top window */
    function topWindowEvent(type, data) {
        top$(topWindow).trigger(type, data);
    }

    /* close the iframe and reload the top page */
    function closeIframeAndReload() {
        closeIframe();
        topWindow.location.reload();
    }

    /* close the iframe */
    function closeIframe() {
        getPopupInstance().close();
    }

})(jQuery, window.top, window.top.jQuery);

/* Check if the page is in an iframe */
function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
