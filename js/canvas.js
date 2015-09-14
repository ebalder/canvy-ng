
var ng = require('angular');
console.log('asdasdfwt');
ng.module('canvas').directive('canvas', function(){
	return{
		template: require('../templates/canvas.html'),	
		restrict: "A"
	}
})
