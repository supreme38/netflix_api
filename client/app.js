angular.module('app', [])

.controller('mainCtrl', function($scope, $http) {

  $scope.search = (data) => {
    if (data === undefined) {
      return;
    }
    $scope.clear();
    $http.post('/', data).then((response) => {
			$scope.list = (response.data);
      $scope.query.title = null;
      console.log(response.data)
      if (response.data.statusCode === 404) {
        $scope.error = true;
        $scope.results = false;
      }
		});
	}

  $scope.clear = () => {
    $scope.results = true;
    $scope.error = false;
  }
  
});
