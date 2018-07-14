angular.module('ketoboy')
  .controller('HomeController', HomeController);

HomeController.$inject = ['$scope', 'RequestService', '_', 'moment'];

function HomeController($scope, RequestService, _, moment) {
  var ctrl = this;

  $scope.chosenDate = "";

  // var dates = [];
  // _.each(_.range(6,14), function(date) {
  //   if(date < 10) {
  //     dates.push('2018-05-0' + date);
  //   }
  //   else {
  //     dates.push('2018-05-' + date);
  //   }
  // });
  // console.log(dates)

  function generateDates(beginningDate) {
    var first = moment(beginningDate);

    var dates = [];
    _.each(_.range(0,6), function(addDay) {
      dates.push(first.clone().add(addDay, 'days').format("YYYY-MM-DD"));
    });
    return dates;
  }

  $scope.$watch('chosenDate', function(newValue) {
    if(newValue == "") return;
    RequestService.getCalories('week', newValue)
    .then(function(res) {
      console.log(res.data)
      if(res.data) {
        ctrl.personalCalorieData = [];
        dates = generateDates(newValue);
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
  });
  //some test garbage

  
  ctrl.dailyLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
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