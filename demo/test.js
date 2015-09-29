'use-strict';

var ng = angular;

ng.module('myApp', ['canvy'])
.controller('myCanvas', function($scope, $http){
	$scope.data = {
		name: 'testLayout',
		unit: [1/10, 1/3],
		panels: [
			{
				name: 'Panel 1',
				upperLeft: [0, 0],
				area: [6, 3],
				items: [
					{
						name: 'Item 1',
						color: 'orange'
					},
					{
						name: 'Item 2',
						color: 'orange'
					},
					{
						name: 'Item 3',
						color: 'orange'
					}
				]
			},
			{
				name: 'Panel 2',
				upperLeft: [6, 0],
				area: [4, 3],
				items: [
					{
						name: 'Item 4',
						color: 'orange'
					},
					{
						name: 'Item 5',
						color: 'orange'
					},
					{
						name: 'Item 6',
						color: 'orange'
					}
				]
			},
		
		
		]
	};
	$scope.save = function(){
		$http.put('/canvas', $scope.data)
		.then(function(){console.log('saved')},
			function(){console.log('error')}
		 );
	};

	$scope.load = function(name){
		$http.get('/canvas/' + name)
		.then( function(){console.log('got');},
			function(){console.log('error')}
		);
	};	
})
