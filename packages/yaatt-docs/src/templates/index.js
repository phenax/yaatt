
import React from 'react';

// Pass the docs object to context
export default ({ docs }) => (
	<div>
		<h1>Hello world</h1>
		<pre>{JSON.stringify(docs, 0, 4)}</pre>
	</div>
);
