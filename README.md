# evalTerms
This tiny helper try to help simplify the arg eval process of a function.
Intended for prototypes where readability is trump.

## API
**evalTerms(bools, msg)** &#8212; *evalTerms(array, string)*

- evalTerms will parse (loop and switch) **bools**
  - `bools[x] !== true || false` &#187; evalTerms will throw an own Error
  - `bools[x] === false` &#187; evalTerms will throw an use **msg** as error message
  - `bools[x] === true` &#187; ok

## Demo
    // suppose an func with an specific signature
    var demoFun = function(argOne, argTwo) { }

    // the spec and also the documention try to say something like ...
    // argOne := string, obligatory
    // argTwo := string, optional - if set then value can only "A" or "B"

    // without help, it could look something like the follwing ...
    var demoFun = function(argOne, argTwo) {
      let argLen = arguments.length;

      // i'll write a very strict arg eval (necessary?)

      if (argLen == 0 || argLen > 2) throw new Error('invalid use of ...');
      if (typeof argOne !== 'string') throw new Error('invalid use of ...');
      if (argLen == 2 && (argTwo !== 'A' || argTwo !== 'B'))
        throw new Error('invalid use of ...');
    }

    // with help, it could look something like the follwing ...
    var demoFun = function(argOne, argTwo) {
      let argLen = arguments.length;

      let tems = [
        argLen == 1 || argLen == 2,
        typeof argOne == 'string',
        argLen == 2 ? argTwo == 'A' || argTwo == 'B': true
      ];

      evalTerms(terms, 'invalid use of ...');
    }

## About
the influence of evalTerms() is subtle ... <br>
... an realistic argument eval process provides much more complexity than the example above, <br>
much more dynamic ... things like:

-  (double) negation
-  || or and &&
-  default values
-  1-x or n args
-  ...

... how *strong* your test must be ... is up to you and your needs ... <br>
javascript provides flexibility and dynamic ...