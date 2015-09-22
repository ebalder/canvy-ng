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
		scope: false,
		controller: function($scope) {
			
		},
		link: function($scope, el, attrs, layout){
			var $el = $(el);
			$el.sortable({
				revert: true,
				connectWith: '.canvy-panel',
			})
			.on('sortstop', function(ev, $el){
			});
		}
	}
})

var item = require('./item')
