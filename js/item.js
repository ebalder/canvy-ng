'use strict';

var ng = require('angular')
var $ = ng.element = require('jquery-ui')

ng.module('canvy')
.directive('canvyItem', function(){
	return {
		restrict: 'AE',
		replace: true,
		transclude: true,
		require: '^canvyPanel',
		template: require('../templates/canvy-item.html'),
		link: function($s, el, attrs){
			var $el = $(el);
			$el.text(attrs.name);
		}
	}
})
