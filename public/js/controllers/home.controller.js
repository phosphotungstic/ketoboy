angular.module('ketoboy')
  .controller('HomeController', HomeController);

HomeController.$inject = ['$scope', 'RequestService', '_'];

function HomeController($scope, RequestService, _) {
  var ctrl = this;

  var dates = [];
  _.each(_.range(6,14), function(date) {
    if(date < 10) {
      dates.push('2018-05-0' + date);
    }
    else {
      dates.push('2018-05-' + date);
    }
  });
  console.log(dates)

  //some test garbage
  RequestService.getCalories('week', '2018-05-06')
    .then(function(res) {
      console.log(res.data)
      if(res.data) {
        ctrl.personalCalorieData = [];
        _.each(dates, function(date) {
          if(res.data[date]) {
            ctrl.personalCalorieData.push(res.data[date]);
          }
          else {
            ctrl.personalCalorieData.push(0);
          }
        });
        ctrl.calorieData = [];
        ctrl.calorieData.push(ctrl.personalCalorieData);
        ctrl.calorieData.push([1000, 1000, 1000, 1000, 1000, 1000, 1000]);
        console.log(ctrl.calorieData)
      }
    });;
  
  ctrl.dailyLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  // ctrl.calorieData = [
  //   [65, 59, 200, 81, 56, 55, 40],
  //   [1000, 1000, 1000, 1000, 1000, 1000, 100]];
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