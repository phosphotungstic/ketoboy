angular.module('ketoboy')
  .controller('HomeController', HomeController);

HomeController.$inject = ['$scope', 'RequestService', '_', 'moment', 'TimeService'];

function HomeController($scope, RequestService, _, moment, TimeService) {
  let ctrl = this;

  ctrl.updateGraph = function(date) {
    if(date == "") return;
    ctrl.beginningDate = date;
    RequestService.getCalories('week', date)
    .then(function(res) {
      //console.log(res.data)
      if(res.data) {
        ctrl.personalCalorieData = getPersonalCalorieData(res.data);
        ctrl.calorieData = [];
        ctrl.calorieData.push(ctrl.personalCalorieData);
        RequestService.getMaxCalories()
          .then(function(res) {
            let maxCalories = [];
            _.each(_.range(0, 7), function() {
              maxCalories.push(res.data.max_calorie);
            });
            //console.log(maxCalories);
            ctrl.calorieData.push(maxCalories);
          })
          .catch(function(e) {
            console.log(e);
          });
      }
    });
  };

  function getPersonalCalorieData(data) {
    let personalCalorieData = [];
    let dates = TimeService.generateDates(ctrl.beginningDate);
    _.each(dates, function(date) {
      if(data[date]) {
        personalCalorieData.push(data[date]);
      }
      else {
        personalCalorieData.push(0);
      }
    });
    return personalCalorieData;
  }
  
  ctrl.dailyLabels = moment.weekdays();
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
    backgroundColor: "rgba(255,99,132,0.4)",
    borderColor: "rgba(255,99,132,1)",
    hoverBackgroundColor: "rgba(255,99,132,0.4)",
    hoverBorderColor: "rgba(255,99,132,1)",
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