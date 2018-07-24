angular.module('ketoboy')
  .directive(
    'dateInput',
      function(dateFilter) {
      return {
        require: 'ngModel',
        template: '<input type="date"></input>',
        replace: true,
        link: function(scope, elm, attrs, ngModelCtrl) {
          ngModelCtrl.$formatters.unshift(function (modelValue) {
            console.log(modelValue);
            return dateFilter(modelValue, 'yyyy-MM-dd');
          });

          ngModelCtrl.$parsers.unshift(function(viewValue) {
            console.log(viewValue);
            return new Date(viewValue);
          });
        }
      };
  });