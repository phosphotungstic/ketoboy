angular.module('ketoboy')
  .controller('HomeController', HomeController);

function HomeController($scope) {
  var ctrl = this;
  
  ctrl.dailyLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  ctrl.calorieData = [
    [65, 59, 200, 81, 56, 55, 40],
    [100, 100, 100, 100, 100, 100, 100]];
  ctrl.weightData = [265, 259, 280, 281, 256, 255, 240];

  ctrl.calorieOptions = 
  {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
    legend: {
      display: true,
      position: "right"
    }
  };

  ctrl.calorieOverride =
  [{
    label: "Calories",
    borderWidth: 1,
    type: 'bar',
  },
  {
    label: "Max Calorie Limit",
        borderWidth: 3,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        type: 'line'
  }];

  ctrl.weightOverride = 
  {
    lineTension: 0
  };
}