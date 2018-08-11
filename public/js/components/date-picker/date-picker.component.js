import './date-picker.controller';

angular.module('ketoboy')
  .component('datePicker', {
    templateUrl: '/js/components/date-picker/date-picker.template.html',
    controller: 'DatePickerController',
    bindings: {
      onDateChange: "<"
    }
  });