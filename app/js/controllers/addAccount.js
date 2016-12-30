var ctrl = function ($scope, $state, accountService) {

  // ViewModel
  const vm = this;

  accountService.create().then(
    function(response) {
      $state.go('addTransaction');
    }, function(error) {
      console.error(error);
    });

};

ctrl.$inject = ['$scope', '$state', 'accountService'];

export default {
  name: 'AddAccountCtrl',
  fn: ctrl
};
