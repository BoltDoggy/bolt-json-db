const asyncDebounce = require('../src/asyncDebounce');

function simulateAsync(callback) {
    let timeout = (~~(Math.random() * 10) + 1) * 1000;
    console.log('set timeout:', timeout);
    setTimeout(() => {
        console.log('result:', new Date());
        callback();
    }, timeout);
}

let interval = setInterval(() => {
    asyncDebounce((next) => {
        simulateAsync(() => {
            next();
        })
    });
}, 10);

setTimeout(() => {
    clearInterval(interval);
}, 100000);