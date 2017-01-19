function service(transportService) {
  'ngInject';

  const service = {};

  service.create = function (data) {
    return transportService.send('POST', 'transaction/create', data)
  };

  service.createAll = function (data) {
    return transportService.send('POST', 'transaction/createAll', data)
  };

  service.defaultList = function (data) {
    return transportService.send('POST', 'transaction/list', data);
  };

  return service;
}

export default {
  name: 'transactionService',
  fn: service
};
