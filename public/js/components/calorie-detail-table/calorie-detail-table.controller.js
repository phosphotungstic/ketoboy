angular.module('ketoboy')
  .controller('CalorieDetailTableController', CalorieDetailTableController);

CalorieDetailTableController.$inject = ['$http', '$window', 'moment', '_', 'RequestService', '$scope'];

function CalorieDetailTableController($http, $window, moment, _, RequestService) {
  let ctrl = this;

  ctrl.delete = function(index) {
    RequestService.deleteCalorie(ctrl.tableData[index].calorie_id)
      .then(function() {
        console.log('deleted');
        ctrl.tableData.splice(index,1);
      })
  };

  ctrl.getFormattedTime = function(dateTime) {
    return moment(dateTime).format('hh:mm A');
  };

  ctrl.$onInit = function() {
  };
}