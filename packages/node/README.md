<a href="https://www.onset.io/?utm_source=github&utm_medium=logo" target="_blank">
  <img src="https://www.onset.io/logo.png" alt="Onset" height="84">
</a>

# Official Onset SDK for Node.js

[![npm version](https://img.shields.io/npm/v/@onsetio/node.svg)](https://www.npmjs.com/package/@onsetio/node)
[![Documentation](https://img.shields.io/badge/documentation-onset.io-green.svg)](https://onset.readme.io/reference/introduction)

Used for loading public and private releases.

## Installation and Usage

Simply install the package:

```sh
npm install --save @onsetio/node
yarn add @onsetio/node
```

Setup and usage of these SDKs always follows the same principle.

```js
import OnsetAPI from "@onsetio/node";

const onsetSDK = new OnsetAPI("__API_KEY__");
const releases = onsetSDK.releases.list();
```
