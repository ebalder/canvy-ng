'use strict';
console.log('asdfasdf');
var ng = require('angular')

ng.module('canvy', [])
.directive('canvyLayout', function($http){
	return {
		template: require('../templates/canvy-layout.html'),	
		transclude: true,
		restrict: "EA",
		replace: true,
		controller: function($scope){
		},
		link: function(scope, el, attrs){
			
		}
	}
})

var panel = require('./panel')
var editor = require('./editor')

