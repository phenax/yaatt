
import React from 'react';

const HtmlWrapper = ({ children }) => (
	<html>
		<head>
			<title>MyPage</title>
		</head>
		<body>
			{children}
		</body>
	</html>
);

export default HtmlWrapper;
