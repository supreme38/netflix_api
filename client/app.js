angular.module('app', [])

.controller('mainCtrl', function($scope, $http) {

  $scope.search = (data) => {
    $scope.results = true;
    $http.post('/search', data).then((response) => {
			$scope.list = (response.data)
      $scope.query.title = null;
      console.log(response.data)
      if (response.data.statusCode === 404) {
        console.log('errrr')
        $scope.error = true;
        $scope.results = false;
      }
		});
	}


});
