(function () {
    "use strict";
    angular
        .module('calculator', [])            
        .controller('CalculatorController', function ($scope) {
			$scope.input = '';
			$scope.output = '0';

			$scope.addInput = function (inputText) {
				$scope.input = $scope.input + inputText;
			};

			$scope.clearInput = function () {
				$scope.input = '';
				$scope.output = '0';
			};

			$scope.calculateInput = function () {
				try {
					$scope.output = $scope.$eval($scope.input);
				} catch (err) {
					$scope.output = "Invalid Syntax";
				}
			};

			$scope.backspace = function () {
				$scope.input = $scope.input.trim().slice(0, -1).trim();
			};
        });
}());
