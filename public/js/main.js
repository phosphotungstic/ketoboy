angular.module('ketoboy', ['ngRoute', 'ngCookies', 'chart.js', 'angularMoment', 'underscore']);

var app = angular.module('ketoboy');
app.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($q, $cookies) {
    return {
     'request': function(config) {
          config.headers.Authorization = 'Bearer' + $cookies.get('jwt');
          return config;
      }
    };
  });
})