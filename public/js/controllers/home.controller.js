angular.module('ketoboy')
  .controller('HomeController', HomeController);

function HomeController($scope) {
  var ctrl = this;
  
  ctrl.dailyLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  ctrl.calorieData = [65, 59, 80, 81, 56, 55, 40];
  ctrl.weightData = [265, 259, 280, 281, 256, 255, 240];

  ctrl.calorieOptions = 
  {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
  }

  ctrl.weightOverride = 
  {
    lineTension: 0
  }
}