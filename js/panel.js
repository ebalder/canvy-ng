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
			el[0].panel = $scope.panel;
			$el.sortable({
				revert: true,
				connectWith: '.canvy-panel',
			})
			.on('sortbeforestop', swapItem)
			.on('sortupdate', function(ev){
				console.log('--', $scope.panel.items)
			})
		}
	}
})

function swapItem (ev, ui){
	var src = ui.item.parent()[0].panel;
	var dest = ui.placeholder.parent()[0].panel;
	var oldIndex = ui.item.index() -1;
	var newIndex= ui.placeholder.index() -1;
	var item = src.items.splice(oldIndex, 1);
	console.log(item);
	dest.items.splice(newIndex, 0, item[0]);	
}

var item = require('./item')
