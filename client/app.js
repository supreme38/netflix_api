angular.module('app', [])

.controller('mainCtrl', function($scope, $http) {
  $scope.search = (data) => {
		$http.post('/search', data).then((response) => {
			$scope.list = (response.data)
			console.log(response.data)
		});
	}

});
