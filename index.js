module.exports = function evalTerms(bools, msg) {
  var aLen = arguments.length;

  if (aLen < 2 || aLen > 2)
    throw new Error('[evalTerms] misuse - invalid count of args');

  if (!Array.isArray(bools))
    throw new Error('[evalTerms] misuse - invalid type of arg 1');

  if (typeof msg !== 'string')
    throw new Error('[evalTerms] misuse - invalid type of arg 2');

  bools.forEach(function (flag) {
    switch (flag) {
      case false: throw new Error(msg);
      case true: break;
      default:
        throw new Error('[evalTerms parse] - element has an invalid type');
    }
  });
};