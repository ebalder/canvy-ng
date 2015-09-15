'use strict';

var ng = require('angular');

ng.module('canvy', [])
.directive('canvyLayout', function(){
	return {
		template: require('../templates/canvy-layout.html'),	
		restrict: "EA"
	}
})
