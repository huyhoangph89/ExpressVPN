; (function ($, window, undefined) {
  'use strict';

  let pluginName = 'carousel',
      $window    = $(window);

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      let that = this,
        el = that.element
        el.slick({
            dots: !0
        })
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
