'use strict';

describe('Service: catService', function () {

  // load the service's module
  beforeEach(module('yoNovisApp'));

  // instantiate service
  var catService;
  beforeEach(inject(function (_catService_) {
    catService = _catService_;
  }));

  it('should do something', function () {
    expect(!!catService).toBe(true);
  });

});
