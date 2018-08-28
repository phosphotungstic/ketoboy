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
        ctrl.personalCalorieData = getDateBasedData(res.data);
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

      RequestService.getWeights('week', date)
        .then(function(res) {
          if(res.data) {
            ctrl.weightData = getDateBasedData(res.data);
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    });
  };

  function getDateBasedData(data) {
    let personalData = [];
    let dates = TimeService.generateDates(ctrl.beginningDate);
    _.each(dates, function(date) {
      if(data[date]) {
        personalData.push(data[date]);
      }
      else {
        personalData.push(0);
      }
    });
    return personalData;
  }
  
  ctrl.dailyLabels = moment.weekdays();

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