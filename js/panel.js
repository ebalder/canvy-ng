'use strict';

var ng = require('angular')

ng.module('canvy')
.directive('canvyPanel', function(){
	return {
		template: require('../templates/canvy-panel.html'),
		transclude: true,
		scope: {
			
		},
		restrict: "EA",
		require: "^canvyLayout",
		controller: function($scope){
		},
		link: function($scope, el, attrs, canvyLayout){
			canvyLayout.print('asdfasdf');
		}
	}
})

var item = require('./item')
