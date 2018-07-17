angular.module('ketoboy')
  .controller('SettingsFormController', SettingsFormController);

  SettingsFormController.$inject = ['RequestService'];

function SettingsFormController(RequestService) {
  var ctrl = this;
  RequestService.getMaxCalories()
    .then(function(res) {
      ctrl.currentMax = res.data.max_calorie;
      console.log(ctrl.currentMax);
    })
    .catch(function(e) {
      console.log(e);
    });

  ctrl.submit = function() {
    RequestService.updateMaxCalories(ctrl.currentMax)
      .then(function(res) {
        console.log('success');
      })
      .catch(function(e) {
        console.log(e);
      });
  }
} 