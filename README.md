format-string
=============

> Format a string, using values from an object.

Installation
------------

`npm install format-string`

Usage
-----

```js
  var formatString = require('format-string');

  var user = {
    name: 'Stoeffel'
  };
  formatString('Hello, :name', user); // => Hello, Stoeffel
```

Cli
---

```bash
  $ format-string 'Hello, :name' name='Stoeffel'
```
