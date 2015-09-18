'use strict';

var ng = require('angular')
var $ = ng.element = require('jquery-ui')
require('sortable')

ng.module('canvy')
.directive('canvyItem', function(){
	return {
		restrict: 'AE',
		transclude: true,
		require: '^canvyPanel',
		template: require('../templates/canvy-item.html'),
		link: function($s, el, attrs){
			var $el = $(el);
			$el.text(attrs.name);
			$el.sortable();
			$el.draggable({
				connectToSortable: $el.siblings(), 
				revert: 'invalid'
			})
		}
	}
})
