; (function ($, window, undefined) {
  'use strict';
  
  var pluginName = 'name-of-plugin';
  
  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }
  
  // private function here
  
  Plugin.prototype = {
    // public function here
    init: function () {
      // code here
    },
    
    destroy: function () {
      $.removeData(this.element[0], pluginName);
    }
  };
  
  $.fn[pluginName] = function (options, params) {
    return this.each(function () {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };
  
  $.fn[pluginName].defaults = {
    // add options here
  };
  
  $(function () {
    $('[data-' + pluginName + ']')[pluginName]();
  });
  
}(jQuery, window));
