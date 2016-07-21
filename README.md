# evalTerms
This tiny lib try to help me by simplify the arg eval process of an function.
Use it for prototypes where readability is trump.

## API
One function with three faces <br>

    evalTerms(bools, msg)
    evalTerms(bools, msgs)
    evalTerms(bools, holeyMsgs, defaultMsg)

- the first arg is always an array that hold **booleans**
- evalTerms will parse **bools**
  - if `bools[x] !== 'boolean'` evalTerms will throw
  - if `bools[x] === false` evalTerms will throw an use ...
    - **msg** as error message
    - **msgs[x]** as error message
      - if **msgs[x]** is undefined evalTerms will use **defaultMsg**

## Demo
    // suppose an func with an specific signature
    var demoFun = function(argOne, argTwo) { }

    // the spec and also the documention try to say something like ...
    // argOne := string, obligatory
    // argTwo := string, optional - if set then only one of "A" or "B" value

    // ... the reality provide much more complexity than this.

    // without help, it could look something like the follwing ...
    var demoFun = function(argOne, argTwo) {
      let argLen = arguments.length;
      // i'll write a very strict arg eval (necessary? complete?)
      if (argLen == 0 || argLen > 2) throw new Error('invalid use of ...');
      if (typeof argOne !== 'string') throw new Error('invalid use of ...');
      if (argLen == 2) {
        if (typeof argTwo !== 'string') throw new Error('invalid use of ...');
        if (argTwo !== 'A' || argTwo !== 'B') throw new Error('invalid value for ...');
      }
    }

    // ... the reality provide much more complexity than this, much more dynamic ... things like:
    //   (double) negation
    //   || or and &&
    //   default values
    //   1-3, x or n args
    //   ...

    // with help, it could look something like the follwing ...
    var demoFun = function(argOne, argTwo) {
      let argLen = arguments.length;
      evalTerms([
        argLen == 1 || argLen == 2,
        typeof argOne == 'string',
        argLen == 2 ? typeof argTwo == 'string' && (argTwo == 'A' || argTwo == 'B'): true
      ], 'invalid use of ...');
    }

    // or
    var demoFun = function(argOne, argTwo) {
      let argLen = arguments.length;
      evalTerms([
        argLen == 1 || argLen == 2,
        typeof argOne == 'string',
        argLen == 2 ? typeof argTwo == 'string' && (argTwo == 'A' || argTwo == 'B'): true
      ], [
        'invalid use of ...',
        'wrong type of arg one',
        'invalid type or value of optional arg two'
      ]);
    }

    // or
    var demoFun = function(argOne, argTwo) {
      let argLen = arguments.length;
      evalTerms([
        argLen == 1 || argLen == 2,
        typeof argOne == 'string',
        argLen == 2 ? typeof argTwo == 'string' && (argTwo == 'A' || argTwo == 'B'): true
      ], [ ,'wrong type of arg one', ], invalid use of ...);
    }