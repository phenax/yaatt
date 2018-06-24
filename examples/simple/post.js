
module.exports = {
    label: 'Httpbin Post call',
    url: 'http://httpbin.org/post',
    method: 'post',
    tests: {
        'should have name set to Fuckerooni': {
            data: {
                name: 'Fuckerooni',
            },
            onResponse: response =>
                response
                    .matchProp(['data'], '{"name":"Fuckerooni"}')
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
