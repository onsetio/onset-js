<a href="https://www.onset.io/?utm_source=github&utm_medium=logo" target="_blank">
  <img src="https://www.onset.io/logo.png" alt="Onset" height="84">
</a>

# Official Onset SDK for Widget Embed
[![npm version](https://img.shields.io/npm/v/@onsetio/widget.svg)](https://www.npmjs.com/package/@onsetio/widget)
[![Documentation](https://img.shields.io/badge/documentation-onset.io-green.svg)](https://docs.onset.io/widget/)

We recommend that you should always be loaded the Widget.js script directly from https://widget.onset.io/widget.js, rather than included in a bundle or hosted yourself. If must bundle the Widget code into your application, you can use this packcage.

## Installation and Usage
Simply install the package:

```bash
npm install --save @onsetio/widget
yarn add @onsetio/widget
```

Setup and usage of these SDKs always follows the same principle.

```js
import Widget from '@onsetio/widget';

const widgetInstance = new Widget({
  page: '__PAGE_HOST__',
  // ...
});
```

## Embed via CDN
```html
<script>
  window.onsetWidgetSettings = {
    triggerText: '🔔 What\'s New',
    page: '__PAGE_HOST__',
    // ...
  };

  (function (e, t) {
    e.onsetWidget = {};
    e.onsetWidget.on = function () {
      (e.onsetWidget.$ = e.onsetWidget.$ || []).push(arguments);
    };
    var c = t.getElementsByTagName('script')[0],
    i = t.createElement('script');
    i.async = true;
    i.src = 'https://widget.onset.io/widget.js';
    c.parentNode.insertBefore(i, c);
  })(window, document);
</script>
```
