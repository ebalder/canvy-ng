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
			el.panel = $scope.panel;
			$el.sortable({
				revert: true,
				connectWith: '.canvy-panel',
			})
			.on('sortbeforestop', swapItem($scope.panel.items))
			.on('sortremove', removeItem($scope.panel.items))
			.on('sortreceive', addItem($scope.panel.items))
		}
	}
})

function removeItem(items) {
	return function(ev, ui){
		var index = ui.item.index() -1;
		items.splice(index, 1);
	console.log('removed ', items);
	}
}

function addItem(items) {
	return function(ev, ui) {
		var index = ui.placeholder.index() -1;
		items.splice(index, 0, ui.item[0].item);
		console.log('added ', items);
	}
}

function swapItem(items){
	return function (ev, ui){
		var oldIndex = ui.item.index() -1;
		var newIndex= ui.placeholder.index() -1;
		if(ev.target == ui.item.parent()[0]){
			var item = items.splice(oldIndex, 1);
			items.splice(newIndex, 0, item[0]);	
		}
		else{
			removeItem(index)
		}
		console.log('swapped ', items);
	}
}

var item = require('./item')
