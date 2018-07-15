angular.module('ketoboy')
  .component('weekPicker', {
    templateUrl: '/js/components/week-picker/week-picker.template.html',
    controller: 'WeekPickerController',
    bindings: {
      updateGraph: "<"
    }
  });