
# Yet another api testing toolkit
Easy tests and documentation for your http api

![CircleCI](https://img.shields.io/circleci/project/github/phenax/yaatt.svg?style=flat-square)
![npm](https://img.shields.io/npm/v/@yaatt/core.svg?style=flat-square)
![MIT](https://img.shields.io/github/license/phenax/yaatt.svg?style=flat-square)



[In development]

## Install

Add it globally or locally

```
sudo yarn global add @yaatt/cli
```

OR if you are barbaric,

```
sudo npm i -g @yaatt/cli
```

## Usage

### Creating a test suite

* Create a file `your-test.js`. It is reccommended that you follow a specific directory structure for these tests.

* The general format of a test suite is as follows
```js
module.exports = {
    label: 'Httpbin Get call', // A label for your test suite
    request: {
        url: 'http://httpbin.org/get', // API endpoint
        method: 'get', // HTTP method
    },
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
    request: {
        url: 'https://some-domain.com/api/user',
        method: 'get',
    },
    tests: {
        'should fetch Waluigi\'s information from api': {
            request: {
                params: { // Query parameters
                    userid: 'ZnVjayB5b3U=',
                },
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

### Define dependencies
* If your api call depends on another api call (for example user authentication), you can define dependencies in your test suite which will be called to provide data to your test cases.
```js
module.exports = {
	label: 'Http get call after authentication (dependency)',
	request: {
		url: 'https://some-domain.com/api/user',
		method: 'get',
	},
	dependencies: {
		auth: {
			request: {
				url: 'https://some-domain.com/api/user/login',
				method: 'post',
				data: {
                    email: 'akshaynair1597@gmail.com',
                    password: 'my_pass1298qwbtgdhsj',
                },
			},
			onResponse: r => r.get([ 'user' ]),
		}
	},
	tests: {
		'should have uid set correctly as passed from the dependency': {
			request: {
				_: ({ dependencies }) => ({
					params: {
						uid: dependencies.auth.uid,
					},
				}),
			},
			onResponse: response =>
				response
					.matchProp([ 'user', 'name' ], 'Akshay Nair')
		},
	},
};
```


### Running your test suite

#### Just cli
```
yaatt ./path/to/yourtestsuite1.suite.js ./path/to/yourtestsuite2.suite.js
```

You can even use glob paths
```
yaatt ./path/**/*.test.js
```

#### Using config file
```
yaatt -c config.yaatt.json
```

And in your `config.yaatt.json` -
```json
{
    "testSuites": [ "./path/**/*.test.js" ],
}
```
