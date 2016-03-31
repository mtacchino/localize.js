# localize.js
An easy-to-use client-side javascript plugin for localizing/translating/internationalizing your website. Languages are lazy-loaded so only the required language is retrieved when it's needed.

## Basic Usage
Insert the localize.js script at the bottom of your HTML file. In your HTML, add a `translate` attribute along with an identifying key to all of the elements that need to be translated. Call the `Localize.translate(language)` function to translate the page:

```html
<body>
  <h1 translate="mypage.header"></h1>
  <p translate="mypage.paragraph"></p>
  <button onclick="Localize.translate('en')">English</button>
  <button onclick="Localize.translate('fr')">French</button>
  <button onclick="Localize.translate('de')">German</button>
  <script src="/path/to/localize.js"></script>
</body>
```
Now in your root directory, create a new directory called `translations`, and add all of your translations to JSON files for loading. The directory listing should look something like:
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

See the [example](https://github.com/mtacchino/localize.js/tree/master/example) folder for a demo.

## Attribute Options
There are three attributes which can be included in the script tag:

### keyword

This identifies the translate keyword to used in the page. The default is `translate`. For example:

```html
<body>
  <p t="example.key"></p>
  <script src="/path/to/localize.js" keyword="t"></script>
</body>
```

### path

This is the path in which to find the translations. The default is `/translations/`. Note that the path is relative to the current page.

```html
  <script src="/path/to/localize.js" path="/path/to/translations/"></script>
```

### default-lang

The default language that will be displayed when a user reaches the page. By default, localize.js will use the browser language retrieved from `window.navigator` when `default-lang` is not specified.

```html
  <script src="/path/to/localize.js" default-lang="en"></script>
```

## Additional Info

localize.js supports locales with country codes (eg. `en-CA`). If a locale with a country code is not found in a JSON translation file, localize.js will look for the language without country code. For example, if `en-CA.json` could not be found, it will check for `en.json` before failing.
