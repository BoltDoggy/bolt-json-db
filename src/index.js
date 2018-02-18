const path = require('path');

const CircularJSON = require('circular-json');
const Debug = require('debug');
const fastJson = require('fast-json-stringify');
// const jsonfile = require('jsonfile');
const mkdirp = require('mkdirp');
const Vue = require('vue');

const asyncDebounce = require('./asyncDebounce');
const jsonfile = require('./jsonfile');

const debug = Debug('bolt-json-db:Data');

module.exports = (JSONPath, initData, Schema) => {
    let parse;
    let stringify;
    if (Schema) {
        parse = JSON.parse;
        stringify = fastJson(Schema);
    } else {
        parse = CircularJSON.parse;
        stringify = CircularJSON.stringify;
    }

    const JSONDir = path.dirname(JSONPath);
    const jsonfileWriteFileDebounce = asyncDebounce((args, next) => {
        mkdirp(JSONDir);
        jsonfile.writeFile(args[0], args[1], {
            parse,
            stringify
        }, (err) => {
            args[2](err);
            next();
        });
    });

    let data;
    try {
        data = jsonfile.readFileSync(JSONPath, {
            parse,
            stringify
        });
    } catch (e) {
        debug(`没有发现 ${JSONPath}, 文件改变时将会自动创建`);
    };

    let store = new Vue({
        data: {
            data: {
                ...initData,
                ...data
            }
        },
        watch: {
            data: {
                handler: function (val) {
                    jsonfileWriteFileDebounce(JSONPath, val, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                },
                deep: true
            }
        }
    });

    return store.data;
}