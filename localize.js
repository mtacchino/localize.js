
var Localize = (function() {
    var scripts = document.getElementsByTagName('script');
    var localizeScript = scripts[scripts.length - 1];

    var keyword = localizeScript.getAttribute('keyword') || 'translate',
        path = localizeScript.getAttribute('path') || '/translations/',
        defaultLang = localizeScript.getAttribute('default-lang') || 'en',
        translations = {};

  /**
   * Translates the page using the specified language
   * @param {String} lang
   * @returns {Promise}
   */
  function translate(lang) {
    var translationLang = lang || navigator.language || navigator.userLanguage || (navigator.languages ? navigator.languages[0] : defaultLang),
        elems = document.querySelectorAll('[' + keyword + ']');

    if (Localize) {
      Localize.currentLang = lang;
    }

    return getTranslations(translationLang)
      .then(function(translations) {
        for (var i = 0; i < elems.length; i++) {
          var key = elems[i].getAttribute(keyword);
          if (translations[key]) {
            elems[i].innerHTML = translations[key];
          }
        }
      });
  };

  /**
   * Retrieve translations object from a JSON file
   * @param {String} lang
   * @returns {Promise}
   */
   function getTranslations(lang) {
    return new Promise(function(resolve, reject) {
      if (translations[lang]){
        resolve(translations[lang]);
        return;
      }

      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", path + lang + ".json", true);
      xhttp.send();
      var retry = true;

      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
          if (xhttp.status == 404 && retry) {
            if (lang.length > 2) {
              lang = lang.substring(0,2);
              xhttp.open("GET", path + lang.substring(0,2) + ".json", true);
              xhttp.send();
              retry = false;
            }
          }
          else if (xhttp.status == 200) {
            translations[lang] = JSON.parse(xhttp.responseText);
            resolve(translations[lang]);
          }
        }
      };

      xhttp.onerror = function() {
        reject(new Error("Error retrieving translations."));
      };
    });
  }

  translate(defaultLang);
  return {
    translate: translate,
    currentLang: defaultLang
  };
})();
