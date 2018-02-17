# bolt-json-db
⚡️ Persistence JSON without active save.

## Usage

```bash
npm i bolt-json-db
```

```js
const BoltJsonDb = require('bolt-json-db');

const json = BoltJsonDb('./data/db.json', {
    YourAttrs: 'YourValue'
});

// Use json just like a js Object
// and the json will save to `./data/db.json` auto.
```

## Guide

It should be noted that properties in data are only reactive if they existed when the instance was created.

That means if you add a new property, like:

```js
const db1 = BoltJsonDb('./data/db1.json', { a: 0 });
const db2 = BoltJsonDb('./data/db2.json', { a: 0 });
const db3 = BoltJsonDb('./data/db3.json', { a: 0 });

db1.a = 1; // right
db1.b = 1; // wrong, because can't listen setter of db1.b

db2.a = {
    b: 2
}; // right
db2.a.b = 3; // right
db2.a.c = 3; // wrong, because can't listen setter of db2.a.c

db3.a = [];
db3.a.push(1); // right
db3.a.push({
    b: 3
}); // right
db3.a[1].b = 4; // right
db3.a[1].c = 4; // wrong, because can't listen setter of db3.a[1].c
db3.a[0] = 2; //right
db3.a[2] = 2; // wrong, because can't listen setter of db3.a[2]

// But result maybe right when auto save is going, not recommend.
```

you’ll need to set some initial value.
