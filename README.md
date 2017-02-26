# localize.js
[![Build Status](https://travis-ci.org/mtacchino/localize.js.svg?branch=master)](https://travis-ci.org/mtacchino/localize.js?branch=master)
[![npm version](https://badge.fury.io/js/localize-js.svg)](https://badge.fury.io/js/localize-js)

An easy-to-use client-side javascript plugin for localizing/translating/internationalizing your website. Languages are lazy-loaded so only the required language is retrieved when it's needed. No dependencies required.

## Installation
Using npm:
```
npm install localize-js
```

Or simply add the script in the `dist` folder at the bottom of your html page:
```
<script src="/path/to/localize.min.js"></script>
```

## Basic Usage
If you are using npm to require Localise.js, pass options within the `require`. See Attribute Options below for possible arguments
```
var localize = require('localize-js')(options)
```

In your HTML, add a `translate` attribute along with an identifying key to all of the elements that need to be translated. Call the `localize.translate(language)` function to translate the page:

```html
<body>
  <h1 translate="mypage.header"></h1>
  <p translate="mypage.paragraph"></p>
  <script>localize.translate('en')</script>
</body>
```
Translations should be in JSON format. You can specify the directory to look for translations in the [Attribute Options](#Attribute-Options). By default this is `/translations/`
<pre>
.
├── index.html
└── translations
|   ├── en.json
|   ├── fr.json
|   ├── ru.json
|   └── en-UK.json
</pre>

JSON files should have a basic key-value structure like:
```json
{
  "mypage.header": "Header",
  "mypage.paragraph": "This is a paragraph"
}
```

The `translate` function returns a Promise, so you can chain together functions when it is complete:
```javascript
localize.translate("en")
  .then(function(){
    console.log("Done localizing!");
  });
```

See the [example](https://github.com/mtacchino/localize.js/tree/master/example) folder for a demo.

## Attribute Options

Pass an optional `options` object when requiring the localize-js plugin
```
var localize = require('localize-js')({
  keyword: 't'
  path: '/my/translations/folder/',
  defaultLang: 'en',
  initLoc: false
});
```
or in your html
```html
<body>
  <script src="/path/to/localize.js" keyword="t" path="/my/translations/folder/" default-lang="en" init-loc="false"></script>
</body>
```

### keyword

This identifies the translate keyword to used in the page. The default is `translate`. For example:

### path

This is the path in which to find the translations. The default is `/translations/`.

### default-lang

The default language that will be displayed when a user reaches the page. By default, localize.js will use the browser language retrieved from `window.navigator` when `default-lang` is not specified.

### init-loc

Boolean representing whether or not to initialize translation on page load. Defaults to `true`.

## Locales with Country Codes

localize.js supports locales with country codes (eg. `en-CA`). If a locale with a country code is not found in a JSON translation file, localize.js will look for the language without country code. For example, if `en-CA.json` could not be found, it will check for `en.json` before failing.
