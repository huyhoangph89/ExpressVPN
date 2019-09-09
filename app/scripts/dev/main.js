/* global WebFontConfig:true */
//Global function here
//Handlebar Helper function iff
Handlebars.registerHelper('iff', function(a, operator, b, options) {
  var result = false;
  switch (operator) {
    case '===':
      result = a === b;
      break;
    case '!==':
      result = a !== b;
      break;
    case '<':
      result = a < b;
      break;
    case '>':
      result = a > b;
      break;
    case '<=':
      result = a <= b;
      break;
    case '>=':
      result = a >= b;
      break;
    default: {
      throw new Error('helper iff: invalid operator: `' + operator + '`');
    }
  }
  return result ? options.fn(this) : options.inverse(this);
});
//Handlebar Helper for plus and add
Handlebars.registerHelper('plus', function(a, b) {
  return parseInt(a) + parseInt(b);
});

Handlebars.registerHelper('subtract', function(a, b) {
  return parseInt(a) - parseInt(b);
});
//Handlebar Helper for formating number to have comas
Handlebars.registerHelper('addComas', function(num) {
  return num ? num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') : 0;
});

//Handlebar Helper for formating number to have digits, Ex: {{#toFixed 1.234 2} -> 1.23
Handlebars.registerHelper('toFixed', function(num, digits) {
  num = parseFloat(num);
  digits = parseInt(digits);
  return num.toFixed(digits);
});

Handlebars.registerHelper('moduloIf', function(
  index_count,
  mod,
  remain,
  block
) {
  if (parseInt(index_count) % mod === remain) {
    return block.fn(this);
  }
});

Handlebars.registerHelper('eachLimit', function(arr, max, options) {
  if (!arr || arr.length === 0) return options.inverse(this);
  var result = [];
  for (var i = 0; i < max && i < arr.length; ++i)
    result.push(options.fn(arr[i]));
  return result.join('');
});

Handlebars.registerHelper('for', function(from, to, incr, block) {
  var accum = '';
  for (var i = from; i < to; i += incr) accum += block.fn(i);
  return accum;
});

// add method replace all to string type
String.prototype.replaceAll = function(e, t) {
  var r = this;
  return r.replace(
    new RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'),
    t
  );
};
// add method replace all to string type
String.prototype.replaceAll = function(e, t) {
  var r = this;
  return r.replace(
    new RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'),
    t
  );
};

//get QueryString
// function getUrlParameter(name,str) {
//   name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
//   var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
//   var results = regex.exec(str||location.search);
//   return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
// }

