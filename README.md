# evalTerms
This tiny helper try to help simplify the arg eval process of a function.
Intended for prototypes where readability is trump.

## API
    evalTerms(bools, msg)

- **bools** - an array that should hold **booleans**
- **msg** - an string

what is going on?
- evalTerms will parse (loop and switch) **bools**
  - if `bools[x] !== 'boolean'` evalTerms will throw an own Error
  - if `bools[x] === false` evalTerms will throw an use **msg** as error message

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

    // with help, it could look something like the follwing ...
    var demoFun = function(argOne, argTwo) {
      let argLen = arguments.length;
      evalTerms([
        argLen == 1 || argLen == 2,
        typeof argOne == 'string',
        argLen == 2 ? typeof argTwo == 'string' && (argTwo == 'A' || argTwo == 'B'): true
      ], 'invalid use of ...');
    }

    // ... the reality provide much more complexity than this, much more dynamic ... things like:
    //   (double) negation
    //   || or and &&
    //   default values
    //   1-x or n args
    //   ...