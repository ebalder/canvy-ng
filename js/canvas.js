'use strict';

var ng = require('angular')

ng.module('canvy', [])
.directive('canvyLayout', function(){
	return {
		template: require('../templates/canvy-layout.html'),	
		transclude: true,
		restrict: "EA",
		replace: true,
		controller: function(){
			this.print = function(msg){
				console.log('------', msg);
			}
		}
	}
})

var panel = require('./panel')

