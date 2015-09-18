'use strict';

var ng = require('angular')
var $ = require('jquery')
require('sortable')

ng.module('canvy')
.directive('canvyPanel', function(){
	return {
		template: require('../templates/canvy-panel.html'),
		transclude: true,
		scope: {
			
		},
		restrict: "EA",
		require: "^canvyLayout",
		replace: true,
		controller: function($scope){
		},
		link: function($scope, el, attrs, canvyLayout){
			var $el = $(el);
			$el.sortable({
				revert: true,
				connectWith: '.canvy-panel'
			});
			canvyLayout.print('asdfasdf');
		}
	}
})

var item = require('./item')
