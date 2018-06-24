
module.exports = {
    label: 'Httpbin Get call',
    url: 'http://httpbin.org/get',
    method: 'get',
    tests: {
        'should have name set to Fuckerooni': {
            params: {
                name: 'Fuckerooni',
            },
            onResponse: response =>
                response
                    .matchProp([ 'args', 'name' ], 'Fuckerooni')
        },
        'should have custom header set to Yep': {
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


