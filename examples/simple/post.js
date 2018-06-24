
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
        'should have custom header set to Nope': {
            headers: {
                'X-Hello-World': 'Nope',
            },
            onResponse: response =>
                response
                    .matchProp([ 'headers', 'X-Hello-World' ], 'Nope')
        },
    },
};
