;if (!inIframe()) {
    throw new Error('This page is not in an iframe');
}

(function ($, topWindow, top$) {
    /* return if these objects doesn't exist */
    if (!topWindow || !top$ || !top$.magnificPopup) {
        return;
    }

    /* close the iframe and reload the top page */
    window.closeIframeAndReload = function () {
        closeIframe();
        topWindow.location.reload();
    };

    /* close the iframe */
    window.closeIframe = function () {
        top$.magnificPopup.instance.close();
    };

})(jQuery, window.top, window.top.jQuery);

/* Check if the page is in an iframe */
function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
