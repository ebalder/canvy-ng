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
		scope: true,
		controller: function($scope){

		},
		link: function($scope, el, attrs, panel){
			var $el = $(el);
			el[0].item = $scope.item;
			$el.css({"background-color": $scope.item.color});
		}
	}
})
