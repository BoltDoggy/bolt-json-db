const BoltJsonDb = require('../src/index');

const db1 = BoltJsonDb('./data/db1.json', { a: 0 });
const db2 = BoltJsonDb('./data/db2.json', { a: 0 });
const db3 = BoltJsonDb('./data/db3.json', { a: 0 });

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
