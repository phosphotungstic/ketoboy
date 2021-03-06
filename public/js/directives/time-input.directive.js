angular.module('ketoboy')
  .directive(
    'timeInput',
      function() {
      return {
        require: 'ngModel',
        template: '<input type="time"></input>',
        replace: true,
        link: function(scope, elm, attrs, ngModelCtrl) {
          ngModelCtrl.$formatters.unshift(function (modelValue) {
            console.log(modelValue);
            return modelValue;
          });

          ngModelCtrl.$parsers.unshift(function(viewValue) {
            console.log(viewValue);
            return viewValue;
          });
        }
      };
  });