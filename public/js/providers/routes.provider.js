let app = angular.module('ketoboy');

app.config(function($routeProvider) {
  $routeProvider
  .when("/home", {
    templateUrl : "/templates/home.html"
  })
  .when("/insert", {
    templateUrl : "/templates/insert.html"
  })
  .when("/indepth", {
    templateUrl: "/templates/indepth.html"
  })
  .when("/settings", {
    templateUrl: "/templates/settings.html"
  });
});