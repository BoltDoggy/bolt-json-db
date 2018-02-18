const BoltJsonDb = require('../src/index');

const db1 = BoltJsonDb('./data/db1.json', { a: 0 });
const db2 = BoltJsonDb('./data/db2.json', { a: 0 });
const db3 = BoltJsonDb('./data/db3.json', { a: 0 });
const db4 = BoltJsonDb('./data/db4.json', { a: 0 });
const db5 = BoltJsonDb('./data/db5.json', {
    a: 0,
    firstName: 'Bolt'
}, {
    title: 'Example Schema',
    type: 'object',
    properties: {
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        age: {
            description: 'Age in years',
            type: 'integer'
        },
        reg: {
            type: 'string'
        }
    }
});

db1.a = 1;

db2.a = {
    b: 2
};
db2.a.b = 3;

db3.a = [];
db3.a.push(1);
db3.a.push({
    b: 3
});
db3.a[1].b = 4;

db4.a = db4;
db4.b = {
    c: {}
};
db4.d = db4.b;
db4.e = db4.b.c;

db5.a = 1;
db5.firstName = '1';
db5.a = db5;
db5.firstName = db5;
