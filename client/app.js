angular.module('app', [])

.controller('mainCtrl', function($scope, $http) {

  $scope.search = (data) => {
    $scope.clear();
    if (data === undefined) {
      return;
    }
    $http.post('/', data).then((response) => {
      $scope.fadeIn = "animate";
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
    $scope.fadeIn = undefined;
    $scope.results = true;
    $scope.error = false;
  }

});
