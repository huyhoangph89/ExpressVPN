; (function ($, window, undefined) {
  'use strict';

  let pluginName = 'toggle-menu';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      let that = this,
        el = that.element,
        curs = $('[back-top]'),
        cursTarget = curs.attr('href');
      
      curs.on('click',function(e){
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $(cursTarget).offset().top
        }, 600);
        return false;
      });

      el.on('click',function(){
        $('html').toggleClass('open-menu');
      });
    },

    destroy: function () {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      let instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {

  };

  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
