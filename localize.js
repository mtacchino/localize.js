
(function() {
  function Localize(keyword, path, defaultLang) {
    this.translations = {};
    this.keyword = keyword || 'translate';
    this.path = path || '/translations/';
    this.defaultLang = defaultLang || 'en';
  }

  Localize.prototype.translate = function(lang) {
    var object = this,
        translationLang = lang || navigator.language || navigator.userLanguage || (navigator.languages ? navigator.languages[0] : defaultLang),
        elems = Array.prototype.slice.call(document.querySelectorAll('[' + this.keyword + ']'));

    this.getTranslations(translationLang, function(translations) {
      elems.forEach(function(elem) {
        var key = elem.getAttribute(object.keyword);
        if (translations[key]) {
          elem.innerHTML = translations[key];
        }
      });
    });
  };

  Localize.prototype.getTranslations = function(lang, cb) {
    var object = this;

    if (object.translations && object.translations[lang]){
      cb(object.translations[lang]);
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
          object.translations[lang] = JSON.parse(xhttp.responseText);
          cb(object.translations[lang]);
          return;
        }
      }
    };
  }



  var scripts = document.getElementsByTagName('script');
  var localizeScript = scripts[scripts.length-1];
  var keyword = localizeScript.getAttribute('keyword'),
      path = localizeScript.getAttribute('path'),
      defaultLang = localizeScript.getAttribute('default-lang');

  window.Localize = new Localize(keyword, path, defaultLang);
  window.Localize.translate(defaultLang);
})();
