<a href="https://www.onset.io/?utm_source=github&utm_medium=logo" target="_blank">
  <img src="https://www.onset.io/logo.png" alt="Onset" height="84">
</a>

_Keep your customers and stakeholders aligned and informed on the latest product changes._

# Official Onset SDKs for JavaScript

This is the next line of Onset JavaScript SDKs, comprised in the `@onsetio/` namespace. It will provide a more convenient interface and improved consistency between various JavaScript environments.

## Supported Platforms

For each major JavaScript platform, there is a specific high-level SDK that provides all the tools you need in a single package. Please refer to the README and instructions of those SDKs for more detailed information:

- [`@onsetio/browser`](https://github.com/onsetio/onset-js/tree/main/packages/browser): SDK for Browsers
- [`@onsetio/node`](https://github.com/onsetio/onset-js/tree/master/packages/node): SDK for Node.js
- [`@onsetio/widget`](https://github.com/onsetio/onset-js/tree/master/packages/widget): SDK for Widget

## Installation and Usage

To install a SDK, simply add the high-level package, for example:

```sh
npm install --save @onsetio/browser
yarn add @onsetio/browser
```

Setup and usage of these SDKs always follows the same principle.

```js
import { loadPage } from '@onsetio/browser';

const page = await loadPage('__PAGE_SLUG__');
const releases = page.releases();
```
