'use strict';

var ng = require('angular')
var $ = require('jquery-ui')

ng.module('canvy')
.directive('canvyItem', function($timeout){
	return {
		restrict: 'AE',
		replace: true,
		transclude: true,
		require: '^canvyPanel',
		template: require('../templates/canvy-item.html'),
		scope: true,
		controller: function($scope){

		},
		link: function($scope, el, attrs, panel){
			var $el = $(el);
			var nameInput = $('.canvy-item-name-input', $el);
			var inputOverlay = $('.overlay', $el);
			el[0].item = $scope.item;
			$el.css({
				"background-color": $scope.item.color
			});
			$scope.$watch(attrs.ngActivate,
				function(val){
					if(val){
						nameInput.prop('disabled', false);
						$timeout(function(){nameInput.focus()}, 10);
						inputOverlay.css({"z-index": -1});
					}
					else{
						nameInput.blur();
						nameInput.prop('disabled', true);
						inputOverlay.css({"z-index": 1});
					}
				}, 
			true);

			$scope.enter = function(ev){
				if(ev.key == 'Enter'){
					$scope.editing = false;
				}
			};

			$scope.destroy = function(){
				el.remove();
				$scope.$parent.removeItem($el.index());
				$scope.$destroy();
			}
		}
	}
})


