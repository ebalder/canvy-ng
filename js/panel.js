'use strict';

var ng = require('angular')
var $ = require('jquery-ui')

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
			$scope.mouseOver = false;
		},
		link: function($scope, el, attrs, layout){
			var $el = $(el); //required for jqueryUI
			var panel = $scope.panel;
			layout = $scope.$parent; //ToDo: why is layout empty?
			var unit = layout.data.unit.map(function(curr){return curr*100});
			el[0].panel = panel;
			var arr = $('ul',$el).sortable({
				revert: true,
				helper: 'clone',
				connectWith: '.canvy-panel ul',
			})
			.on('sortstop', swapItem)
			.on('sortstart', setInitialIndex);

			$el.css({
				position: 'absolute',
				border: 'solid',
				"box-sizing": 'border-box',
				top: (unit[1] * panel.upperLeft[1]) +'%',
				left: (unit[0] * panel.upperLeft[0]) +'%',
				width: (unit[0] * panel.area[0]) +'%',
				height: (unit[1] * panel.area[1]) +'%'
			});

			$scope.removeItem = function(index){
				delete $scope.panel.items[index];
			}
			$scope.newItem = function(){
				panel.items.push({ name: 'new-item'});

			}

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
