'use strict';

var ng = require('angular')

ng.module('canvy', [])
.directive('canvyLayout', function(){
	return {
		replace: true,
		template: require('../templates/canvy-layout.html'),	
		transclude: true,
		restrict: "EA",
	}
})

var panel = require('./panel')

