
const { Schema } = require('../../index.js');

const schema = Schema({
    name: Schema.string,
});

module.exports = {
    label: 'Httpbin Get call',
    url: 'http://httpbin.org/get',
    method: 'get',
    tests: {
        'should have name set to Hello world': {
            query: 'nice=pants',
            onResponse: response => response
                .matchProp('name', 'Hello world'),
        },
        'should match given schema': {
            query: 'hello=world&value=new',
            onResponse: response => response
                .assert(({ data }, { throwError }) => {
                    // if(data.headers)
                    console.log(data);
                })
                ,
        },
    },
};
