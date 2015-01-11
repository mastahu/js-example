'use strict'

angular.module('app', []);
angular.module('app').config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');
});

angular.module('app').controller('ProductListCtrl', [ '$scope', '$http', function($scope, $http) {

	$scope.products = [];
	var counter = 0;
	var limit = 50;
	var productsPending = true;


	$scope.loadMore = function() {
		if (productsPending) {

			var config = {
				method: 'GET',
				url: 'api/products',
				params: {
					offset: counter,
					limit: limit
				}
			}
			$http(config).success(function(response) {
				$scope.products = $scope.products.concat(response.data);
				counter = counter + response.data.length;
				if (response.data.length < limit) {
					productsPending = false;
				}
			});
		}
	};

	$scope.loadMore();

}]);

angular.module('app').directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});
