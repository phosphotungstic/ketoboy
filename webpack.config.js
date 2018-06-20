module.exports = {
  entry: ['./node_modules/angular/angular.min.js',
          './node_modules/angular-route/angular-route.min.js',
          './node_modules/angular-cookies/angular-cookies.min.js',
          './node_modules/chart.js/dist/Chart.min.js',
          './node_modules/angular-chart.js/dist/angular-chart.min.js'],
  output: {
    filename: './bundle.js'
  },
  performance: { hints: false }
};