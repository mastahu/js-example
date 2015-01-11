'use strict'

angular.module('app', []);
angular.module('app').config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');
});

angular.module('app').controller('ProductListCtrl', [ '$scope', '$http', function($scope, $http) {
	console.log('jee');

    $scope.products = [{name: "aaa"}, {name: "bbb"}];

}]);