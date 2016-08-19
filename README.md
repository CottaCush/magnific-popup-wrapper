# Magnific Popup Wrapper
This is a wrapper script for Dmitry Semenov's [Magnific-Popup](https://github.com/dimsemenov/Magnific-Popup).

The aim of this wrapper script is to provide a way to initialize (and customize) Magnific Popup instances using HTML (alone).


## Getting Started
To get started with the wrapper, include jQuery, Magnific Popup then the wrapper script:

```html
<script src="path/to/jquery.js"></script>
<script src="path/to/jquery.magnific-popup.js"></script>
<script src="path/to/jquery.magnific-popup-wrapper.js"></script>
``` 


## Usage

The plugin can be instantiated using HTML or jQuery:
 
### 1. Using HTML
Using this wrapper with HTML is as simple as adding the `data-mfp` attribute to any element you wish to initialize with Magnific Popup:
```html
<a href="#modal" data-mfp>Here's a Magnific Popup link</a>
```

#### Passing options
You can pass options to Magnific Popup from the element using the `data-mfp-options` attribute. 
```html
<a href="ajax.html" data-mfp data-mfp-options='{"type": "ajax"}'>Here's a Magnific Popup link</a>
```

Please note that the content of the `data-mfp-options` attribute must be valid JSON to work.
Something like ` data-mfp-options='{"type": "ajax", "modal": true}'` is valid and ` data-mfp-options="{'type': 'ajax'}"` is invalid.


#### Stop propagation on child elements
To prevent the popup from opening on children elements of a Magnific Popup link, use the `data-mfp-no-propagate` attribute.

```html
<a href="#modal" data-mfp>
    This link opens the popup except for <span data-mfp-no-propagate>"this text"</span>
</a>
```

#### Close the popup
Add the `data-mfp-close` attribute to cancel links and buttons in the popup. 
```html
<div class="modal">
    ...
    <button type="button" data-mfp-close>Close</button>
</div>
```
Please note that the above won't work in iframes without custom work.


### 2. Using jQuery
Using the wrapper with jQuery is as simple as `$(element).mfpWrapper(options)` where `options` is an optional object passed into Magnific Popup. 



## Customizing
You can customize the wrapper defaults using `$.mfpDefaults`. The wrapper defaults looks like the following:
```js
{
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
}
```



## Zepto.js support?
This plugin was not built in mind for Zepto.js, and wasn't tested with Zepto.js. Pull requests are welcome if you can build support for Zepto.js


## Licence
This plugin is provided under the MIT License, so feel free to use as you wish.