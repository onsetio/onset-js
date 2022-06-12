<a href="https://www.onset.io/?utm_source=github&utm_medium=logo" target="_blank">
  <img src="https://www.onset.io/logo-white.png" alt="Onset" height="84">
</a>

# Official Sentry SDK for Browsers
Used for loading public releases.

## Installation and Usage

Simply install the package:

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
