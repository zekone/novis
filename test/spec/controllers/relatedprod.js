'use strict';

describe('Controller: RelatedprodCtrl', function () {

  // load the controller's module
  beforeEach(module('yoNovisApp'));

  var RelatedprodCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RelatedprodCtrl = $controller('RelatedprodCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
