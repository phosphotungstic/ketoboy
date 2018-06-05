var app = angular.module('ketoboy');

app.config(function($routeProvider) {
  $routeProvider
  .when("/home", {
      templateUrl : "/templates/home.html"
  })
  .when("/test", {
      templateUrl : "/templates/test.html"
  });
});