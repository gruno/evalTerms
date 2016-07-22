var expect = require('chai').expect;
var offering = require('../index');

describe('index', function () {

  it('should provide one function', function () {
    expect(offering).to.be.an('function');
  });

  describe('#evalTerms', function () {

    it('should throw if less than 2 or more than 2 args provided', function () {
      expect(function () { offering(); }).throw(Error, /misuse/);
      expect(function () { offering(1); }).throw(Error, /misuse/);
      expect(function () { offering(1, 2, 3, 4); }).throw(Error, /misuse/);
    });

    it('should throw if 1st arg is no array', function () {
      expect(function () { offering(1, ''); }).throw(Error, /misuse/);
      expect(function () { offering('', ''); }).throw(Error, /misuse/);
      expect(function () { offering(true, ''); }).throw(Error, /misuse/);
      expect(function () { offering({}, ''); }).throw(Error, /misuse/);
    });

    it('should throw if 2nd arg is no string', function () {
      expect(function () { offering([], 1); }).throw(Error, /misuse/);
      expect(function () { offering([], true); }).throw(Error, /misuse/);
      expect(function () { offering([], {}); }).throw(Error, /misuse/);
    });

    it('should throw user specific msg', function () {
      expect(function () {
        offering([true, true, false], 'test');
      }).throw(Error, /test/);
    });

    it('should throw if elm of arg 1 !== "boolean"', function () {
      expect(function () {
        offering([true, 1, true], 'test');
      }).throw(Error, /evalTerms parse/);
    });

    it('should pass if all elm true', function () {
      expect(function () {
        offering([true, true, true], 'test');
      }).not.throw(Error);
    });
  });
});