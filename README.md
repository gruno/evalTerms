# evalTerms
This tiny helper try to help simplify the arg eval process of a function.
Intended for prototypes where readability is trump.

## API
**evalTerms(bools, msg)** &#8212; *evalTerms(array, string)*

- evalTerms will parse (loop and switch) **bools**
  - `typeof bools[x] != 'boolean'` &#187; evalTerms will throw an own Error
  - `bools[x] === false` &#187; evalTerms will throw an use **msg** as error message
  - `bools[x] === true` &#187; ok

## Example
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

## License
The MIT License (MIT)

Copyright (c) 2016 gruno

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.