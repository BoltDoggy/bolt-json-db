# bolt-json-db [![npm](https://img.shields.io/npm/v/bolt-json-db.svg)](https://www.npmjs.com/package/bolt-json-db) [![david-dm](https://david-dm.org/BoltDoggy/bolt-json-db.svg)](https://david-dm.org/BoltDoggy/bolt-json-db)
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

### Faster And Safer

You can use [jsonschema](http://json-schema.org/) at 3nd argument.

```js
const json = BoltJsonDb('./data/db.json', {
    YourAttrs: 'YourValue'
}, {
    title: 'Example Schema',
    type: 'object',
    properties: {
        YourAttrs: {
            type: 'string'
        }
    }
});
```

## Guide

It should be noted that properties in data are only reactive if they existed when the instance was created.

That means if you add a new property, like:

```js
const db1 = BoltJsonDb('./data/db1.json', { a: 0 });
const db2 = BoltJsonDb('./data/db2.json', { a: 0 });
const db3 = BoltJsonDb('./data/db3.json', { a: 0 });
const db4 = BoltJsonDb('./data/db3.json', {
    a: 0,
    b: 1
}, {
    title: 'Example Schema',
    type: 'object',
    properties: {
        a: {
            type: 'string'
        },
        c: {
            type: 'string'
        }
    }
});

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

db4.a = 1;  // right, but db4.a === '1', because type is string at Schema
db4.b = 2;  // wrong, because not at Schema
db4.c = 3;  // wrong, because can't listen setter of db4.c
db4.a = db4;    // right, but db4.a === '[object Object]', because type is string at Schema

// But result maybe right when auto save is going, not recommend.
```

you’ll need to set some initial value.

## Next

- [ ] Schema support Circular
    - https://github.com/fastify/fast-json-stringify
    - https://github.com/WebReflection/circular-json