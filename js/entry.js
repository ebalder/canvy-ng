'use strict';

var ng = require('angular')

ng.module('canvy')
.directive('canvy-entry', function(){
	return {
		restrict: 'AE'
		transclude: true,
		template: require('../templates/canvy-entry.html')
	}
})
