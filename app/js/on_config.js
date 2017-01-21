function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider, lockProvider, $httpProvider) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeCtrl',
      templateUrl: 'home.html',
      title: 'Home'
    })
    .state('createAccount', {
      url: '/add-account',
      controller: 'AddAccountCtrl'
    })
    .state('accountBalance', {
      url: '/account-balance',
      templateUrl: 'account-balance.html',
      controller: 'AccountBalanceCtrl',
      title: 'Account Balance'
    })
    .state('accountMonthlyBalance', {
      url: '/account-monthly-balance',
      templateUrl: 'account-monthly-balance.html',
      controller: 'AccountMonthlyBalanceCtrl',
      title: 'Account Monthly Balance'
    })
    .state('transactions', {
      url: '/transactions',
      templateUrl: 'transactions.html',
      controller: 'TransactionsCtrl',
      title: 'All Transactions'
    })
    .state('addOrEditTransaction', {
      url: '/add-edit-transaction?/{publicId:int}',
      controller: 'AddOrEditTransactionCtrl',
      templateUrl: 'add-and-edit-transaction.html',
      title: 'New Transaction'
    })
    .state('importCSV', {
      url: '/import-csv',
      controller: 'ImportCSVCtrl',
      templateUrl: 'import-csv.html',
      title: 'Import CSV'
    })
    .state('categories', {
      url: '/categories',
      templateUrl: 'categories.html',
      controller: 'CategoriesCtrl',
      title: 'Category List'
    })
    .state('events', {
      url: '/events',
      templateUrl: 'events.html',
      controller: 'EventsCtrl',
      title: 'Event List'
    })
    .state('places', {
      url: '/places',
      templateUrl: 'places.html',
      controller: 'PlacesCtrl',
      title: 'Place List'
    })
    .state('doLogout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    });

  $urlRouterProvider.otherwise('/');

  lockProvider.init({
    clientID: 'VPBBm5pT65qSKUpliiH7O2t6YRYmhewk',
    domain: 'tmasuda.auth0.com'
  });

  $httpProvider.interceptors.push(function($q) {
    return {
      'request': function(config) {
         config.headers = config.headers || {};
         if (localStorage.id_token) {
             config.headers.Authorization = 'Bearer ' + localStorage.id_token;
         }
         return config;
      },

      'responseError': function(response) {
        if (response.status === 401) {
          window.location.href = '/';
        }

        return $q.reject(response);
      }
    };
  });

}

export default OnConfig;
