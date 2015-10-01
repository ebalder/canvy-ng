(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null)

ng.module('canvy', [])
.directive('canvyLayout', function($http){
	return {
		template: require('../templates/canvy-layout.html'),	
		transclude: true,
		restrict: "EA",
		replace: true,
		controller: function($scope){
		},
		link: function(scope, el, attrs){
			
		}
	}
})

var panel = require('./panel')
var editor = require('./editor')


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../templates/canvy-layout.html":6,"./editor":2,"./panel":4}],2:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);
var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../templates/editor.html":8}],3:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null)
var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null)

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



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../templates/canvy-item.html":5}],4:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null)
var $ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null)

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
			var arr = $el.sortable({
				revert: true,
				helper: 'clone',
				connectWith: '.canvy-panel',
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
				panel.items.push({ name: 'new-item', color: 'blue'});

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../templates/canvy-panel.html":7,"./item":3}],5:[function(require,module,exports){
module.exports = "<li class=\"canvy-item\" ng-init=\"editing = false\"\n\tng-dblclick=\"editing = true\"\t\n\tng-activate=\"editing\" > \n\n\t<input type=\"text\" class=\"canvy-item-name-input\"\n\t\tng-model=\"item.name\"\n\t\tng-blur=\"editing = false\"\n\t\tng-keypress=\"enter($event)\"\n\t\tdisabled>\n\t<div class=\"overlay\"> </div>\n\t<div class=\"remove\" ng-click=\"destroy()\">\n\t\tXx\t\n\t</div>\n</li>\n";

},{}],6:[function(require,module,exports){
module.exports = "<div class=\"canvy-layout\">\n\t<canvy-panel ng-repeat=\"panel in data.panels\">\n\t</canvy-panel>\n\t<canvy-editor></canvy-editor> \n</div>\n";

},{}],7:[function(require,module,exports){
module.exports = "<ul class=\"canvy-panel\" >\n\t<div class=\"canvy-panel-header\">{{panel.name}}</div>\n\t<canvy-item ng-repeat=\"item in panel.items\">\n\t</canvy-item>\n\t<li class=\"add-item\" ng-click=\"newItem()\">+</li>\n</ul>\n";

},{}],8:[function(require,module,exports){
module.exports = "<div>\n\t<input type=\"checkbox\" class=\"canvy-editor\" id=\"canvy-editor\" ng-checked=\"toggleEdit\"/>\n\t<label for=\"canvy-editor\">Edit</label>\n\n</div>\n";

},{}]},{},[1])


//# sourceMappingURL=build.js.map