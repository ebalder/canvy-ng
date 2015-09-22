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
		controller: function($scope){
		},
		link: function(scope, el, attrs, panel){
			var $el = $(el);
			scope.index = $el.index();
			el.attr('item', scope.item);	
			el.attr('index', scope.index);
		}
	}
})
