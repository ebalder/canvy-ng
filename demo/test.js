'use-strict';

var ng = angular;

ng.module('myApp', ['canvy'])
.controller('myCanvas', function($scope, $http){
	$http.get('data.json')
	.then( function(res){
		$scope.data = res.data;
		console.log('got data: %o', res.data);
	} );

	$scope.save = function(){
		$http.put('/canvas', $scope.data)
		.then(function(){console.log('saved')},
			function(){console.log('error')}
		 );
	};

})
