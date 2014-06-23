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
    name: 'Stoeffel',
    modified: new Date()
  };
  formatString('Hello, :name (:modified)', user); // => Hello, Stoeffel (31.12.2014)
```

CLI
---

```bash
  $ format-string 'Hello, :name (:modified)' --name stoeffel --modified `date +"%m.%d.%y"`
```
