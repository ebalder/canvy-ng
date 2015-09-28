'use strict';

var ng = require('angular');
var $ = require('jquery-ui');

ng.module('canvy')
	.directive('canvyEditor', function(){
		return {
			restrict: 'EA',
			replace: true,
			template: require('../templates/editor.html'),
			require: '^canvyLayout',
			scope: false,
			controller: function($scope){
			},
			link: function($scope, el, attrs, layout){
				var canvas = el.parent();
				var overlay = $('<div class="canvy-editor-overlay"></div>', canvas);	
				$('.canvy-editor', el).button();

				$scope.toggleEdit = function(){
					console.log('lets eddit');
				}
			}
		}
	});
