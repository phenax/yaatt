
# Yet another api testing toolkit
Easy tests and documentation for your http api

[In development]

## Install

Add it globally or locally

```
sudo yarn global add yaatt
```

OR if you are barbaric,

```
sudo npm i -g yaatt
```

## Usage

### Creating a test suite

* Create a file `your-test.js`. It is reccommended that you follow a specific directory structure for these tests.

* The general format of a test suite is as follows
```js
module.exports = {
    label: 'Httpbin Get call', // A label for your test suite
    url: 'http://httpbin.org/get', // API endpoint
    method: 'get', // HTTP method
    tests: {
        'should do stuff': { /* Test case */ },
    },
};
```


### Write your first test
* A simple test case for getting user information would look like this
```js
module.exports = {
    label: 'Get user data',
    url: 'https://some-domain.com/api/user',
    method: 'get',
    tests: {
        'should fetch Waluigi\'s information from api': {
            params: { // Query parameters
                userid: 'ZnVjayB5b3U=',
            },
            onResponse: response =>
                response
                    .matchProp([ 'result', 'id' ], 'ZnVjayB5b3U=') // Check if user id is correct
                    .matchProp([ 'result', 'name' ], 'Waluigi')    // Check if the name is correct
                    .assert(({ data, headers, status }) => {
                        // Manual test cases go here
                    })
        },
    },
};
```

### Running your tests

```
yaatt ./path/to/yourtest1.test.js ./path/to/yourtest2.test.js
```

You can even use glob paths
```
yaatt ./path/**/*.test.js
```
