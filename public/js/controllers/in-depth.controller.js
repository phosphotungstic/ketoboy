angular.module('ketoboy')
  .controller('InDepthController', InDepthController);

InDepthController.$inject = ['$window', 'RequestService'];

function InDepthController($window, RequestService) {
  let ctrl = this;

  ctrl.updateData = function(newDate) {
    RequestService.getDetailedCalorieInfo(newDate)
      .then(function (res) {
        ctrl.detailedCalorieInfo = res.data;
        ctrl.showTable = ctrl.detailedCalorieInfo.length !== 0;
      });
  }
}