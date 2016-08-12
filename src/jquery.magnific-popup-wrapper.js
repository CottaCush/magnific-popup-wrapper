;(function ($) {
    var events = {},
        settings = {},
        defaults = {
            /* The selector used to find all valid popup links */
            selector: '[data-mfp]',

            /* data- attribute on the link used to grab extra options to be passed into Magnific Popup */
            dataOptionsKey: 'mfp-options',

            /* Prevent a click on these elements from opening the popup */
            stopPropagationSelector: '[data-mfp-no-propagate]',

            /* Selector for close links and buttons */
            closeSelector: '[data-mfp-close]',

            /* data-* attribute on the link to resize the iframe once it is loaded */
            iframeResizeKey: 'mfp-resize',

            /* data-* attribute on the link to enable the iframe's height auto resize */
            iframeAutoResizeKey: 'mfp-auto-resize',

            event: {
                namespace: '.magnific-popup-wrapper',

                names: {
                    /* Called when iframe document onready event fires */
                    iframeReady: 'iframeReady',

                    /* Called before resizing the iframe */
                    iframeResize: 'iframeResize',

                    /* Called when the popup is opened */
                    open: 'open',

                    /* Called when the popup is closed */
                    close: 'close'
                }
            },

            /* data to be passed into Magnific Popup */
            options: {}
        };

    initializeSettings();
    initializeEvents();
    initializePopups();
    registerGlobalEvents();

    window.mfpWrapper = $.extend(true, {}, settings, {
        events: events,
        getPopupInstance: _getPopupInstance,
        nsp: nsp
    });

    /* Initialize settings */
    function initializeSettings() {
        var jsDefaults = (typeof window.mfpWrapperDefaults !== 'undefined') ? window.mfpWrapperDefaults : {};
        assert(typeof jsDefaults === 'object', 'window.mfpWrapperDefaults is not an object');
        settings = $.extend(true, {}, defaults, jsDefaults);
    }

    /* Define all the (namespaced) events */
    function initializeEvents() {
        var names = settings.event.names;
        for (var key in names) {
            if (names.hasOwnProperty(key))
                events[key] = nsp(names[key]);
        }
    }

    /* Activate the popups */
    function initializePopups() {
        var key = settings.dataOptionsKey;
        $(settings.selector).each(function () {
            var $this = $(this),
                options,
                dataOptions = $this.data(key) || {};

            /* data-* options should be strictly an object */
            assert(typeof dataOptions === 'object', 'data-' + key + ': ' + dataOptions + ' is the a wrong format');

            options = $.extend(true, {}, settings.options, dataOptions);

            /* Call the $.fn.magnificPopup function */
            $this.magnificPopup(options);

            /* Stop propagation on child elements */
            var $child = $this.find(settings.stopPropagationSelector);
            $child.on(nsp('click'), function (event) {
                event.stopPropagation();
            });

            /* Add event listeners */
            $this.on('mfpOpen', function () {
                $this.trigger(events.open);

                /* Add data- attributes on the iframe to be picked up from the iframe script */
                if (_getPopupInstanceSt().type === 'iframe') {
                    var resizeKey = settings.iframeResizeKey,
                        autoResizeKey = settings.iframeAutoResizeKey;

                    if ($this.data(resizeKey)) {
                        _getIframe().attr('data-' + resizeKey, 'true');
                    }
                    if ($this.data(autoResizeKey)) {
                        _getIframe().attr('data-' + autoResizeKey, 'true');
                    }
                }

            }).on('mfpClose', function () {
                $this.trigger(events.close);
            });

        });


    }

    /* Register global events*/
    function registerGlobalEvents() {
        var $w = $(window),
            $d = $(document);

        /* Close buttons & links */
        $d.on(nsp('click'), settings.closeSelector, function (event) {
            event.preventDefault();
            event.stopPropagation();
            _closePopup();
        });

        $w.on(events.iframeResize, function (e, data) {
            setIframeHeight(data.height);
        });
    }


    /* Get the namespaced event name */
    function nsp(eventname) {
        var namespace = settings.event.namespace;
        /* Ensure the namespace always starts with a preceding period (.), trigger only once */
        if (namespace[0] !== '.') {
            settings.event.namespace = namespace = '.' + namespace;
        }
        return eventname + namespace;
    }

    /* Simple wrapper to throw an error when certain criteria isn't met. */
    function assert(expression, message) {
        if (!expression) {
            throw new Error(message);
        }
    }

    /* Trigger event (from iframe) when ready event occurs */
    function iframeReady() {
        $(window).trigger(events.iframeReady);
    }

    /* Adjust iframe height to the height of the iframe's html */
    function setIframeHeight(height) {
        height = height || $(_getIframeDocument()).find('html').height();

        _getIframe().height(height)
            .parent().css({'padding-top': 0, 'height': height});
    }

    /* Clear the iframe height set by this.setIframeHeight() */
    function clearIframeHeight() {
        _getIframe().height('')
            .parent().css({'padding-top': '', 'height': ''});
    }

    /* Magnific Popup instance */
    function _getPopupInstance() {
        return $.magnificPopup.instance;
    }

    /* Close the popup */
    function _closePopup() {
        return _getPopupInstance().close();
    }

    /* Magnific popup instance settings */
    function _getPopupInstanceSt() {
        return _getPopupInstance().st;
    }

    /* The iframe jQuery element */
    function _getIframe() {
        return $('iframe.mfp-iframe');
    }

    /* The iframe jQuery element */
    function _getIframeDOM() {
        return _getIframe()[0];
    }

    /* The iframe's document object */
    function _getIframeDocument() {
        return _getIframeDOM().contentDocument;
    }

    /* The iframe's window object */
    function _getIframeWindow() {
        return _getIframeDOM().contentWindow || _getIframeDocument().parentWindow;
    }

})(jQuery);
