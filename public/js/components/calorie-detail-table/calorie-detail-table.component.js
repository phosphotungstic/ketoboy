import './calorie-detail-table.controller';

angular.module('ketoboy')
  .component('calorieDetailTable', {
    templateUrl: '/js/components/calorie-detail-table/calorie-detail-table.template.html',
    controller: 'CalorieDetailTableController',
    bindings: {
      tableData: "<?"
    }
  });