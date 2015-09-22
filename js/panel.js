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
			.on('sortstop', function(ev, ui){
				var oldIndex = $(ui.item).index();
				var newIndex = $(ui.placeholder).index();
				if(ev.target = ui.item.parent()){
					var item = $scope.panel.items.splice(oldIndex, 1);
					$scope.panel.items.splice(newIndex, 0, item[0]);	
					console.log('asdf', $scope.panel.items);
					$scope.$apply();
				}	
			});
		}
	}
})

var item = require('./item')
