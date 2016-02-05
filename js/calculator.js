/* global angular */
(function () {
    "use strict";
    angular
        .module('calculator', [])            
        .controller('CalculatorController', function ($scope) {
			$scope.input = '';
			$scope.output = '0';

			angular.element('button').bind('keypress', function (e) {
				if (e.keyCode === 13 || e.keyCode === 32) {
					e.preventDefault();
				}
			});

			$scope.addInput = function (inputText) {
				$scope.input = $scope.input + inputText;

				angular.element(':focus').blur();
			};

			$scope.backspace = function () {
				if ($scope.input.slice(-1) === ' ') {
					$scope.input = $scope.input.slice(0, -3);
				} else {
					$scope.input = $scope.input.slice(0, -1);
				}
			};

			$scope.calculateInput = function () {
				try {
					$scope.output = $scope.$eval($scope.input);
				} catch (err) {
					$scope.output = "Invalid Syntax";
				}
			};

			$scope.checkKey = function (event) {
				var pressed;

				// Subtract 48 if the key is on the numpad
				if (event.keyCode >= 96 && event.keyCode <= 105	) {
					pressed = String.fromCharCode(event.keyCode - 48);
				} else {
					pressed = String.fromCharCode(event.keyCode);
				}

				if (event.shiftKey) {
					switch (event.which) {
						case 56:
							$scope.addInput(' * ');
							break;
						case 187:
							$scope.addInput(' + ');
							break;
					}
				} else {
					switch (event.which) {
						case 8:
						case 46:
							$scope.backspace();
							break;
						case 13:
						case 187:
							$scope.calculateInput();
							break;
						case 27:
							$scope.clearInput();
							break;
						case 110:
						case 190:
							$scope.addInput('.');
							break;
						case 106:
							$scope.addInput(' * ');
							break;
						case 107:
							$scope.addInput(' + ');
							break;
						case 109:
						case 189:
							$scope.addInput(' - ');
							break;
						case 111:
						case 191:
							$scope.addInput(' / ');
							break;
						default:
							if (!isNaN(parseInt(pressed, 10))) {
								$scope.addInput(pressed);
							}
							break;
					}
				}
			};

			$scope.clearInput = function () {
				$scope.input = '';
				$scope.output = '0';
			};
        });
}());
