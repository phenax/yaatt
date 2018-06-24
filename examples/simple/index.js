
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
            params: {
                nice: 'pants',
            },
            onResponse: response =>
                response
                    .matchProp([ 'args', 'nice' ], 'pants')
        },
        'should match given schema': {
            headers: {
                'X-Hello-World': 'Yep',
            },
            onResponse: response =>
                response
                    .assert(({ data }, { throwError }) => {
                        if(data.headers['X-Hello-World'] !== 'Yep') {
                            throwError('No match header. Me no likey');
                        }
                    })
        },
    },
};