window.Site = (function($, window, undefined) {
  var ajaxTemplate = [],
    html = $('html'),
    loadingOverLay = $('.loading-block');

  function isMobileScreen() {
    return window.Modernizr.mq('(max-width: 767px)');
  }

  function isTabletScreen() {
    return window.Modernizr.mq('(max-width: 991px)');
  }

  function isDesktopScreen() {
    return window.Modernizr.mq('(min-width: 992px)');
  }

  function isLargeDesktopScreen() {
    return window.Modernizr.mq('(min-width: 1200px)');
  }

  function isDevice() {
    return html.hasClass('mobile') || html.hasClass('tablet') ? true : false;
  }

  function isTouch() {
    return html.hasClass('touch');
  }

  function isAndroid() {
    return html.hasClass('android');
  }

  function isIOs() {
    return html.hasClass('ios');
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  function checkCookie(cname) {
    var cookie = getCookie(cname);
    if (cookie !== '') {
      return true;
    } else {
      return false;
    }
  }

  function getLocalData(key) {
    if (typeof Storage !== 'undefined') {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.log(error);
        return '';
      }
    } else {
      return '';
    }
  }

  function setLocalData(key, value) {
    if (typeof Storage !== 'undefined') {
      try {
        return localStorage.setItem(key, value);
      } catch (error) {
        console.log(error);
        return '';
      }
    }
  }

  function getTemplate(url) {
    var defer = $.Deferred();
    //Use the url to check if we already loaded the template
    var template = _.find(ajaxTemplate, function(template) {
      return template.url === url;
    });
    if (template) {
      defer.resolve(template.data);
    } else {
      $.ajax({
        url: url,
        type: 'GET'
      })
        .done(function(data) {
          var newTemplate = {
            url: url,
            data: Handlebars.compile(data)
          };
          ajaxTemplate.push(newTemplate);
          defer.resolve(newTemplate.data);
        })
        .fail(function() {
          defer.reject('Error');
        });
    }
    return defer.promise();
  }

  function showLoader(show, loading) {
    var defer = $.Deferred();
    if (show) {
      if (loading) {
        loading.finish().fadeIn(function() {
          defer.resolve();
        });
      } else {
        $('body').addClass('is-loading');
        loadingOverLay.finish().fadeIn(function() {
          defer.resolve();
        });
      }
    } else {
      if (loading) {
        loading.finish().fadeOut(function() {
          defer.resolve();
        });
      }
    }
    setTimeout(function() {
      defer.resolve();
    }, 500);
    return defer.promise();
  }

  function getIdVideoYoutube(source) {
    return source.match(/v=(.+?)$/i)[1];
  }

  function fixPositionWhenOpen() {
    let scrollPos = $(window).scrollTop(),
      body = $('body');
    body.css({
      width: '100%',
      overflowX: 'hidden',
      overflowY: 'hidden',
      position: 'fixed',
      marginTop: -scrollPos
    });
  }

  function fixPositionWhenClose() {
    let body = $('html, body'),
      scrollPos = -parseInt($('body').css('marginTop'));

    $('body').css({
      overflowX: 'hidden',
      overflowY: 'auto',
      position: '',
      width: '',
      marginTop: ''
    });

    body.animate({ scrollTop: scrollPos }, 1);
    //body.scrollTop(scrollPos);
  }

  function showLoading(el) {
    var loading = el.find('.loading-overlay');
    if (loading.length === 0) {
      el.append(
        $(
          '<div class="loading-overlay"><div class="loading-spinner"></div></div>'
        )
      );
    }
    el.addClass('loading');
  }
  function hideLoading(el) {
    el.removeClass('loading');
  }
  function calculateTop(el) {
    var top = 0,
      fixes = $('.section.fixed');
    fixes.each(function(x, i) {
      top += i.offsetHeight;
    });
    return el.offset().top - $('#header').outerHeight() - top - 20;
  }

  // function scrollToElement(el){
  //   $('html,body').animate({scrollTop: calculateTop(el)},600,function(){
  //     var new_fixes = $('.section.fixed');
  //     if(new_fixes.length!==fixes.length){
  //       scrollToElement(el);
  //     }
  //   });
  // }

  function getEnvironment() {
    if (!window.location.origin) {
      window.location.origin =
        window.location.protocol +
        '//' +
        window.location.hostname +
        (window.location.port ? ':' + window.location.port : '');
    }
    if (
      window.location.origin.indexOf('//localhost') !== -1 ||
      window.location.origin.indexOf('//uat.splash.com.vn') !== -1
    ) {
      if (window.location.port === '3001') {
        return 'uat/production';
      } else {
        return 'local';
      }
    } else {
      return 'uat/production';
    }
  }

  function getAPIServer() {
    if (getEnvironment() === 'local') {
      return 'http://localhost:3000';
    } else {
      return window.location.origin;
    }
  }

  console.log('Build success, go main.js for more global variable!!!');

  return {
    //isMobile: isMobile,
    isTouch: isTouch,
    isAndroid: isAndroid,
    isIOs: isIOs,
    // isTablet: isTablet,
    // isDesktop: isDesktop,
    isLargeDesktopScreen: isLargeDesktopScreen,
    isDesktopScreen: isDesktopScreen,
    isTabletScreen: isTabletScreen,
    isMobileScreen: isMobileScreen,
    setCookie: setCookie,
    getCookie: getCookie,
    checkCookie: checkCookie,
    getLocalData: getLocalData,
    setLocalData: setLocalData,
    getTemplate: getTemplate,
    showLoader: showLoader,
    showLoading: showLoading,
    hideLoading: hideLoading,
    // scrollToElement: scrollToElement,
    calculateTop: calculateTop,
    initLightbox: false,
    getIdVideoYoutube: getIdVideoYoutube,
    fixPositionWhenOpen: fixPositionWhenOpen,
    fixPositionWhenClose: fixPositionWhenClose,
    getEnvironment: getEnvironment,
    getAPIServer: getAPIServer,
    isDevice: isDevice
  };
})(jQuery, window);

(function($) {
  WebFontConfig = {
    google: {
      families: ['Raleway:400,700']
    },
    // If fonts load fail, it will be called again after 2s
    timeout: 2000,
    // // Called when all the specified web - font provider modules(google, typekit, and / or custom) have reported that they have started loading fonts. /
    // loading: function() {
    //   // do something
    // },
    // // Called when each requested web font has started loading. The fontFamily parameter is the name of the font family, and fontDescription represents the style and weight of the font. /
    // fontloading: function(fontFamily, fontDescription) {
    //   // do something
    // },
    // // Called when each requested web font has finished loading. The fontFamily parameter is the name of the font family, and fontDescription represents the style and weight of the font. /
    // fontactive: function(fontFamily, fontDescription) {
    //   // do something
    // },
    // // Called if a requested web font failed to load. The fontFamily parameter is the name of the font family, and fontDescription represents the style and weight of the font. /
    // fontinactive: function(fontFamily, fontDescription) {
    //   // do something
    // },
    // Called when all of the web fonts have either finished loading or failed to load, as long as at least one loaded successfully. /
    active: function() {
      if (typeof $('[data-equal-size]')['qual-size'] !== 'undefined') {
        $('[data-equal-size]')['qual-size']();
      }
    }
    // // Called if the browser does not support web fonts or if none of the fonts could be loaded. /
    // inactive: function() {
    //   // do something
    // }
  };

  (function(d) {
    var wf = d.createElement('script'),
      h = document.getElementsByTagName('head')[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    h.appendChild(wf);
  })(document);
})(jQuery);
