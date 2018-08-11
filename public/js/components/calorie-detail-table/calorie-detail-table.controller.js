angular.module('ketoboy')
  .controller('CalorieDetailTableController', CalorieDetailTableController);

CalorieDetailTableController.$inject = ['$http', '$window', 'moment', '_', 'RequestService', '$scope'];

function CalorieDetailTableController($http, $window, moment, _, RequestService) {
  let ctrl = this;

  ctrl.$onInit = function() {
  };
}