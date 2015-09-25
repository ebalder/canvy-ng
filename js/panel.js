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
			var arr = $el.sortable({
				revert: true,
				helper: 'clone',
				connectWith: '.canvy-panel',
			})
			.on('sortstop', swapItem)
			.on('sortstart', setInitialIndex);
		}
	}
})

function setInitialIndex(ev, ui) {
	ui.item[0].initial = ui.item.index();
}

function swapItem (ev, ui){
	var src = ev.target.panel;
	var dest = ui.item.parent()[0].panel;
	
	var oldIndex = ui.item[0].initial;
	var newIndex= ui.item.index();
	var item = src.items.splice(oldIndex, 1);
	dest.items.splice(newIndex, 0, item[0]);	
}

var item = require('./item')
