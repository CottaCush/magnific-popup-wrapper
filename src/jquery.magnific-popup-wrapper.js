;(function ($) {
    var settings,
        defaults = {
            /* The selector used to find all valid popup links */
            selector: '[data-mfp]',

            /* data- attribute on the link used to grab extra options to be passed into Magnific Popup */
            dataOptionsKey: 'mfp-options',

            /* Prevent a click on these elements from opening the popup */
            stopPropagationSelector: '[data-mfp-no-propagate]',

            /* Selector for close links and buttons */
            closeSelector: '[data-mfp-close]',

            /* Namespace used for events */
            eventNamespace: '.magnific-popup-wrapper',

            /* data to be passed into Magnific Popup */
            options: {}
        };


    /* Define the jQuery plugin */
    $.fn.mfpWrapper = function (options) {
        return this.each(function () {
            Wrapper(this, options);
        });
    };

    /* Initialize settings */
    $.mfpWrapperDefaults = $.mfpWrapperDefaults || {};
    assert(typeof $.mfpWrapperDefaults === 'object', '$.mfpWrapperDefaults is not a valid object');
    settings = $.extend(true, {}, defaults, $.mfpWrapperDefaults);

    /* Activate the popups */
    $(settings.selector).mfpWrapper();

    /* Close buttons & links */
    $(document).on(nsp('click'), settings.closeSelector, function (event) {
        event.preventDefault();
        event.stopPropagation();
        $.magnificPopup.instance.close();
    });


    /* The Wrapper Class */
    function Wrapper(element, options) {
        var $ele = $(element),
            dataOptions = $ele.data(settings.dataOptionsKey) || {};

        options = options || {};

        /* options should be strictly an object */
        assert(typeof options === 'object', 'options is an invalid object');

        /* data-* options should be strictly an object */
        assert(typeof dataOptions === 'object', 'data-' + settings.dataOptionsKey + ': ' + dataOptions + ' is invalid JSON');

        options = $.extend(true, {}, settings.options, options, dataOptions);

        /* Call the $.fn.magnificPopup function */
        $ele.magnificPopup(options);

        /* Stop propagation on child elements */
        var $child = $ele.find(settings.stopPropagationSelector);
        $child.on(nsp('click'), function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
    }

    /* Get the namespaced event name */
    function nsp(eventname) {
        var namespace = settings.eventNamespace;
        /* Ensure the event namespace always starts with a preceding period (.), trigger only once */
        if (namespace[0] !== '.') {
            settings.eventNamespace = namespace = '.' + namespace;
        }
        return eventname + namespace;
    }

    /* Simple wrapper to throw a TypeError when certain criteria isn't met. */
    function assert(expression, message) {
        if (!expression) {
            throw new TypeError(message);
        }
    }

})(jQuery);