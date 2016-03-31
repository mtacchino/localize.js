
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
   */
  function translate(lang) {
    var translationLang = lang || navigator.language || navigator.userLanguage || (navigator.languages ? navigator.languages[0] : defaultLang),
        elems = Array.prototype.slice.call(document.querySelectorAll('[' + keyword + ']'));

    if (Localize) {
      Localize.currentLang = lang;
    }
    
    getTranslations(translationLang, function(translations) {
      elems.forEach(function(elem) {
        var key = elem.getAttribute(keyword);
        if (translations[key]) {
          elem.innerHTML = translations[key];
        }
      });
    });
  };

  /**
   * Retrieve translations object from a JSON file
   * @param {String} lang
   * @param {function(Object)} cb
   */
   function getTranslations(lang, cb) {

    if (translations[lang]){
      cb(translations[lang]);
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
          cb(translations[lang]);
          return;
        }
      }
    };
  }

  translate(defaultLang);
  return {
    translate: translate,
    currentLang: defaultLang
  };
})();
